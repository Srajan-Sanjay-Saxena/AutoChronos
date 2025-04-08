import express from 'express';
import { deleteFolder, createFile, createFolder, deleteFile } from '../controllers/output_false.js';
const router = express.Router();
router.post('/createFile', createFile);
router.post('/deleteFile', deleteFile);
router.post('/createFolder', createFolder);
router.post('/deleteFolder', deleteFolder);
export default router;
