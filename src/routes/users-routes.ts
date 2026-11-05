import { Router } from "express"
import { UserController } from "../controllers/user-controller.ts"

const userRoutes = Router()
const usercontroller = new UserController()

userRoutes.post("/", usercontroller.create)

export { userRoutes }
