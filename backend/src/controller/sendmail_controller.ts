import {Request, Response} from "express";
import {IMailTemplate} from "../model/mail_template";
import {MailService} from "../services/mail_service";

export class SendmailController {
    static async sendMails(req: Request, res: Response) {
        const maybeTemplate = req.body as IMailTemplate;

        if (!maybeTemplate || !(!!maybeTemplate.body) || !(!!maybeTemplate.title)) {
            res.sendStatus(400);
            return;
        }

        const emailsSent = await MailService.sendEmails(maybeTemplate);
        res.json({emailsSent});
    }
}