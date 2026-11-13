import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.ts"
import z from "zod"
import { AppError } from "../utils/AppError.ts"
import { report } from "node:process"

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

    if (delivery.status === "delivered") {
      throw new AppError("this order has already been delivered")
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    })

    return response.json({ message: "Ok" })
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      delivery_id: z.uuid(),
    })

    const { delivery_id } = paramsSchema.parse(request.params)

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        user: true,
        deliverylog: true,
      },
    })

    if (
      request.user?.role === "customer" &&
      request.user.id !== delivery?.userId
    ) {
      throw new AppError("the user can only view their deliveries", 401)
    }

    return response.json(delivery)
  }
}

export { DeliveryLogsController }
