import {Express, Router} from "express";
import {SendmailController} from "../controller/sendmail_controller";

const sendMailsPrefix = '/mails';

export function configureSendMailRoutes(app: Express) {
    const router = Router();

    router.post('/send', (req, res) => SendmailController.sendMails(req, res));

    app.use(sendMailsPrefix, router);
}