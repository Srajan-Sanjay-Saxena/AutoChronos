import express from 'express';
import { getlog } from '../controllers/logfiles.js';
export const logger = express.Router();
logger.get('/getlogfile', getlog);
