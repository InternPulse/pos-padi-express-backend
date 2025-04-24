import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import path from "path"
import { Express, Request, Response } from "express"

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "POS-Padi API",
      version: "1.0.0",
      description: "API documentation for the POS-Padi service",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: [path.resolve(__dirname, "../../modules/**/*.docs.{ts,js}")],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export default function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  app.use("/json-docs", swaggerUi.serve, (_: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerDocs)
  })
}
