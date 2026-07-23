import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Smartphone, Truck, MapPin, Printer, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveOrder, saveRating } from '../utils/db';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  orderTotals,
  onClearCart
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState('shipping'); // 'shipping' | 'payment' | 'confirmation' | 'rating'
  const [formData, setFormData] = useState({
    fullName: 'Rajesh Kumar',
    phone: '9876543210',
    email: 'rajesh@example.com',
    address: '102 Royal Residency, Main Market',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [upiId, setUpiId] = useState('rajesh@upi');
  const [orderId, setOrderId] = useState('');
  
  // Rating state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrder = saveOrder({
      shippingDetails: formData,
      paymentMethod,
      items: cartItems,
      total: orderTotals.total,
    });
    setOrderId(newOrder.id);
    setStep('confirmation');
    onClearCart();

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 }, colors: ['#ff0001', '#ede4dd', '#000000'] });
    } catch (err) {}
  };

  const handleSubmitRating = () => {
    saveRating(orderId, rating, comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#ede4dd] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 md:p-8 border-2 border-black/10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#ff0001] block">
              Dinesh Readymade Store
            </span>
            <h2 className="font-display font-extrabold text-2xl text-black uppercase">
              {step === 'confirmation' ? 'Order Confirmed!' : step === 'rating' ? 'Rate Your Experience' : 'Express Checkout'}
            </h2>
          </div>

          {(step !== 'confirmation' && step !== 'rating') && (
            <button onClick={onClose} className="p-2 text-black/70 hover:text-black rounded-full hover:bg-black/5 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STEP 1: Shipping Address Form */}
        {step === 'shipping' && (
          <form onSubmit={() => setStep('payment')} className="space-y-4">
            <h3 className="font-display font-bold text-sm text-black uppercase flex items-center gap-1.5 tracking-wider">
              <MapPin className="w-4 h-4 text-[#ff0001]" /> Delivery Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-black/80 block mb-1 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black/10 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#ff0001]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black/80 block mb-1 uppercase tracking-widest">Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black/10 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#ff0001]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-black/80 block mb-1 uppercase tracking-widest">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black/10 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#ff0001]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black/80 block mb-1 uppercase tracking-widest">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black/10 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#ff0001]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-black/80 block mb-1 uppercase tracking-widest">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full bg-white border-2 border-black/10 rounded-lg px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#ff0001]"
                />
              </div>
            </div>

            {/* Order Total Preview */}
            <div className="bg-white p-4 rounded-xl border-2 border-black/10 flex justify-between items-center text-sm font-bold uppercase mt-6">
              <span>Total Payable Amount:</span>
              <span className="font-display font-extrabold text-xl text-[#ff0001]">
                ₹{orderTotals.total.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-black hover:bg-[#ff0001] text-white font-black text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-colors mt-4"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* STEP 2: Payment Method */}
        {step === 'payment' && (
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <h3 className="font-display font-bold text-sm text-black uppercase flex items-center gap-1.5 tracking-wider">
              <CreditCard className="w-4 h-4 text-[#ff0001]" /> Select Payment Method
            </h3>

            {/* Payment Method Cards */}
            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('upi')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'bg-white border-[#ff0001]' : 'bg-white/50 border-black/10 hover:border-black/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Smartphone className="w-6 h-6 text-emerald-600" />
                  <div>
                    <span className="font-bold text-sm text-black block">Instant UPI Payment</span>
                    <span className="text-xs text-black/60 font-semibold">Google Pay, PhonePe, Paytm</span>
                  </div>
                </div>
                <input type="radio" name="payment" checked={paymentMethod === 'upi'} readOnly />
              </label>

              {paymentMethod === 'upi' && (
                <div className="p-4 bg-white border-2 border-black/10 rounded-lg text-xs space-y-2 ml-4">
                  <label className="block font-bold uppercase tracking-widest text-black/70">Enter your UPI ID:</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-[#ede4dd] border-2 border-black/10 rounded p-2 text-sm font-bold focus:outline-none focus:border-[#ff0001]"
                    required
                  />
                </div>
              )}

              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'bg-white border-[#ff0001]' : 'bg-white/50 border-black/10 hover:border-black/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <div>
                    <span className="font-bold text-sm text-black block">Credit / Debit Card</span>
                    <span className="text-xs text-black/60 font-semibold">Visa, Mastercard, RuPay</span>
                  </div>
                </div>
                <input type="radio" name="payment" checked={paymentMethod === 'card'} readOnly />
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'bg-white border-[#ff0001]' : 'bg-white/50 border-black/10 hover:border-black/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Truck className="w-6 h-6 text-[#ff0001]" />
                  <div>
                    <span className="font-bold text-sm text-black block">Cash On Delivery</span>
                    <span className="text-xs text-black/60 font-semibold">Pay cash/UPI at doorstep</span>
                  </div>
                </div>
                <input type="radio" name="payment" checked={paymentMethod === 'cod'} readOnly />
              </label>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="w-1/3 py-4 rounded-xl bg-black/10 hover:bg-black/20 text-black font-black text-xs uppercase tracking-widest transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-4 rounded-xl bg-[#ff0001] hover:bg-black text-white font-black text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span>Place Order</span>
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 'confirmation' && (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs uppercase font-mono bg-white border-2 border-black/10 text-black font-bold px-4 py-1.5 rounded-full">
                Order ID: {orderId}
              </span>
              <h3 className="font-display font-extrabold text-3xl text-black uppercase mt-6 tracking-tighter">
                Thank You, {formData.fullName}!
              </h3>
              <p className="text-sm font-semibold text-black/70 mt-2">
                Your order has been placed successfully. You will receive an SMS confirmation shortly.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep('rating')}
                className="w-full py-4 rounded-xl bg-black hover:bg-[#ff0001] text-white text-sm font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Rating Flow */}
        {step === 'rating' && (
          <div className="text-center space-y-6 py-8">
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className="hover:scale-110 transition-transform"
                >
                  <Star className={`w-12 h-12 ${rating >= star ? 'text-amber-400 fill-amber-400' : 'text-black/20'}`} />
                </button>
              ))}
            </div>

            <div className="text-left max-w-md mx-auto w-full space-y-4">
              <label className="block font-bold text-sm uppercase tracking-widest text-black">Leave a Review (Optional)</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="How was your shopping experience?"
                className="w-full bg-white border-2 border-black/10 rounded-xl p-4 text-sm font-semibold focus:outline-none focus:border-[#ff0001] min-h-[120px]"
              />
            </div>

            <div className="flex gap-4 max-w-md mx-auto w-full pt-4">
              <button
                onClick={onClose}
                className="w-1/3 py-4 rounded-xl bg-black/10 hover:bg-black/20 text-black font-black text-xs uppercase tracking-widest transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleSubmitRating}
                className="w-2/3 py-4 rounded-xl bg-[#ff0001] hover:bg-black text-white font-black text-sm uppercase tracking-widest shadow-lg transition-colors"
              >
                Submit Rating
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
