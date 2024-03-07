import {receiver} from '../../data/model/receiver';

const prefix = '/receivers';

export class ReceiverRepository {
    static async getAll(): Promise<receiver.Receiver[]> {
        const json = await fetch(prefix).then((res) => res.json());

        if (!receiver.validateArray(json)) {
            throw 'Could not decode Receiver array';
        }

        return json as receiver.Receiver[];
    }

    static async create(newReceiver: receiver.Receiver) {
        console.log(newReceiver)
        if (!receiver.isValid(newReceiver)) {
            throw 'The Receiver is invalid';
        }

        const res = await fetch(prefix, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newReceiver),
        });

        if (!res.ok) {
            throw `An error occurred. Perhaps, this email already exists?`
        }
    }

    static async delete(email: string): Promise<boolean> {
        return fetch(`${prefix}/${email}`, {method: 'DELETE'})
            .then((r) => r.ok);
    }
}