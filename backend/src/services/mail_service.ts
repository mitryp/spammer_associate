import {IMailTemplate} from "../model/mail_template";
import nodemailer from 'nodemailer';
import {Env} from "../config/env";
import {Receiver} from "../model/receiver";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Env.senderEmail,
        pass: '***REMOVED***'
    }
});

function sendMailTo(address: string, subject: string, text: string): Promise<boolean> {
    const {senderEmail} = Env;

    const mailOptions = {
        from: senderEmail,
        to: address,
        subject: subject,
        text: text,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                resolve(false)
            } else {
                console.log('Email sent to ' + address);
                resolve(true);
            }
        });
    })

}

export class MailService {
    static async sendEmails(template: IMailTemplate): Promise<number> {
        const receivers = await Receiver.find();

        let successes = 0;

        for (const receiver of receivers) {
            const res = await sendMailTo(receiver.email, template.title, template.body);
            if (res) successes += 1;
        }

        return successes;
    }
}