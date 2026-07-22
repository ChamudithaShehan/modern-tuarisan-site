'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sun, Calendar, ArrowRight, ExternalLink, Heart, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { DESTINATIONS } from '../../data/destinationsData';
import { Destination, WishlistItem } from '../../types';

interface DestinationsProps {
  onOpenBooking: (options?: { tourId?: string; vehicleId?: string }) => void;
  wishlistIds: string[];
  onToggleWishlist: (item: WishlistItem) => void;
}

const CATEGORIES = ['All', 'Highlands', 'Cultural', 'Coastal', 'Wildlife', 'Eastern'];

export default function Destinations({ onOpenBooking, wishlistIds, onToggleWishlist }: DestinationsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMapDest, setSelectedMapDest] = useState<Destination | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const filteredDestinations = selectedCategory === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.category === selectedCategory);

  return (
    <section id="destinations" className="py-20 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle Leaf Pattern */}
      <div className="absolute inset-0 bg-tropical-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#0F766E]" /> 14 Iconic Sri Lankan Destinations
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Explore Paradise Island Destinations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            From ancient rock citadels and cloud forest mountain gap viewings to turquoise ocean bays and wild leopard safaris.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAllMobile(false);
              }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#0F766E] to-[#022C22] text-[#D4AF37] shadow-lg scale-105 border border-[#D4AF37]/40'
                  : 'bg-[#FAFAF9] text-gray-700 hover:bg-gray-200 border border-gray-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Showcase / Mobile Limit 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest, idx) => {
              const isHiddenOnMobile = !showAllMobile && idx >= 3;
              const isWishlisted = wishlistIds.includes(dest.id);

              return (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                    isHiddenOnMobile ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-gray-900">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-[#0F766E] to-[#022C22] text-[#D4AF37] border border-[#D4AF37]/40 px-3 py-1 rounded-full shadow-lg">
                          {dest.category}
                        </span>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() =>
                          onToggleWishlist({
                            id: dest.id,
                            type: 'destination',
                            title: dest.name,
                            image: dest.image,
                            priceUsd: 0,
                            subtitle: dest.area,
                          })
                        }
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-transform hover:scale-110"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                      </button>

                      {/* Destination Name & Area */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-xs font-semibold text-[#0EA5A4] block">📍 {dest.area}</span>
                        <h3 className="text-2xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                          {dest.name}
                        </h3>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 sm:p-6">
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">{dest.description}</p>

                      {/* Weather Status Bar */}
                      <div className="bg-[#FAFAF9] p-3 rounded-2xl border border-gray-200/80 flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <div>
                            <span className="text-[10px] text-gray-500 font-medium block">Weather Status</span>
                            <span className="text-xs font-bold text-gray-900">{dest.weather.tempC}°C • {dest.weather.condition}</span>
                          </div>
                        </div>
                        <span className="text-[10px] bg-[#0F766E]/10 text-[#0F766E] font-bold px-2.5 py-1 rounded-full border border-[#0F766E]/20">
                          {dest.weather.bestMonths}
                        </span>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-1.5 mb-2">
                        {dest.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
                            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>Stay: <strong>{dest.recommendedDays} Days</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedMapDest(dest)}
                        className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-[#0F766E] hover:border-[#0F766E] shadow-sm transition-all"
                        title="View Google Map Route"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenBooking()}
                        className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:brightness-110 text-gray-950 font-bold text-xs uppercase px-4 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
                      >
                        <span>Book Vehicle</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-950" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mobile View More Button */}
        {filteredDestinations.length > 3 && (
          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="inline-flex items-center gap-2 bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg border border-[#D4AF37]/50"
            >
              <span>{showAllMobile ? 'Show Less Destinations' : `View All Destinations (+${filteredDestinations.length - 3} More)`}</span>
              {showAllMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-[#D4AF37]" />}
            </button>
          </div>
        )}
      </div>

      {/* Google Maps Route Modal */}
      <AnimatePresence>
        {selectedMapDest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setSelectedMapDest(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-hidden relative border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs text-[#0F766E] font-bold uppercase">Google Map Location & Route</span>
                  <h3 className="text-xl font-serif font-bold text-gray-900">{selectedMapDest.name} ({selectedMapDest.area})</h3>
                </div>
                <button
                  onClick={() => setSelectedMapDest(null)}
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full p-2"
                >
                  ✕
                </button>
              </div>

              <div className="relative h-80 rounded-2xl overflow-hidden border border-gray-200 mb-4 bg-gray-100">
                <iframe
                  title={selectedMapDest.name}
                  src={selectedMapDest.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Private Chauffeur Pickup available directly from BIA Airport or Colombo Hotels.</span>
                <button
                  onClick={() => {
                    setSelectedMapDest(null);
                    onOpenBooking();
                  }}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase px-5 py-2.5 rounded-full shadow-md"
                >
                  Book Transfer Here
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
