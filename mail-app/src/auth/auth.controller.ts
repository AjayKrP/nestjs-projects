import { Body, Controller, Post } from '@nestjs/common';
import { User } from './dto/user.dto';
import { MailService } from 'src/mail/mail.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly mailService: MailService) { }
    //POST '/auth/confirmation'
    @Post("confirmation")
    userConfirmation(@Body() body: User) {
        this.mailService.sendConfirmationMail(body.email, body.name, "http://localhost:3000/confirm?token=78348238764")
        return {
            success: true
        }
    }
}
