import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jtw.strategy';
import { ConfigModule } from '@nestjs/config';
import { BcryptService } from 'src/shared/services/bcrypt.service';
import { MailService } from 'src/shared/services/mail.service';


@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        PassportModule.register({ session: true }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1day' },
        }),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        BcryptService,
        MailService,
    ],
})
export class AuthModule { }