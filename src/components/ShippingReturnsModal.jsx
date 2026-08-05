import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, RefreshCcw, ArrowRight, CheckCircle2, Clock, Truck } from 'lucide-react';
import { getOrders } from '../services/database';

export default function ShippingReturnsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('track'); // track or return
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingError, setTrackingError] = useState('');

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setTrackingError('');
    setTrackingResult(null);

    if (!orderId) {
      setTrackingError('Please enter an Order ID.');
      return;
    }

    const allOrders = getOrders();
    const order = allOrders.find(o => o.id === orderId || o.id === `ORD-${orderId}`);

    if (order) {
      // If email is provided, verify it (optional, but good practice)
      if (email && order.userEmail && order.userEmail !== email) {
        setTrackingError('Order found, but the email address does not match.');
      } else {
        setTrackingResult(order);
      }
    } else {
      setTrackingError('Order not found. Please verify your Order ID.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12 bg-[#ede4dd]/90 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white w-full max-w-4xl h-full md:h-auto md:min-h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-black/5 flex flex-col md:flex-row relative"
          >
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-black text-white hover:bg-[#ff0001] rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>

            {/* Left Side Aesthetic */}
            <div className="hidden md:flex md:w-1/3 bg-black text-[#ede4dd] p-12 flex-col justify-between relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-4">DRS<br />Client<br />Services</h2>
                 <p className="text-sm font-medium opacity-60">Exceptional service for exceptional apparel.</p>
               </div>
               <div className="relative z-10 flex flex-col gap-4">
                 <button onClick={() => setActiveTab('track')} className={`text-left text-lg font-bold uppercase tracking-widest transition-colors ${activeTab === 'track' ? 'text-[#ff0001]' : 'text-white/50 hover:text-white'}`}>Track Order</button>
                 <button onClick={() => setActiveTab('return')} className={`text-left text-lg font-bold uppercase tracking-widest transition-colors ${activeTab === 'return' ? 'text-[#ff0001]' : 'text-white/50 hover:text-white'}`}>Process Return</button>
               </div>
               {/* Decorative huge text */}
               <div className="absolute -bottom-10 -left-10 text-[150px] font-black text-white/5 leading-none pointer-events-none select-none">
                  {activeTab === 'track' ? '01' : '02'}
               </div>
            </div>

            {/* Right Side Form */}
            <div className="flex-1 p-6 md:p-16 flex flex-col justify-center bg-[#ede4dd]">
              
              {/* Mobile Tabs */}
              <div className="flex md:hidden gap-6 mb-10 border-b-2 border-black/10 pb-4 mt-10 md:mt-0">
                <button onClick={() => setActiveTab('track')} className={`text-sm font-black uppercase tracking-widest transition-colors ${activeTab === 'track' ? 'text-[#ff0001]' : 'text-black/40'}`}>Track Order</button>
                <button onClick={() => setActiveTab('return')} className={`text-sm font-black uppercase tracking-widest transition-colors ${activeTab === 'return' ? 'text-[#ff0001]' : 'text-black/40'}`}>Process Return</button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'track' ? (
                  <motion.div 
                    key="track"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-8 flex items-center gap-4">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Locate Your Package</h3>
                        <p className="text-xs font-bold text-black/50 uppercase tracking-widest">Real-time GPS Tracking</p>
                      </div>
                    </div>

                    {trackingResult ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-white border-2 border-black/10 rounded-2xl p-6 md:p-8"
                    >
                      <button onClick={() => setTrackingResult(null)} className="text-xs font-bold uppercase tracking-widest text-black/50 hover:text-black mb-6">&larr; Back to Search</button>
                      <h4 className="text-xl font-black uppercase tracking-tighter mb-1">Order {trackingResult.id}</h4>
                      <p className="text-xs font-bold text-black/50 uppercase tracking-widest mb-8">Placed on {new Date(trackingResult.date).toLocaleDateString()}</p>
                      
                      {/* Tracking Timeline */}
                      <div className="relative border-l-2 border-black/10 ml-4 space-y-8 pb-4">
                        
                        {/* Processing Step */}
                        <div className="relative pl-8">
                          <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full flex items-center justify-center ${['Processing', 'Shipped', 'Delivered'].includes(trackingResult.status) ? 'bg-black text-white' : 'bg-[#ede4dd] border-2 border-black/20'}`}>
                            {['Processing', 'Shipped', 'Delivered'].includes(trackingResult.status) && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                          <h5 className="font-bold text-sm uppercase tracking-wider">Order Confirmed</h5>
                          <p className="text-[10px] text-black/50 font-bold uppercase tracking-widest mt-1">We have received your order.</p>
                        </div>

                        {/* Shipped Step */}
                        <div className="relative pl-8">
                          <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full flex items-center justify-center ${['Shipped', 'Delivered'].includes(trackingResult.status) ? 'bg-black text-white' : 'bg-[#ede4dd] border-2 border-black/20'}`}>
                            {['Shipped', 'Delivered'].includes(trackingResult.status) ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3 text-black/30" />}
                          </div>
                          <h5 className={`font-bold text-sm uppercase tracking-wider ${['Shipped', 'Delivered'].includes(trackingResult.status) ? 'text-black' : 'text-black/40'}`}>Shipped</h5>
                          <p className="text-[10px] text-black/50 font-bold uppercase tracking-widest mt-1">Your package is on the way.</p>
                        </div>

                        {/* Delivered Step */}
                        <div className="relative pl-8">
                          <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full flex items-center justify-center ${trackingResult.status === 'Delivered' ? 'bg-[#ff0001] text-white shadow-[0_0_10px_rgba(255,0,1,0.5)]' : 'bg-[#ede4dd] border-2 border-black/20'}`}>
                            {trackingResult.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3" /> : <Truck className="w-3 h-3 text-black/30" />}
                          </div>
                          <h5 className={`font-bold text-sm uppercase tracking-wider ${trackingResult.status === 'Delivered' ? 'text-[#ff0001]' : 'text-black/40'}`}>Delivered</h5>
                          <p className="text-[10px] text-black/50 font-bold uppercase tracking-widest mt-1">Package has arrived.</p>
                        </div>

                      </div>
                    </motion.div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleTrackOrder}>
                      {trackingError && (
                        <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-xs font-bold">
                          {trackingError}
                        </div>
                      )}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-black/60 mb-2">Order ID</label>
                        <input type="text" placeholder="e.g. ORD-12345678" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="w-full bg-white border-2 border-black/10 rounded-xl px-5 py-4 font-bold focus:outline-none focus:border-[#ff0001] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-black/60 mb-2">Email Address</label>
                        <input type="email" placeholder="Used during checkout (optional)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border-2 border-black/10 rounded-xl px-5 py-4 font-bold focus:outline-none focus:border-[#ff0001] transition-colors" />
                      </div>
                      <button className="w-full bg-[#ff0001] text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2 group mt-4">
                        Track Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  )}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="return"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-8 flex items-center gap-4">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                        <RefreshCcw className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Initiate a Return</h3>
                        <p className="text-xs font-bold text-black/50 uppercase tracking-widest">Hassle-free Exchanges</p>
                      </div>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Return request received. Our team will contact you shortly."); }}>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-black/60 mb-2">Order ID</label>
                        <input type="text" placeholder="e.g. ORD-12345678" value={orderId} onChange={(e) => setOrderId(e.target.value)} className="w-full bg-white border-2 border-black/10 rounded-xl px-5 py-4 font-bold focus:outline-none focus:border-[#ff0001] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-black/60 mb-2">Reason for Return</label>
                        <select className="w-full bg-white border-2 border-black/10 rounded-xl px-5 py-4 font-bold focus:outline-none focus:border-[#ff0001] transition-colors appearance-none">
                          <option>Size doesn't fit</option>
                          <option>Not what I expected</option>
                          <option>Received damaged item</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <button className="w-full bg-black text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#ff0001] transition-colors flex items-center justify-center gap-2 mt-4">
                        Submit Request
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
