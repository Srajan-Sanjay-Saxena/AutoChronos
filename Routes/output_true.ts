import express from 'express';
import { lsDir,history,fileRead } from '../controllers/output_true.js';

const router = express.Router();

router.get('/lsDir', lsDir);
router.get('/history', history);
router.get("/fileRead",fileRead);

export default router;