import express from 'express';
import { createfile } from '../controllers/output_false.js';

const router = express.Router();

router.post('/createfile', createfile);

export default router;