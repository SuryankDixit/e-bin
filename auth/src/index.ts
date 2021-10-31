import  express  from "express";

const app = express();
app.use(express.json());

import {currentUserRouter} from './routes/current-user';
import {signinRouter} from './routes/signin';
import { signoutRouter } from './routes/signin';
import { signupRouter } from './routes/signin';

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.listen(3000,()=>{
    console.log("Listening on port 3000 !!!!");
});

