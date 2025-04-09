import express from 'express';
import { getlog } from '../controllers/redis/GUI/getlog.controller.js';

const logRouter = express.Router();

logRouter.get('/', getlog);

export default logRouter;