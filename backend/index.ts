import express from 'express';
import dotenv from 'dotenv';
import {Env, validateEnv} from './src/config/env';
import {connectToDatabase} from './src/config/database';
import {configureRoutes} from "./src/routes/routes";

dotenv.config();
validateEnv();

async function bootstrap() {
    const app = express();
    const {serverHost, serverPort} = Env;

    app.use(express.json());

    await connectToDatabase();

    configureRoutes(app);

    app.listen(serverPort, serverHost,
        () => console.log(`Started server on http://${serverHost}:${serverPort}`)
    );
}

bootstrap().then();
