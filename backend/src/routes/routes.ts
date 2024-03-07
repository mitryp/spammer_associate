import express, { Express } from "express";
import { configureReceiverRoutes } from "./receiver_routes";
import { configureTemplateRoutes } from "./template_routes";
import path from "path";
import { Env } from "../config/env";

export function configureRoutes(app: Express) {
  configureReceiverRoutes(app);
  configureTemplateRoutes(app);

  app.use(express.static(path.join(Env.frontendPath, "public")));
  app.get("/", (req, res) =>
    res.sendFile("index.html", { root: Env.frontendPath }),
  );
}
