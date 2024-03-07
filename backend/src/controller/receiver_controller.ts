import {Request, Response} from "express";
import {Receiver} from '../model/receiver';

export class ReceiverController {
    static async getAll(_: Request, res: Response) {
        const results = await Receiver.find();
        res.json(results);
    }

    static async create(req: Request, res: Response) {
        const body = await req.body;
        const newReceiver = new Receiver(body);

        try {
            const saved = await newReceiver.save();
            res.status(201).json(saved);
        } catch (error) {
            res.status(400).json({error});
        }
    }

    static async remove(req: Request, res: Response) {
        const email = req.params.email;

        if (!email) {
            res.status(400).json({error: 'No email was given'});
            return;
        }

        const wasDeleted = await Receiver.deleteOne({email})
            .then((r) => r.deletedCount > 0);

        res.sendStatus(wasDeleted ? 200 : 404);
    }
}
