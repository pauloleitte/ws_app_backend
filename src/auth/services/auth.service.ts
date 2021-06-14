import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/shared/services/bcrypt.service';
import { MailService } from 'src/shared/services/mail.service';
import { UsersService } from 'src/users/users.service';
import { ForgotPasswordDTO } from '../dto/forgot-password.dto';
import { ResetPasswordDTO } from '../dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    private mailService: MailService,
  ) { }

  async generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    if (user && await this.bcryptService.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(forgotPassword: ForgotPasswordDTO) {
    try {
      const user = await this.usersService.getByEmail(forgotPassword.email);

      if (!user) {
        throw new BadRequestException("user does not exist");
      }

      const otp = await this.generateOTP();
      const now = new Date();
      now.setSeconds(now.getSeconds() + 20);

      user.passwordResetToken = otp,
        user.passwordResetExpires = now.toString();

      await this.usersService.findByIdAndUpdate(user._id, user);

      return this.mailService.sendMail(forgotPassword.email, otp, user.name);

    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async resetPassword(resetPassword: ResetPasswordDTO) {
    try {

      const user = await this.usersService.getByEmail(resetPassword.email);

      if (!user) {
        throw new BadRequestException("user does not exist");
      }

      if (resetPassword.token !== user.passwordResetToken) {
        throw new BadRequestException("invalid token");
      }

      const now = Date.now();

      if (now > Date.parse(user.passwordResetExpires)) {
        throw new BadRequestException("invalid token");
      }

      user.password = await this.bcryptService.encrypt(resetPassword.password);
      user.passwordResetToken = '';
      user.passwordResetExpires = '';

      user.save();

    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}