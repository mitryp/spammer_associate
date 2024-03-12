import {Request, Response} from 'express';
import {Receiver} from '../model/receiver';

export class ReceiverController {
    static async getAll(_: Request, res: Response) {
        const results = await Receiver.find().sort({email: 1});
        res.json(results);
    }

    static async create(req: Request, res: Response) {
        const newReceiver = new Receiver(req.body);

        try {
            const saved = await newReceiver.save();
            res.status(201).json(saved);
        } catch (error) {
            res.status(400).json({error});
        }
    }

    static async update(req: Request, res: Response) {
        const email = req.params.email;
        const {firstName, middleName, lastName} = req.body.name;

        if (!email) {
            res.status(400).json({error: 'No email was provided'});
            return;
        }

        if (!firstName && !middleName && !lastName) {
            res.status(400).json({error: 'No data to change was provided'});
            return;
        }

        try {
            const existingName = (await Receiver.findOne({email}))?.name;

            if (!existingName) {
                res.sendStatus(404);
                return;
            }

            const updated = await Receiver.findOneAndUpdate({email}, {
                name: {
                    firstName: firstName || existingName.firstName,
                    middleName: middleName == null ? undefined : (middleName || existingName.middleName),
                    lastName: lastName || existingName.lastName,
                }
            }, {new: true, upsert: false});

            res.json(updated);
        } catch (error) {
            res.status(400).json({error});
        }
    }

    static async remove(req: Request, res: Response) {
        const email = req.params.email;

        if (!email) {
            res.status(400).json({error: 'No email was provided'});
            return;
        }

        const wasDeleted = await Receiver.deleteOne({email})
            .then((r) => r.deletedCount > 0);

        res.sendStatus(wasDeleted ? 200 : 404);
    }
}
