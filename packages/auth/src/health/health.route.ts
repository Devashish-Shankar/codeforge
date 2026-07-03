import { Router } from "express";
import { HealthController } from "./health.controller.js";

const router = Router();

const healthController = new HealthController();

router.get("/", (req, res) => {
  return healthController.getHealth(req, res);
});

export default router;