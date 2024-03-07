import mongoose from 'mongoose';

const ReceiverNameSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    middleName: {type: String, required: false},
    lastName: {type: String, required: true},
});

const receiverSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, validate: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/},
    name: {type: ReceiverNameSchema, required: true}
});

export const Receiver = mongoose.model('Receiver', receiverSchema);
