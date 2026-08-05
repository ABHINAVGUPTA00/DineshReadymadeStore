import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ error: 'Failed to create order' });
    }

    res.json(order);
  } catch (error) {
    console.error("Error creating razorpay order:", error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required payment details' });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // TODO: Save order status as "PAID" in Firestore using Firebase Admin SDK here
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
