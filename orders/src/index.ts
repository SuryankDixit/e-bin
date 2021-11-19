import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

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

   if(!process.env.MONGO_URI){
       throw new Error('MONGO_URI must be defined')
   }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Mongo Db in tickets');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Tickets Server: Listening on port 3000!!!!!!!!');
    });
};

start();