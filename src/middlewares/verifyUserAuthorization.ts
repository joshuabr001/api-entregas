import { type Request, type Response, type NextFunction } from "express"
import { AppError } from "../utils/AppError.ts"
import { request } from "node:http"

function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Unaunthorized", 401)
    }

    if (!role.includes(request.user.role)) {
      throw new AppError("Unaunthorized", 401)
    }

    return next()
  }
}

export { verifyUserAuthorization }
