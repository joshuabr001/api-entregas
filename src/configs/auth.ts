import type { SignOptions } from "jsonwebtoken"

const secret = process.env.AUTH_SECRET

if (!secret) {
  throw new Error("AUTH_SECRET environment variable is required")
}

export const authConfig = {
  jwt: {
    secret,
    expiresIn: "1d" as const satisfies SignOptions["expiresIn"],
  },
}
