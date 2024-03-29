import dotenv from 'dotenv';

dotenv.config();

export const Env = {
    serverPort: +(process.env.PORT ?? 3000),
    serverHost: process.env.HOST ?? '127.0.0.1',
    mongoUri: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/sa_backend',
    frontendPath: process.env.FRONTEND_PATH ?? './../frontend',
    senderEmail: process.env.SENDER_EMAIL!,
    senderPass: process.env.SENDER_GMAIL_PASS!,
} as const;

export function validateEnv() {
    if (!Env.serverPort || !Env.serverHost || !Env.mongoUri
        || !Env.frontendPath || !Env.senderEmail || !Env.senderPass) {
        console.error('Environment was not set correctly:\n', Env);
        process.exit(1);
    }

    console.log('Starting with config:\n', {
        ...Env,
        senderPass: Env.senderPass ? '*redacted*' : undefined,
        senderEmail: Env.senderEmail ? '*redacted*' : undefined
    });
}