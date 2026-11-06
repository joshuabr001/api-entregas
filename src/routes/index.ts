import { Router } from "express"
import { userRoutes } from "./users-routes.ts"
import { sessionRoutes } from "./sessions-routes.ts"

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)

export { routes }
