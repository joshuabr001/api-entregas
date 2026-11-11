import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.ts"
import z from "zod"
import { AppError } from "../utils/AppError.ts"

class DeliveriesController {
  async create(request: Request, response: Response) {
    return response.json({ message: "Ok" })
  }
}

export { DeliveriesController }
