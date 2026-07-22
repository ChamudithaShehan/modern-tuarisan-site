'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../../data/reviewsData';
import { Review } from '../../types';

export default function ClientReviews() {
  const [isHovered, setIsHovered] = useState(false);

  // Divide reviews into 3 columns for animated vertical scroll
  const col1 = [...REVIEWS, ...REVIEWS];
  const col2 = [...REVIEWS.slice().reverse(), ...REVIEWS.slice().reverse()];
  const col3 = [...REVIEWS.slice(2), ...REVIEWS.slice(0, 2), ...REVIEWS.slice(2), ...REVIEWS.slice(0, 2)];

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-tropical-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-widest mb-3">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> 5.0 Star Rated Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Guest Testimonials & Reviews
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Read verified reviews from international couples, families, and luxury travelers who explored Sri Lanka with us.
          </p>
        </div>

        {/* Seamless Integrated Vertical Testimonials Flow (NO BORDER, BLENDED INTO PAGE) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative h-[640px] overflow-hidden"
        >
          {/* Top & Bottom Seamless Page Fade Gradients */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#FAFAF9] via-[#FAFAF9]/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#FAFAF9] via-[#FAFAF9]/90 to-transparent z-20 pointer-events-none" />

          {/* 3 Seamless Infinite Vertical Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 h-full">
            {/* Column 1 (Scrolls Upward) */}
            <div className="overflow-hidden">
              <motion.div
                animate={{
                  y: isHovered ? [0, 0] : ['0%', '-50%'],
                }}
                transition={{
                  duration: 32,
                  ease: 'linear',
                  repeat: Infinity,
                }}
                className="space-y-6"
              >
                {col1.map((rev, idx) => (
                  <ReviewCard key={`c1-${idx}`} rev={rev} />
                ))}
              </motion.div>
            </div>

            {/* Column 2 (Scrolls Downward) */}
            <div className="hidden md:block overflow-hidden">
              <motion.div
                animate={{
                  y: isHovered ? [0, 0] : ['-50%', '0%'],
                }}
                transition={{
                  duration: 38,
                  ease: 'linear',
                  repeat: Infinity,
                }}
                className="space-y-6"
              >
                {col2.map((rev, idx) => (
                  <ReviewCard key={`c2-${idx}`} rev={rev} />
                ))}
              </motion.div>
            </div>

            {/* Column 3 (Scrolls Upward) */}
            <div className="hidden lg:block overflow-hidden">
              <motion.div
                animate={{
                  y: isHovered ? [0, 0] : ['0%', '-50%'],
                }}
                transition={{
                  duration: 34,
                  ease: 'linear',
                  repeat: Infinity,
                }}
                className="space-y-6"
              >
                {col3.map((rev, idx) => (
                  <ReviewCard key={`c3-${idx}`} rev={rev} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ rev }: { rev: Review }) {
  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-200/90 shadow-md hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 relative flex flex-col justify-between">
      <Quote className="absolute top-5 right-5 w-8 h-8 text-[#D4AF37]/20 pointer-events-none" />

      <div>
        {/* Rating Stars & Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {[...Array(rev.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {rev.date}
          </span>
        </div>

        <h4 className="text-base font-serif font-bold text-gray-900 mb-2 leading-snug">
          {rev.title}
        </h4>

        <p className="text-xs text-gray-600 leading-relaxed italic mb-4">
          "{rev.text}"
        </p>
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={rev.avatar} alt={rev.author} className="w-9 h-9 rounded-full object-cover border-2 border-[#D4AF37]" />
          <div>
            <h5 className="text-xs font-bold text-gray-900 flex items-center gap-1">
              <span>{rev.author}</span>
              <span>{rev.flag}</span>
            </h5>
            <span className="text-[10px] text-gray-500">{rev.country}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-[#0F766E] font-bold block">{rev.tourTaken}</span>
          <span className="text-[9px] text-gray-400 font-medium">{rev.vehicleBooked}</span>
        </div>
      </div>
    </div>
  );
}
