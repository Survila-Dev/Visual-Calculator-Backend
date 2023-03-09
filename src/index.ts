import express from "express"
import { Express } from "express"

const app: Express = express()
const port: string | undefined = process.env.PORT

app.use(express.json())

app.listen(() => console.log(`Server is listening to port ${port}`))
