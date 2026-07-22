'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Film } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/50 bg-black"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black cursor-pointer"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="relative aspect-video w-full">
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
              title="Ceylon Ride Tours Cinematic Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="p-4 bg-[#022C22] text-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-bold font-serif">Ceylon Ride Tours • Cinematic Paradise Journey</span>
            </div>
            <span className="text-[#D4AF37] font-semibold">4K Ultra HD</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
