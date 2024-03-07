import {Express} from 'express';
import {configureReceiverRoutes} from "./receiver_routes";
import {configureTemplateRoutes} from "./template_routes";

export function configureRoutes(app: Express) {
    configureReceiverRoutes(app);
    configureTemplateRoutes(app);
}
