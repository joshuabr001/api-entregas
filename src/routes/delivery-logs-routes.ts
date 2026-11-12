import { Router } from "express"
import { DeliveryLogsController } from "../controllers/delivery-logs-controller.ts"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.ts"
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization.ts"

const deliveryLogsRouter = Router()
const deliveryLogsController = new DeliveryLogsController()

deliveryLogsRouter.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create,
)

export { deliveryLogsRouter }
