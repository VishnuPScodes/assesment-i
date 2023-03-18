
import mongoose from "mongoose";

export  const connect =()=>{
    return mongoose.connect(
      "mongodb+srv://vishnu:vishnu123@cluster0.7iskypo.mongodb.net/?retryWrites=true&w=majority"
    );
}



