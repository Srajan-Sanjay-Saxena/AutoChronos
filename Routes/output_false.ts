import express from 'express';
import { deleteFolder, createFile, createFolder, deleteFile } from '../controllers/output_false.js';

export const writeRouter = express.Router();

writeRouter.post('/createFile', createFile);
writeRouter.post('/deleteFile', deleteFile);
writeRouter.post('/createFolder', createFolder);
writeRouter.post('/deleteFolder', deleteFolder);

