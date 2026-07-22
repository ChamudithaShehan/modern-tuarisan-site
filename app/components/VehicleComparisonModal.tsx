'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Luggage, Wind, Wifi, CheckCircle2, Car, Sparkles } from 'lucide-react';
import { FLEET_VEHICLES } from '../../data/fleetData';
import { Currency, CurrencyRate } from '../../types';

interface VehicleComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicleIds: string[];
  onOpenBooking: (options?: { vehicleId?: string }) => void;
  currency: Currency;
  currencyRates: Record<Currency, CurrencyRate>;
}

export default function VehicleComparisonModal({
  isOpen,
  onClose,
  selectedVehicleIds,
  onOpenBooking,
  currency,
  currencyRates,
}: VehicleComparisonModalProps) {
  if (!isOpen) return null;

  const comparedVehicles = FLEET_VEHICLES.filter((v) => selectedVehicleIds.includes(v.id));
  const displayVehicles = comparedVehicles.length > 0 ? comparedVehicles : FLEET_VEHICLES.slice(0, 3);

  const formatPrice = (priceUsd: number) => {
    const rateObj = currencyRates[currency] || { rate: 1, symbol: '$' };
    const converted = Math.round(priceUsd * rateObj.rate);
    return `${rateObj.symbol}${converted}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-[#022C22] border border-[#D4AF37]/50 rounded-3xl max-w-5xl w-full p-6 sm:p-8 text-white shadow-2xl my-8 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
              <Car className="w-3.5 h-3.5" /> Fleet Side-by-Side Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Compare Luxury Fleet Vehicles
            </h2>
            <p className="text-xs text-gray-300 mt-1">
              Analyze seating capacity, luggage limits, terrain compatibility, and daily rates.
            </p>
          </div>

          {/* Comparison Matrix Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayVehicles.map((veh) => (
              <div
                key={veh.id}
                className="bg-white/5 p-5 rounded-2xl border border-white/15 flex flex-col justify-between hover:border-[#D4AF37] transition-all"
              >
                <div>
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-gray-900">
                    <img src={veh.image} alt={veh.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] font-extrabold uppercase bg-black/60 text-[#D4AF37] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                      {veh.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mb-2">{veh.name}</h3>

                  {/* Specs Comparison Table */}
                  <div className="space-y-3 text-xs border-t border-b border-white/10 py-4 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Passenger Capacity:</span>
                      <strong className="text-white flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#0EA5A4]" /> {veh.passengerCapacity} Persons
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Luggage Capacity:</span>
                      <strong className="text-white flex items-center gap-1">
                        <Luggage className="w-3.5 h-3.5 text-[#0EA5A4]" /> {veh.luggageCapacity} Bags
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Air Conditioning:</span>
                      <strong className="text-emerald-400 flex items-center gap-1">
                        <Wind className="w-3.5 h-3.5 text-emerald-400" /> Dual/Quad Climate
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">High-Speed Wi-Fi:</span>
                      <strong className="text-emerald-400 flex items-center gap-1">
                        <Wifi className="w-3.5 h-3.5 text-emerald-400" /> {veh.wifi ? 'Included' : 'N/A'}
                      </strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Transmission:</span>
                      <strong className="text-white">{veh.transmission}</strong>
                    </div>
                  </div>

                  {/* Recommended For */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] block mb-1">Recommended Terrain</span>
                    <div className="flex flex-wrap gap-1">
                      {veh.popularFor.map((p, i) => (
                        <span key={i} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-200">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Daily Rate</span>
                    <span className="text-xl font-serif font-bold gold-text-gradient">
                      {formatPrice(veh.pricingPerDayUsd)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking({ vehicleId: veh.id });
                    }}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase px-4 py-2.5 rounded-full shadow-lg"
                  >
                    Select Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
