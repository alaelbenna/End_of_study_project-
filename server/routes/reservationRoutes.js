import express from 'express';
import { createReservation, getReservations } from '../controllers/reservationController.js';

const router = express.Router();

// Reservation routes
router.post('/', createReservation);
router.get('/', getReservations);

export default router;
