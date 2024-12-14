import express from 'express';
import { createStadium, getStadiums } from '../controllers/stadiumController.js';

const router = express.Router();

// Stadium routes
router.post('/', createStadium);
router.get('/', getStadiums);

export default router;
