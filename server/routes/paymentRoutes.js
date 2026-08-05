import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';

const router = express.Router();

// Route to generate a new order ID from Razorpay
router.post('/create-order', createOrder);

// Route to verify the payment signature securely on the server
router.post('/verify-payment', verifyPayment);

export default router;
