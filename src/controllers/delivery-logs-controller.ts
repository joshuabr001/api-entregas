import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.ts"
import z from "zod"
import { AppError } from "../utils/AppError.ts"

class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      delivery_id: z.uuid(),
      description: z.string(),
    })

    const { delivery_id, description } = bodySchema.parse(request.body)

    const delivery = await prisma.delivery.findFirst({
      where: {
        id: delivery_id,
      },
    })

    if (!delivery) {
      throw new AppError("Delovery not found")
    }

    if (delivery.status === "processing") {
      throw new AppError("Change status to shipped")
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    })

    return response.json({ message: "Ok" })
  }
}

export { DeliveryLogsController }
