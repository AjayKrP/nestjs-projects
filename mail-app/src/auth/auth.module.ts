import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [MailModule],
  providers: [MailService],
  controllers: [AuthController]
})
export class AuthModule {}
