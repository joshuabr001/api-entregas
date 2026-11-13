import express from "express"
import { errorHandling } from "./middlewares/error-hanlding.ts"
import { routes } from "./routes/index.ts"

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use(routes)

app.use(errorHandling)

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`))
