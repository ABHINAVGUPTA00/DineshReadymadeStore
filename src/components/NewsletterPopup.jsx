import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Only show if they haven't closed it before
    const hasSeenPopup = sessionStorage.getItem('drs_newsletter_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000); // 30 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('drs_newsletter_seen', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('10% OFF Code sent to ' + email + '!');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-[100] max-w-sm w-[calc(100%-3rem)] bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Glassmorphism shine effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
          
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4 text-black/50" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#ff0001] flex items-center justify-center text-white shadow-lg shadow-[#ff0001]/30">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black uppercase tracking-tighter text-lg leading-tight">10% OFF YOUR<br/>FIRST ORDER</h3>
            </div>
          </div>
          
          <p className="text-xs font-bold text-black/60 mb-5 leading-relaxed">
            Join the DRS club to get exclusive drops, secret sales, and a 10% discount on your first purchase today.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/50 border border-black/10 rounded-xl px-4 py-2 text-sm font-bold placeholder:text-black/30 focus:outline-none focus:border-[#ff0001] transition-colors"
              required
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-xl flex items-center justify-center hover:bg-[#ff0001] transition-colors shadow-lg"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
