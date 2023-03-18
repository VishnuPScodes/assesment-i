import mongoose from "mongoose";
import { Schema } from "mongoose";

interface IData {
  name: string;
  email: string;
  mobile: string;
  isMarried?: boolean;
}

const Data :Schema=mongoose.connect({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true
    },
    isMarried:{
        type:Boolean,
        required:true,
        default:false
    }
})

export const DataModel=mongoose.model<IData>("data",Data);