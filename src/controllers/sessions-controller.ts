import { type Request, type Response } from "express"
import { prisma } from "../database/prisma.ts"
import bcript from "bcrypt"
import z from "zod"
import { AppError } from "../utils/AppError.ts"
import { authConfig } from "../configs/auth.ts"
import jwt from "jsonwebtoken"

class SessionController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await prisma.user.findFirst({ where: { email } })

    if (!user) {
      throw new AppError("User not found", 401)
    }

    const passwordMatched = await bcript.compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("Password invalid", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = jwt.sign({ role: user.role ?? "customer" }, secret, {
      subject: user.id,
      expiresIn,
    })

    return response.json({ token })
  }
}

export { SessionController }
