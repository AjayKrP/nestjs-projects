import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService){}
    sendConfirmationMail(to: string, name: string, link: string) {
        this.mailerService.sendMail({
            to,
            from: "ajay@gmail.com",
            subject: "Please confirm your email",
            template: "./confirmation",
            context: {
                name,
                link
            }
        })
    }
}
