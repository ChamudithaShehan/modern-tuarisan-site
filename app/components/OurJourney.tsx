'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Compass, Award, MapPin, Sparkles, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { JOURNEY_STORIES } from '../../data/journeyData';
import { JourneyStory } from '../../types';

export default function OurJourney() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedStory, setSelectedStory] = useState<JourneyStory | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Hill Country', 'Wildlife', 'Drone Views', 'Beach', 'VIP Transport', 'Road Trip'];

  const filteredStories = activeFilter === 'All'
    ? JOURNEY_STORIES
    : JOURNEY_STORIES.filter((s) => s.category === activeFilter);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.85;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="journey" className="py-20 sm:py-24 bg-[#022C22] text-white relative overflow-hidden">
      {/* Background Ambient Glow & Patterns */}
      <div className="absolute inset-0 bg-dark-emerald-pattern opacity-70 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#0EA5A4]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" /> Real Tour Records & Memories
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Our Journey: Island Expeditions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300">
            Explore thousands of completed private journeys across high mountain peaks, wildlife safaris, and golden sea coasts.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 shadow-lg scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Swipe Navigation Controls */}
        <div className="flex md:hidden items-center justify-between mb-4 px-2 text-xs">
          <span className="text-[#D4AF37] font-bold uppercase tracking-wider">
            👉 Swipe Journey Stories ({filteredStories.length})
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stories Grid / Mobile Snap Carousel */}
        <div
          ref={carouselRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-6 md:pb-0 scrollbar-none"
        >
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story) => (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedStory(story)}
                className="w-[85vw] sm:w-[70vw] md:w-full flex-shrink-0 snap-center rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 hover:border-[#D4AF37] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-gray-900">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#022C22] via-transparent to-transparent" />

                    <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest bg-black/60 text-[#D4AF37] border border-[#D4AF37]/40 px-3 py-1 rounded-full backdrop-blur-md">
                      {story.category}
                    </span>

                    <span className="absolute top-4 right-4 text-[10px] font-semibold text-gray-300 bg-white/10 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                      {story.date}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-1.5 text-xs text-[#0EA5A4] font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{story.location}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">
                      {story.title}
                    </h3>

                    <p className="text-xs text-gray-300 italic line-clamp-3 mb-3 leading-relaxed">
                      "{story.testimonialSnippet}"
                    </p>

                    {story.stats && (
                      <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#D4AF37] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" /> {story.stats}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                  <div>
                    <span className="text-[9px] text-gray-400 block">Traveler</span>
                    <span className="font-semibold text-white">{story.clientName} ({story.clientCountry})</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Story Lightbox Popup */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#022C22] border border-[#D4AF37]/50 rounded-3xl max-w-xl w-full p-6 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="relative h-56 -mx-6 -mt-6 mb-5 bg-gray-900">
                <img src={selectedStory.imageUrl} alt={selectedStory.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black cursor-pointer"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="text-xs text-[#D4AF37] font-bold uppercase">{selectedStory.location}</span>
                  <h3 className="text-xl font-serif font-bold text-white">{selectedStory.title}</h3>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-4 text-xs">
                <p className="italic text-gray-200 text-xs mb-3">"{selectedStory.testimonialSnippet}"</p>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  <div><strong>Travelers:</strong> {selectedStory.clientName}</div>
                  <div><strong>Country:</strong> {selectedStory.clientCountry}</div>
                  <div><strong>Vehicle Used:</strong> {selectedStory.vehicleUsed}</div>
                  <div><strong>Tour Date:</strong> {selectedStory.date}</div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase px-6 py-2.5 rounded-full"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
