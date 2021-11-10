import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {

    // checking if env variable is defined or not at the start of the application
    if (!process.env.JWT_KEY) {
        throw new Error('Undefined environment variable');
    }

    /*
        await mongoose.connect('mongodb://localhost');
        Here we are trying to connect to mongo db which is a different pod

        auth-mongo-srv is the domain name of the pod, see in yaml file.
        mention port number
        give db name 
    */
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to Mongo Db');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!');
    });
};

start();