import express from 'express';
import { deletefolder, createfile, createfolder, deletefile } from '../controllers/output_false.js';

const router = express.Router();

router.post('/createfile', createfile);
router.post('/deletefile', deletefile);
router.post('/createfolder', createfolder);
router.post('/deletefolder', deletefolder);

export default router;