import type { Request, Response } from "express";
import { HealthService } from "./health.service.js";

export class HealthController {
  private readonly healthService = new HealthService();

  getHealth(req: Request, res: Response) {
    const result = this.healthService.getHealth();

    return res.status(200).json(result);
  }
}