import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

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
    var signin: () => Promise<string[]>;
}

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

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
};