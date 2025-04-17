import { Application, Router } from "express"
import TerminalController from "../controllers/terminal.controllers"
import {
  terminalSchema,
  terminalUpdateSchema,
} from "../validators/terminal.schema"
import validateRequest from "../../../shared/middleware/validation/request"

const router = Router()

router.post("/", validateRequest(terminalSchema), TerminalController.register)

router.get("/", TerminalController.list)

router.get("/:id", TerminalController.detail)

router.put(
  "/:id",
  validateRequest(terminalUpdateSchema),
  TerminalController.update,
)

router.delete("/:id", TerminalController.remove)

router.patch("/:id/disable", TerminalController.disable)

export default function terminalRoutes(app: Application) {
  app.use("/api/v1/terminals", router)
}
