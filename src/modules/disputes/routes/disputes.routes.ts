import { Application, Router } from "express"
import {
  getAllDisputesController,
  createDisputeController,
  getDisputeByIdController,
  updateDisputeController,
  deleteDisputeController,
  getDisputeStatsController,
} from "../controllers/dispute.controller"

import validateRequest from "../../../shared/middleware/validation/request"
import { createDisputeSchema } from "../validators/dispute.schema"

const router = Router()
router.get("/", getAllDisputesController)
router.get("/:id", getDisputeByIdController)
router.put("/:id", updateDisputeController)
router.delete("/:id", deleteDisputeController)
// router.get("/stats", getDisputeStatsController)
router.post(
  "/",
  validateRequest(createDisputeSchema, "body"),
  createDisputeController,
)

export default (app: Application) => app.use("/api/v1/disputes", router)
