import { Controller, UseGuards, Request, Post, Body, HttpCode } from '@nestjs/common';
import { ForgotPasswordDTO } from '../dto/forgot-password.dto';
import { ResetPasswordDTO } from '../dto/reset-password.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: any) {
        return this.authService.login(req.user._doc)
    }

    @Post('auth/forgot-password')
    @HttpCode(204)
    async forgotPassoword(@Body() forgotPassowrd: ForgotPasswordDTO) {
        return this.authService.forgotPassword(forgotPassowrd);
    }

    @Post('auth/reset-password')
    @HttpCode(204)
    async resetPassoword(@Body() resetPassoword: ResetPasswordDTO) {
        return this.authService.resetPassword(resetPassoword);
    }
}
