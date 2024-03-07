import express, {Express} from "express";
import {configureReceiverRoutes} from "./receiver_routes";
import {configureTemplateRoutes} from "./template_routes";
import path from "path";
import {Env} from "../config/env";
import {configureSendMailRoutes} from "./sendmail_routes";

export function configureRoutes(app: Express) {
    configureReceiverRoutes(app);
    configureTemplateRoutes(app);
    configureSendMailRoutes(app);

    app.use(express.static(path.join(Env.frontendPath, "public")));

    app.get("/", (_, res) =>
        res.sendFile("index.html", {root: Env.frontendPath}),
    );

    app.get("/send", (_, res) =>
        res.sendFile("send.html", {root: Env.frontendPath}),
    );
}
