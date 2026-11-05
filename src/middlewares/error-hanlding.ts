import { type Request, type Response, type NextFunction } from "express"
import { AppError } from "../utils/AppError.ts"

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({message: error.message})
  }

  return response.status(500).json({message: error.message})
}
