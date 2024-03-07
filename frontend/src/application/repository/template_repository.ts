import {template} from '../../data/model/mail_template';

const prefix = '/templates';

export class TemplateRepository {
    static async getAll(): Promise<template.MailTemplate[]> {
        const json = await fetch(prefix).then((res) => res.json());

        if (!template.validateArray(json)) {
            throw 'Could not decode Receiver array';
        }

        return json as template.MailTemplate[];
    }

    static async create(newTemplate: template.MailTemplate) {
        console.log(newTemplate)
        if (!template.isValid(newTemplate)) {
            throw 'The MailTemplate is invalid';
        }

        const res = await fetch(prefix, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newTemplate),
        });

        if (!res.ok) {
            throw `An error occurred. Perhaps, a template with this title already exists?`
        }
    }

    static async delete(id: string): Promise<boolean> {
        return fetch(`${prefix}/${id}`, {method: 'DELETE'})
            .then((r) => r.ok);
    }
}