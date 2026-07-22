'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-[#0F766E] via-[#0EA5A4] to-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
