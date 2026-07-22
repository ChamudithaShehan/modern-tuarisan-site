'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../../data/reviewsData';

export default function ClientReviews() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-tropical-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
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

        {/* Mobile Swipe Navigation Controls */}
        <div className="flex md:hidden items-center justify-between mb-4 px-2 text-xs">
          <span className="text-[#0F766E] font-bold uppercase tracking-wider">
            👉 Swipe Guest Reviews ({REVIEWS.length})
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-8 h-8 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-8 h-8 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center text-gray-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reviews Glass Grid / Mobile Horizontal Snap Carousel */}
        <div
          ref={carouselRef}
          className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-6 md:pb-0 scrollbar-none"
        >
          {REVIEWS.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-[85vw] sm:w-[70vw] md:w-full flex-shrink-0 snap-center glass-card p-6 sm:p-8 rounded-3xl border border-gray-200/80 hover:border-[#D4AF37] shadow-xl transition-all duration-300 relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#D4AF37]/20 pointer-events-none" />

              <div>
                {/* Rating & Date */}
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

                <h3 className="text-base sm:text-lg font-serif font-bold text-gray-900 mb-2">
                  {rev.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed italic mb-5">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                      <span>{rev.author}</span>
                      <span>{rev.flag}</span>
                    </h4>
                    <span className="text-[10px] text-gray-500">{rev.country}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#0F766E] font-bold block">{rev.tourTaken}</span>
                  <span className="text-[9px] text-gray-400 font-medium">{rev.vehicleBooked}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
