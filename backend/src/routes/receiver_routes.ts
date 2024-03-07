import {Express, Router} from 'express';
import {ReceiverController} from '../controller/receiver_controller';

const receiverPrefix = '/receivers';

export function configureReceiverRoutes(app: Express) {
    const router = Router();

    router.get('/', ReceiverController.getAll);
    router.post('/', ReceiverController.create);
    router.delete('/:email', ReceiverController.remove);

    app.use(receiverPrefix, router);
}
