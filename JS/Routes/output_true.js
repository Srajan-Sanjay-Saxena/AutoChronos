import express from 'express';
import { lsDir, history, fileRead } from '../controllers/output_true.js';
export const readRouter = express.Router();
readRouter.get('/lsDir', lsDir);
readRouter.get('/history', history);
readRouter.get("/fileRead", fileRead);
