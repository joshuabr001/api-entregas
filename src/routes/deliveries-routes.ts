import { Router } from "express"
import { DeliveriesController } from "../controllers/deliveries-controller.ts"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated.ts"

const deliveriesRoutes = Router()
const deliveriesController = new DeliveriesController()

deliveriesRoutes.use(ensureAuthenticated)

deliveriesRoutes.post("/", deliveriesController.create)

export { deliveriesRoutes }
