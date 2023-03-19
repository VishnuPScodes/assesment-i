import express, { json } from 'express'
import  cors from "cors";
import { connect } from './src/db/db';
import dataController from './src/controllers/data.controller'
import swaggerjsdoc from 'swagger-jsdoc'
import swaggerui from 'swagger-ui-express'

const app=express();
app.use(cors());
app.use(express.json())
app.use("/data",dataController)
app.use(express.json())

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/controllers/*.controller.ts"],
};

const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));

app.listen(5000,async()=>{
    try {
        await connect()
    } catch (error) {
        console.log('error',error)
    }
    console.log('listening to the port 5000')
})

export default app
