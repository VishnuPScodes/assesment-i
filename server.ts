import express from 'express'

import { connect } from './src/db/db';
import dataController from './src/controllers/data.controller'
const app=express();

app.use("/data",dataController)

app.listen(5000,async()=>{
    try {
        await connect()
    } catch (error) {
        console.log('error',error)
    }
    console.log('listening to the port 5000')
})

