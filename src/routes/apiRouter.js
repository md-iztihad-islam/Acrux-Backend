import express from 'express';
import v1Router from './version01/v1Router.js';

const router = express.Router();

router.use("/v1", v1Router);

export default router;

//This is the main API router that directs requests to version 1 of the API