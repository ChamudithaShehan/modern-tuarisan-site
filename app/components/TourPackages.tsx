'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Navigation, Car, Sun, CheckCircle2, ArrowRight, Star, Clock, Sparkles, X, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { TOUR_PACKAGES } from '../../data/toursData';
import { Currency, CurrencyRate, TourPackage, WishlistItem } from '../../types';

interface TourPackagesProps {
  onOpenBooking: (options?: { tourId?: string; vehicleId?: string }) => void;
  currency: Currency;
  currencyRates: Record<Currency, CurrencyRate>;
  wishlistIds: string[];
  onToggleWishlist: (item: WishlistItem) => void;
}

export default function TourPackages({
  onOpenBooking,
  currency,
  currencyRates,
  wishlistIds,
  onToggleWishlist,
}: TourPackagesProps) {
  const [selectedTourModal, setSelectedTourModal] = useState<TourPackage | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const formatPrice = (priceUsd: number) => {
    const rateObj = currencyRates[currency] || { rate: 1, symbol: '$' };
    const converted = Math.round(priceUsd * rateObj.rate);
    return `${rateObj.symbol}${converted}`;
  };

  return (
    <section id="tours" className="py-20 sm:py-24 bg-gradient-to-b from-[#022C22] via-[#043C30] to-[#022C22] text-white relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-dark-emerald-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#0EA5A4]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" /> Curated Private Experiences
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Flagship Tour Packages
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300">
            Handcrafted luxury itineraries with dedicated private chauffeurs. Explore our signature packages below.
          </p>
        </div>

        {/* Tour Packages Cards Stack */}
        <div className="space-y-6 sm:space-y-12">
          {TOUR_PACKAGES.map((pkg, index) => {
            const isHiddenOnMobile = !showAllMobile && index >= 3;
            const isEven = index % 2 === 0;
            const isWishlisted = wishlistIds.includes(pkg.id);

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 hover:border-[#D4AF37]/80 shadow-2xl overflow-hidden ${
                  isHiddenOnMobile ? 'hidden sm:block' : 'block'
                }`}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Image Banner */}
                  <div className={`lg:col-span-5 relative h-56 sm:h-72 lg:h-full overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:to-transparent" />

                    {/* Package Number */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#022C22] border-2 border-[#D4AF37] flex items-center justify-center shadow-xl">
                      <span className="font-serif text-lg sm:text-2xl font-extrabold text-[#D4AF37]">
                        {pkg.packageNumber}
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() =>
                        onToggleWishlist({
                          id: pkg.id,
                          type: 'tour',
                          title: pkg.title,
                          image: pkg.image,
                          priceUsd: pkg.priceUsd,
                          subtitle: pkg.subtitle,
                        })
                      }
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                    </button>

                    {/* Rating & Tag */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-1 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                        <span className="font-bold">{pkg.rating}</span>
                      </div>
                      <span className="bg-[#0F766E] text-white px-3 py-1 rounded-full font-semibold text-[10px]">
                        {pkg.durationDays} Days / {pkg.durationNights} Nights
                      </span>
                    </div>
                  </div>

                  {/* Details Container */}
                  <div className={`lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                          {pkg.title}
                        </h3>
                        {pkg.isPopular && (
                          <span className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 text-[9px] sm:text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-300 mb-4 italic line-clamp-2">{pkg.subtitle}</p>

                      {/* Specs Pills */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs mb-4">
                        <div className="flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-[#0EA5A4]" />
                          <div>
                            <span className="text-[9px] text-gray-400 block">Distance</span>
                            <span className="font-semibold text-white">{pkg.distanceKm} km</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
                          <div>
                            <span className="text-[9px] text-gray-400 block">Best Season</span>
                            <span className="font-semibold text-white">{pkg.bestTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                          <Car className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <div>
                            <span className="text-[9px] text-gray-400 block">Vehicle</span>
                            <span className="font-semibold text-white line-clamp-1">{pkg.vehicleIncluded}</span>
                          </div>
                        </div>
                      </div>

                      {/* Destinations Covered */}
                      <div className="mb-4">
                        <span className="text-[11px] uppercase font-bold text-[#D4AF37] block mb-1.5">
                          Destinations:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {pkg.destinations.map((dest, i) => (
                            <span key={i} className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10 text-gray-200">
                              {dest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-gray-400 block">Price / Person</span>
                        <span className="text-xl sm:text-3xl font-serif font-extrabold gold-text-gradient">
                          {formatPrice(pkg.priceUsd)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedTourModal(pkg)}
                          className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] font-bold uppercase bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                        >
                          Itinerary
                        </button>
                        <button
                          onClick={() => onOpenBooking({ tourId: pkg.id })}
                          className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-[11px] uppercase px-4 sm:px-6 py-2.5 rounded-full shadow-lg flex items-center gap-1"
                        >
                          <span>Book</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile View More Button */}
        {TOUR_PACKAGES.length > 3 && (
          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg"
            >
              <span>{showAllMobile ? 'Show Less Packages' : `View All Packages (+${TOUR_PACKAGES.length - 3} More)`}</span>
              {showAllMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Full Itinerary Modal */}
      <AnimatePresence>
        {selectedTourModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedTourModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#022C22] border border-[#D4AF37]/40 rounded-3xl max-w-3xl w-full p-6 text-white shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedTourModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#D4AF37] text-gray-950 font-extrabold text-xs px-3 py-0.5 rounded-full uppercase">
                  Package #{selectedTourModal.packageNumber}
                </span>
                <span className="text-xs text-gray-300">{selectedTourModal.durationDays} Days / {selectedTourModal.durationNights} Nights</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-1">
                {selectedTourModal.title}
              </h3>
              <p className="text-xs text-gray-300 italic mb-6">{selectedTourModal.subtitle}</p>

              {/* Day Breakdown */}
              <div className="space-y-4">
                {selectedTourModal.itinerary.map((day) => (
                  <div key={day.day} className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row gap-4 items-start">
                    <img src={day.image} alt={day.title} className="w-full sm:w-32 h-24 object-cover rounded-xl border border-white/10 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#0F766E] text-[#D4AF37] font-bold text-[10px] px-2 py-0.5 rounded">
                          Day {day.day}
                        </span>
                        <span className="text-xs font-semibold text-[#0EA5A4]">📍 {day.location}</span>
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1">{day.title}</h5>
                      <p className="text-xs text-gray-300 leading-relaxed mb-2">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">Package Rate</span>
                  <span className="text-xl font-bold font-serif gold-text-gradient">{formatPrice(selectedTourModal.priceUsd)} / person</span>
                </div>

                <button
                  onClick={() => {
                    const tourId = selectedTourModal.id;
                    setSelectedTourModal(null);
                    onOpenBooking({ tourId });
                  }}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase px-6 py-3 rounded-full shadow-xl"
                >
                  Book Package
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
