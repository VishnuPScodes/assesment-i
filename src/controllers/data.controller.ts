import mongoose from "mongoose";
import express from "express";
import { DataModel } from "../models/data.model";

const router = express.Router();
//making a get request to get the data from the data base
router.get("/", async (req, res) => {
  try {
    const data = await DataModel.find().lean().exec();  //lean is used convert mongoose object to plain javascript obejct
   return res.status(200).send({
      success: true,
      data,
    });
  } catch (er) {
    console.error(er);
    let message = "An unknown error occurred";
    if (er instanceof mongoose.Error.CastError) {
      message = "Invalid parameter";
    }
   return res.status(400).send({
      success:false,
      message,
    });
  }
});

//post request to add data to the database
router.post('/',async(req,res)=>{
    try{
      const data=await DataModel.create(req.body);
     return res.status(201).send({
        success:true,
        data
      })
    }
    catch(er){
    console.error(er);
    let message = "An unknown error occurred";
     if (er instanceof mongoose.Error.CastError) {
       message = "Invalid parameter";
     }
   return res.status(400).send({
        success:false,
        message
    })
    }
})

//update request to update the data;
router.patch('/:id',async(req,res)=>{
    try{
    const data=await DataModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
    res.status(200).send({
      success:true,
      data
    })
    }
    catch(er){
     console.error(er);
     let message = "An unknown error occurred";
     if (er instanceof mongoose.Error.CastError) {
       message = "Invalid parameter";
     }
     return res.status(400).send({
       success: false,
       message,
     });
    }
})

//delete request
router.delete("/:id",async (req,res)=>{
  try {
    const data=await DataModel.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({
      success:true,
      data:data
    })
  } catch (er) {
     console.error(er);
     let message = "An unknown error occurred";
     if (er instanceof mongoose.Error.CastError) {
       message = "Invalid parameter";
     }
     return res.status(400).send({
       success: false,
       message,
     });
  }
})

export default router