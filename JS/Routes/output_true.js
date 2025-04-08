import express from 'express';
import { lsDir } from '../controllers/output_true.js';
const router = express.Router();
router.get('/lsDir', lsDir);
export default router;
