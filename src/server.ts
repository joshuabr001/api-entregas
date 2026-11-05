import express from "express"
import { errorHandling } from "./middlewares/error-hanlding.ts"

const PORT = 3333
const app = express()

app.use(express.json())



app.use(errorHandling)

app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`))