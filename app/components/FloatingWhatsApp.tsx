'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.a
        href="https://wa.me/94771234567?text=Hello%20Ceylon%20Ride%20Tours,%20I%20would%20like%20to%20inquire%20about%20a%20private%20vehicle%20booking%20and%20tour."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_10px_25px_rgba(16,185,129,0.4)] border border-emerald-300/40 cursor-pointer"
        aria-label="WhatsApp VIP Concierge Chat"
      >
        {/* Pulsing Outer Aura */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 text-white fill-white/20 group-hover:rotate-12 transition-transform" />

        {/* Tooltip on Hover */}
        <span className="absolute right-16 bg-[#022C22] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          24/7 WhatsApp VIP Concierge
        </span>
      </motion.a>
    </div>
  );
}
