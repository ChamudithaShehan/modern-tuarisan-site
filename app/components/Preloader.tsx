'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#022C22] text-white select-none"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_#0EA5A4_0%,_transparent_70%)] animate-pulse-glow" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center text-center px-4"
          >
            {/* Brand Logo Symbol */}
            <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <span className="text-3xl font-serif font-bold text-[#D4AF37]">C</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-[#FAFAF9] font-serif uppercase">
              Ceylon Ride Tours
            </h1>
            <p className="text-xs md:text-sm text-[#D4AF37] tracking-[0.3em] uppercase mt-2 font-medium">
              Private Luxury Travel • Sri Lanka
            </p>

            {/* Loading Bar */}
            <div className="w-48 h-[2px] bg-white/20 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
