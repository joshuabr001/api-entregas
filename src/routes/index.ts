import { Router } from "express"
import { userRoutes } from "./users-routes.ts"
import { sessionRoutes } from "./sessions-routes.ts"
import { deliveriesRoutes } from "./deliveries-routes.ts"
import { deliveryLogsRouter } from "./delivery-logs-routes.ts"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/deliveries", deliveriesRoutes)
routes.use("/delivery-logs", deliveryLogsRouter)

export { routes }
