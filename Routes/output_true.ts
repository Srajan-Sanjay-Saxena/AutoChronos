import express from 'express';
import { lsDir } from '../controllers/output_true.js';

const router = express.Router();

router.post('/lsDir', lsDir);

export default router;