import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, LogOut, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { getUserOrders, logoutUser } from '../utils/db';

export default function UserDashboard({ isOpen, onClose, user, onLogout }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isOpen && user) {
      setOrders(getUserOrders(user.email));
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const handleLogout = () => {
    logoutUser();
    onLogout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-end p-4 sm:p-6 bg-charcoal-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.87, 0, 0.13, 1] }}
            className="bg-[#ede4dd] w-full max-w-lg h-full rounded-3xl shadow-2xl flex flex-col overflow-hidden relative border border-black/10"
          >
            {/* Header */}
            <div className="p-6 bg-white border-b-4 border-black/10 flex justify-between items-center relative z-20">
              <div>
                <h2 className="text-2xl font-black text-black uppercase tracking-tighter">My Account</h2>
                <p className="text-xs font-bold text-black/50 uppercase tracking-widest">{user.email}</p>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-charcoal-200 p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-cream">
              {/* Profile Card */}
              <div className="bg-white p-6 rounded-2xl border-2 border-black/10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-maroon-700 text-white flex items-center justify-center text-2xl font-black uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-xl uppercase tracking-tighter">{user.name}</p>
                    <p className="text-xs font-bold text-black/50 uppercase tracking-widest">Store Member</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="p-2 hover:bg-red-50 text-maroon-700 rounded-full transition-colors" title="Sign Out">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Order History */}
              <div>
                <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-maroon-700" /> Order History
                </h3>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-white/50 border-2 border-dashed border-black/10 rounded-2xl">
                    <p className="text-sm font-bold text-black/50 uppercase tracking-widest">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-2xl border-2 border-black/10 shadow-sm">
                        <div className="flex justify-between items-start mb-3 border-b-2 border-black/5 pb-3">
                          <div>
                            <span className="text-xs font-mono font-bold bg-black text-white px-2 py-0.5 rounded uppercase">{order.id}</span>
                            <p className="text-xs font-bold text-black/60 uppercase tracking-widest flex items-center gap-1 mt-2">
                              <Calendar className="w-3 h-3" /> {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-black text-maroon-700">₹{order.total.toLocaleString('en-IN')}</p>
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 inline-block ${
                              order.status === 'Processing' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {order.status || 'Processing'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex gap-3 text-sm font-bold bg-[#ede4dd] p-2 rounded-lg">
                              <div className="w-10 h-10 bg-white rounded overflow-hidden flex-shrink-0">
                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 flex flex-col justify-center">
                                <span className="line-clamp-1 leading-tight">{item.name}</span>
                                <span className="text-xs text-maroon-700 uppercase tracking-widest">{item.quantity}x • {item.selectedSize}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-xs font-bold text-black/60 bg-black/5 p-3 rounded-xl flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-maroon-700 flex-shrink-0 mt-0.5" />
                          <p className="uppercase tracking-wider">
                            Delivering to: <span className="text-black">{order.shippingDetails?.fullName}</span><br/>
                            {order.shippingDetails?.city}, {order.shippingDetails?.state}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
