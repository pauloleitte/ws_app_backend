import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }
  async sendMail(email, token, name) {
    this.mailerService.sendMail({
      to: email,
      from: 'paulo.leitte@live.com',
      subject: 'Reset Password',
      template: './forgot-password',
      context: {
        token,
        name
      }
    }).then(console.log)
      .catch((e) => { throw new InternalServerErrorException(e) });
  }
}
