import { Router } from 'express';
import WordCardRouter from './wordCard.js';
import LearnSetRouter from './learnSet.js';
const router = Router();
router.use('/', WordCardRouter);
router.use('/', LearnSetRouter);
export default router;