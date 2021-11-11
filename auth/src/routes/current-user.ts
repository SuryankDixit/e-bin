
/*
    Whether or not the user is logged in ?
    does this user have a req.session.jwt set?
    If it is not set, or if the JWT is invalid, return early.
    if yes, and jwt is valid, send back the info stored inside the JWT(the payload)
*/

import express from 'express';
import { currentUser } from '@sdebin/common';
// import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };