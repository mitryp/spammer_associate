import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {Env} from './env';

dotenv.config();

export async function connectToDatabase() {
    const {mongoUri} = Env;

    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Could not connect to the database');
        process.exit(1);
    }
}