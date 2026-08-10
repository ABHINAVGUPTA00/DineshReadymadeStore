import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, MapPin, User } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-cream-50 rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl border border-charcoal-900/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-charcoal-900/60 hover:text-maroon-700 hover:bg-cream-200 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-charcoal-900 uppercase tracking-tighter">
                Contact Us
              </h2>
              <p className="text-sm font-bold text-charcoal-900/50 uppercase tracking-widest mt-2">
                Get in touch with us
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-maroon-100 p-3 rounded-full text-maroon-700 shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-charcoal-900/50 uppercase tracking-widest mb-1">
                    Owner Name
                  </p>
                  <p className="text-lg font-bold text-charcoal-900">
                    Vinod Prasad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-maroon-100 p-3 rounded-full text-maroon-700 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-charcoal-900/50 uppercase tracking-widest mb-1">
                    Address
                  </p>
                  <p className="text-sm font-bold text-charcoal-900 leading-relaxed">
                    2/9 Shri Ganesh Markeet<br />
                    Near Ghadi Chowk<br />
                    Pin Code: 490023
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-maroon-100 p-3 rounded-full text-maroon-700 shrink-0">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-charcoal-900/50 uppercase tracking-widest mb-1">
                    Instagram
                  </p>
                  <a
                    href="https://www.instagram.com/dinesh_readymade_store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-maroon-700 hover:text-maroon-800 transition-colors flex items-center gap-2"
                  >
                    @dinesh_readymade_store
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center border-t border-charcoal-900/10 pt-6">
              <p className="text-xs font-bold text-charcoal-900/40 uppercase">
                We typically reply within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
