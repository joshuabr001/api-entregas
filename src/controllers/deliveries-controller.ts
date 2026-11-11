import { type Request, type Response } from "express"
// import { prisma } from "../database/prisma.ts"
// import bcript from "bcrypt"
// import z from "zod"
// import { AppError } from "../utils/AppError.ts"
// import { authConfig } from "../configs/auth.ts"
// import jwt from "jsonwebtoken"

class DeliveriesController {
  async create(request: Request, response: Response) {
    return response.json({ message: "Ok" })
  }
}

export { DeliveriesController }
