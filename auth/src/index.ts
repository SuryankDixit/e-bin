import mongoose from "mongoose"
import { app } from "./app"

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT must be defined')
    }

    try{
        await mongoose.connect('mongodb://auth-mongo-serv:27017/auth')
        //connecting using cluster IP

        console.log('connected to mongo')
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("listening on 3000");
    })
    
   
}

start();

