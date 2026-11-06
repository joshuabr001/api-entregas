import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.ts"
import { hash } from "bcrypt"
import z from "zod"
import { AppError } from "../utils/AppError.ts"

class SessionController {
  async create(request: Request, response: Response) {
    return response.json({message: "Ok"})
  }
}

export { SessionController }
