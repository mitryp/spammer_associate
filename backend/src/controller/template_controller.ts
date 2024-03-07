import {Request, Response} from 'express';
import {MailTemplate} from '../model/mail_template';
import {ObjectId} from "mongodb";

export class TemplateController {
    static async getAll(_: Request, res: Response) {
        const results = await MailTemplate.find().sort({title: 1});
        res.json(results);
    }

    static async create(req: Request, res: Response) {
        const body = await req.body;
        const newTemplate = new MailTemplate(body);

        try {
            const saved = await newTemplate.save();
            res.status(201).json(saved);
        } catch (error) {
            res.status(400).json({error});
        }
    }

    static async remove(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({error: 'No id was provided'});
            return;
        }

        const wasDeleted = await MailTemplate.deleteOne({_id: new ObjectId(id)})
            .then((r) => r.deletedCount > 0);

        res.sendStatus(wasDeleted ? 200 : 404);
    }
}
