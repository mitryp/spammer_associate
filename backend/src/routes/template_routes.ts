import { Express, Router } from "express";
import { TemplateController } from "../controller/template_controller";

const templatePrefix = "/templates";

export function configureTemplateRoutes(app: Express) {
  const router = Router();

  router.get("/", (req, res) => TemplateController.getAll(req, res));
  router.post("/", (req, res) => TemplateController.create(req, res));
  router.delete("/:id", (req, res) => TemplateController.remove(req, res));

  app.use(templatePrefix, router);
}
