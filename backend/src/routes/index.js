import { Router } from 'express';
import WordCardRouter from './wordCard.js';
import LearnSetRouter from './learnSet.js';
import TestRecordRouter from './testRecord.js';
import UserRouter from './user.js'

const router = Router();
router.use('/', WordCardRouter);
router.use('/', LearnSetRouter);
router.use('/', TestRecordRouter);
router.use('/', UserRouter);

export default router;