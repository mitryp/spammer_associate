import {Express, Router} from 'express';
import {TemplateController} from "../controller/template_controller";

const templatePrefix = '/templates';

export function configureTemplateRoutes(app: Express) {
    const router = Router();

    router.get('/', TemplateController.getAll);
    router.post('/', TemplateController.create);
    router.delete('/:id', TemplateController.remove);

    app.use(templatePrefix, router);
}
