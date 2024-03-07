import mongoose from 'mongoose';

const mailTemplateSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    body: {type: String, required: true},
});

export const MailTemplate = mongoose.model('MailTemplate', mailTemplateSchema);

export interface IMailTemplate {
    title: string;
    body: string;
}
