import { Resend } from 'resend';
import { config } from '../config/env';

const resend = new Resend(config.resend_api_key);

export function sendEmail(from: string, to: string, subject: string, html: any){
    resend.emails.send({
        from,
        to,
        subject,
        html
    })
}
