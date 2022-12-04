import { Router } from 'express';
import WordCardRouter from './wordCard.js';
const router = Router();
router.use('/', WordCardRouter);
export default router;