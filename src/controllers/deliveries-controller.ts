import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.ts"
import z from "zod"
import { AppError } from "../utils/AppError.ts"

class DeliveriesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      user_id: z.uuid(),
      description: z.string(),
    })

    const { user_id, description } = bodySchema.parse(request.body)

    await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      },
    })

    return response.json({ message: "Created" })
  }
  async index(request: Request, response: Response) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
    })

    return response.json(deliveries)
  }
}

export { DeliveriesController }
