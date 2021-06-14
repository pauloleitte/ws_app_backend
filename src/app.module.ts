import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_MAIL,
        port: Number(process.env.PORT_MAIL),
        auth: {
          user: process.env.AUTH_EMAIL_USER,
          pass: process.env.AUTH_EMAIL_PASS
        }
      },
      template: {
        dir: path.join(__dirname, 'mail/templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: false,
        },
      },
    }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0-9ifp6.mongodb.net/db-poc-ws-app?retryWrites=true&w=majority`),
    UsersModule,
    PatientsModule,
    ImagesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
