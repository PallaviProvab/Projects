import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendStudentCredentials(email: string, userId: string, password: string) {
  try {
    await this.mailerService.sendMail({
      to: 'pallavinatraj31@gmail.com',
      subject: 'Welcome to Student Credit Portal',
      template: 'student-welcome',
      // context: { email, userId, password },
      context: { email:'Pallavi', userId:'USR123', password:'Secure123' },
    });
    console.log(`Mail sent to ${email}`);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
}
