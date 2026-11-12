import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.ts"
import z from "zod"

class DeliveryLogsController {
  async create(request: Request, response: Response) {
    return response.json({ message: "Ok" })
  }
}

export { DeliveryLogsController }
