import { type Request, type Response, type NextFunction } from "express"
import { AppError } from "../utils/AppError.ts"
import jwt from "jsonwebtoken"
import { authConfig } from "../configs/auth.ts"

interface TokenPayload {
  role: string
  sub: string
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.headers.authorization?.split(" ")[1]

  if (!token) {
    throw new AppError("Token não informado", 401)
  }

  const { role, sub: user_id } = jwt.verify(
    token,
    authConfig.jwt.secret,
  ) as TokenPayload

  request.user = {
    id: user_id,
    role,
  }

  next()
}

export { ensureAuthenticated }
