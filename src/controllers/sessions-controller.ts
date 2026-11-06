import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.ts"
import { compare } from "bcrypt"
import z, { email } from "zod"
import { AppError } from "../utils/AppError.ts"

class SessionController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({ where: { email } })

    if(!user) {
      throw new AppError("User not found", 401)
    }

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new AppError("Password invalid", 401)
    }

    return response.json({ message: "Ok" })
  }
}

export { SessionController }
