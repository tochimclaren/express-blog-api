import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST api Docs",
            version: "1.0.0",
        },
        servers: [
            {
              url: 'http://localhost:3000',
            },
          ],
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    sheme: "bearer",
                    bearerFormat: ""
                }
            }
        }
        , security: [{
            bearerAuth: ["sessionToken"]
        },
        ]
    },
    apis: ['./src/router/*.ts', "./src/docs/*.ts"]
}
const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs(app: Express, port: number) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get('docs.json', (_, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    console.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs;