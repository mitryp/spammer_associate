import {Express, Router} from "express";
import {SendmailController} from "../controller/sendmail_controller";

const sendMailsPrefix = '/mails';

export function configureSendMailRoutes(app: Express) {
    const router = Router();

    router.post('/send', SendmailController.sendMails);

    app.use(sendMailsPrefix, router);
}