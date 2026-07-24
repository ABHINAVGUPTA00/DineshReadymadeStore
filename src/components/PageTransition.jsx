import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition({ isActive, onMidpoint }) {
  useEffect(() => {
    if (isActive) {
      // Trigger midpoint after the slide-in animation completes
      const timer = setTimeout(() => {
        if (onMidpoint) onMidpoint();
      }, 700); 
      return () => clearTimeout(timer);
    }
  }, [isActive, onMidpoint]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#ff0001] flex items-center justify-center pointer-events-none"
        >
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ delay: 0.3, duration: 0.4 }}
             className="overflow-hidden"
          >
            <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tighter text-center m-0">
              DINESH READYMADESTORE.
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
