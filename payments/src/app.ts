import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError,currentUser } from '@sdebin/common';
import { createChargeRouter } from './routes/new';

const app = express();
/*
we are just adding in this little step right here to make sure that Express is aware
that it's behind a proxy of Ingress and Genex and to make sure that it should still trust traffic as
being secure, even though it's coming from that proxy.
*/
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUser);

app.use(createChargeRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };