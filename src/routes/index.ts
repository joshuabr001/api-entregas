import { Router } from "express"
import { userRoutes } from "./users-routes.ts"

const routes = Router()

routes.use("/users", userRoutes)

export {routes}