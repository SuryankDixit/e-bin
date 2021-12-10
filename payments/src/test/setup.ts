import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

/*
declare global {
    namespace NodeJS {
        export interface Global {
            signin(): Promise<string[]>;
        }
    }
}
change to:
*/

declare global {
    var signin: (id?:string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51K57LNSJdPyw9npQR80qsM60ZQ940L4D3Qp2aW245KerxPOrtY4SUj1PhLuL5RAG7ZkQNuu5uL3BR23mF8TXCrRj00r6vxfoLf'
jest.setTimeout(50000);

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';

    // mongo = new MongoMemoryServer();
    // const mongoUri = await mongo.getUri();

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri,{});
});

beforeEach(async () => {
    jest.clearAllMocks();
    // getting all the connections
    const collections = await mongoose.connection.db.collections();

    // loop over them and delete all the data before each test
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = (id?:string) => {
    // Build a JWT payload.  { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com',
    };

    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
    // include cookie in array to make supertest array
};