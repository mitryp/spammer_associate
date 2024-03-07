import express from 'express';
import dotenv from 'dotenv';
import {Env, validateEnv} from './src/config/env';
import {connectToDatabase} from './src/config/database';
import {configureReceiverRoutes} from "./src/routes/receiver_routes";

dotenv.config();

async function bootstrap() {
    validateEnv();

    const app = express();
    const {serverHost, serverPort} = Env;

    app.use(express.json());

    await connectToDatabase();

    configureReceiverRoutes(app);

    app.listen(serverPort, serverHost,
        () => console.log(`Started server on http://${serverHost}:${serverPort}`)
    );
}

bootstrap().then();
