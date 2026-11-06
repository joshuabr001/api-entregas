import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.ts"
import bcript from "bcrypt"
import z from "zod"
import { AppError } from "../utils/AppError.ts"

class UserController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.email(),
      password: z.string().min(6),
    })

    const { name, email, password } = bodySchema.parse(request.body)

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

    if (userWithSameEmail) {
      throw new AppError("User with same email alredy exists")
    }

    const hashedPassword = await bcript.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const { password: _, ...userWithOutPassword } = user

    return response.status(201).json(userWithOutPassword)
  }
}

export { UserController }
