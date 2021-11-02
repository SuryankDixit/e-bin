import  express  from "express";
import 'express-async-errors';
import  mongoose  from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.use(express.json());

/*
we are just adding in this little step right here to make sure that Express is aware
that it's behind a proxy of Ingress and Genex and to make sure that it should still trust traffic as
being secure, even though it's coming from that proxy.
*/
app.set('trust proxy',true);

app.use(
    cookieSession({
        signed:false,
        secure:true         // visit over https connection
    })
)

import {currentUserRouter} from './routes/current-user';
import {signinRouter} from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async(req,res) => {
    throw new NotFoundError();
});

app.use(errorHandler);


const start = async()=>{
    /*
        await mongoose.connect('mongodb://localhost');
        Here we are trying to connect to mongo db which is a different pod

        auth-mongo-srv is the domain name of the pod, see in yaml file.
        mention port number
        give db name 
    */
   try{
       await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
       console.log('Connected to Mongo Db');
   }catch(err){
       console.error(err);
   }
}


app.listen(3000,()=>{
    console.log("Listening on port 3000 !!!!");
});

start();
