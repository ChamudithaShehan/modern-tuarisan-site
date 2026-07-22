'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Luggage, Wind, Wifi, Shield, ArrowRight, CheckCircle2, Car, Sparkles, Heart, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { FLEET_VEHICLES } from '../../data/fleetData';
import { Currency, CurrencyRate, WishlistItem } from '../../types';

interface VehicleFleetProps {
  onOpenBooking: (options?: { tourId?: string; vehicleId?: string }) => void;
  currency: Currency;
  currencyRates: Record<Currency, CurrencyRate>;
  wishlistIds: string[];
  onToggleWishlist: (item: WishlistItem) => void;
  selectedCompareIds: string[];
  onToggleCompare: (vehicleId: string) => void;
}

const CATEGORIES = ['All', 'Sedan', 'SUV', 'Luxury VIP', 'Van', 'Mini Coach', 'Economy'];

export default function VehicleFleet({
  onOpenBooking,
  currency,
  currencyRates,
  wishlistIds,
  onToggleWishlist,
  selectedCompareIds,
  onToggleCompare,
}: VehicleFleetProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [detailVehicle, setDetailVehicle] = useState<typeof FLEET_VEHICLES[0] | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const filteredVehicles = selectedCategory === 'All'
    ? FLEET_VEHICLES
    : FLEET_VEHICLES.filter((v) => v.category === selectedCategory);

  const formatPrice = (priceUsd: number) => {
    const rateObj = currencyRates[currency] || { rate: 1, symbol: '$' };
    const converted = Math.round(priceUsd * rateObj.rate);
    return `${rateObj.symbol}${converted}`;
  };

  return (
    <section id="fleet" className="py-20 sm:py-24 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Subtle Leaf Overlay */}
      <div className="absolute inset-0 bg-tropical-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-widest mb-3">
            <Car className="w-3.5 h-3.5 text-[#0F766E]" /> Executive Transport Fleet
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Our Luxury Vehicle Fleet
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            From sleek hybrid sedans for coastal highways to commanding 4x4 Land Cruisers for hill country mountain passes, choose your ultimate ride.
          </p>
        </div>

        {/* Category Filter Tabs */}
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
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fleet Grid / Mobile Limit 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle, idx) => {
              const isHiddenOnMobile = !showAllMobile && idx >= 3;
              const isWishlisted = wishlistIds.includes(vehicle.id);
              const isCompared = selectedCompareIds.includes(vehicle.id);

              return (
                <motion.div
                  key={vehicle.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D4AF37]/60 transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                    isHiddenOnMobile ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  <div>
                    {/* Vehicle Image Container */}
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-gray-950">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />

                      {/* Category Tag */}
                      <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-[#0F766E] to-[#022C22] text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full shadow-lg">
                        {vehicle.category}
                      </span>

                      {/* Top Right Action Icons */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        {/* Compare Button */}
                        <button
                          onClick={() => onToggleCompare(vehicle.id)}
                          className={`p-2 rounded-full border text-xs font-bold transition-all ${
                            isCompared
                              ? 'bg-[#D4AF37] text-gray-950 border-white shadow-lg'
                              : 'bg-black/60 text-white border-white/20 hover:bg-black'
                          }`}
                          title="Compare Vehicle"
                        >
                          <Layers className="w-3.5 h-3.5" />
                        </button>

                        {/* Wishlist Button */}
                        <button
                          onClick={() =>
                            onToggleWishlist({
                              id: vehicle.id,
                              type: 'vehicle',
                              title: vehicle.name,
                              image: vehicle.image,
                              priceUsd: vehicle.pricingPerDayUsd,
                              subtitle: vehicle.category,
                            })
                          }
                          className="p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/20 transition-transform hover:scale-110"
                          title="Save to Wishlist"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                        </button>
                      </div>

                      {/* Vehicle Name Over Image */}
                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight drop-shadow-md">
                          {vehicle.name}
                        </h3>
                        <p className="text-xs text-gray-300 line-clamp-1">{vehicle.description}</p>
                      </div>
                    </div>

                    {/* Specs Row */}
                    <div className="p-5 sm:p-6">
                      <div className="grid grid-cols-4 gap-1.5 bg-[#FAFAF9] p-2.5 rounded-2xl border border-gray-100 text-center mb-4">
                        <div className="flex flex-col items-center">
                          <Users className="w-3.5 h-3.5 text-[#0F766E] mb-1" />
                          <span className="text-[10px] font-bold text-gray-900">{vehicle.passengerCapacity} Pass</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Luggage className="w-3.5 h-3.5 text-[#0F766E] mb-1" />
                          <span className="text-[10px] font-bold text-gray-900">{vehicle.luggageCapacity} Bags</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Wind className="w-3.5 h-3.5 text-[#0F766E] mb-1" />
                          <span className="text-[10px] font-bold text-emerald-700">AC</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <Wifi className="w-3.5 h-3.5 text-[#0F766E] mb-1" />
                          <span className="text-[10px] font-bold text-emerald-700">{vehicle.wifi ? '5G WiFi' : 'N/A'}</span>
                        </div>
                      </div>

                      {/* Features Bullet List */}
                      <ul className="space-y-1.5 mb-4">
                        {vehicle.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-center text-xs text-gray-600 gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer Price & Action */}
                  <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Rate Starts</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                          {formatPrice(vehicle.pricingPerDayUsd)}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">/ day</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetailVehicle(vehicle)}
                        className="px-2.5 py-2 text-xs font-bold text-gray-700 hover:text-[#0F766E] underline cursor-pointer"
                      >
                        Specs
                      </button>
                      <button
                        onClick={() => onOpenBooking({ vehicleId: vehicle.id })}
                        className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:brightness-110 text-gray-950 font-bold text-xs uppercase px-4 py-2.5 rounded-full shadow-md flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                      >
                        <span>Book</span>
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
        {filteredVehicles.length > 3 && (
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="inline-flex items-center gap-2 bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg border border-[#D4AF37]/50"
            >
              <span>{showAllMobile ? 'Show Less Vehicles' : `View All Vehicles (+${filteredVehicles.length - 3} More)`}</span>
              {showAllMobile ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-[#D4AF37]" />}
            </button>
          </div>
        )}
      </div>

      {/* Vehicle Detail Popup Modal */}
      <AnimatePresence>
        {detailVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setDetailVehicle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl overflow-hidden relative border border-gray-200 max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-44 -mx-6 -mt-6 mb-4 bg-gray-900">
                <img src={detailVehicle.image} alt={detailVehicle.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => setDetailVehicle(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-xl font-serif font-bold text-gray-900">{detailVehicle.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{detailVehicle.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3.5 rounded-xl">
                <div><strong>Category:</strong> {detailVehicle.category}</div>
                <div><strong>Transmission:</strong> {detailVehicle.transmission}</div>
                <div><strong>Fuel Type:</strong> {detailVehicle.fuelType}</div>
                <div><strong>Chauffeur:</strong> Included & Licensed</div>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full VIP Features</h4>
                <ul className="grid grid-cols-2 gap-1.5 text-xs text-gray-700">
                  {detailVehicle.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">Pricing Rate</span>
                  <span className="text-xl font-bold font-serif">{formatPrice(detailVehicle.pricingPerDayUsd)} / day</span>
                </div>

                <button
                  onClick={() => {
                    const vId = detailVehicle.id;
                    setDetailVehicle(null);
                    onOpenBooking({ vehicleId: vId });
                  }}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase px-6 py-3 rounded-full shadow-lg"
                >
                  Reserve Vehicle
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
