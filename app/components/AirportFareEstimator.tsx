'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlaneTakeoff, MapPin, Car, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { FLEET_VEHICLES } from '../../data/fleetData';
import { Currency, CurrencyRate } from '../../types';

interface AirportFareEstimatorProps {
  onOpenBooking: (options?: { vehicleId?: string }) => void;
  currency: Currency;
  currencyRates: Record<Currency, CurrencyRate>;
}

const DESTINATION_ROUTES = [
  { id: 'colombo-city', name: 'Colombo City Center / Fort', distanceKm: 35, estHours: 0.8 },
  { id: 'negombo-beach', name: 'Negombo Beach Coast', distanceKm: 12, estHours: 0.3 },
  { id: 'kandy-hill', name: 'Kandy Sacred City', distanceKm: 115, estHours: 3.0 },
  { id: 'galle-fort', name: 'Galle Dutch Fort', distanceKm: 155, estHours: 2.2 },
  { id: 'mirissa-beach', name: 'Mirissa Coastal Resort', distanceKm: 180, estHours: 2.5 },
  { id: 'nuwara-eliya', name: 'Nuwara Eliya Tea Estates', distanceKm: 165, estHours: 4.5 },
  { id: 'sigiriya-citadel', name: 'Sigiriya Lion Rock', distanceKm: 150, estHours: 3.5 },
  { id: 'yala-safari', name: 'Yala National Park', distanceKm: 290, estHours: 4.8 },
  { id: 'trincomalee-bay', name: 'Trincomalee / Nilaveli', distanceKm: 240, estHours: 4.2 },
  { id: 'arugam-bay', name: 'Arugam Bay Surfing', distanceKm: 320, estHours: 6.0 },
];

export default function AirportFareEstimator({ onOpenBooking, currency, currencyRates }: AirportFareEstimatorProps) {
  const [selectedRouteId, setSelectedRouteId] = useState(DESTINATION_ROUTES[0].id);
  const [selectedVehicleId, setSelectedVehicleId] = useState(FLEET_VEHICLES[0].id);

  const route = DESTINATION_ROUTES.find((r) => r.id === selectedRouteId) || DESTINATION_ROUTES[0];
  const vehicle = FLEET_VEHICLES.find((v) => v.id === selectedVehicleId) || FLEET_VEHICLES[0];

  // Estimate calculation formula based on km & vehicle category
  const calculateFareUsd = () => {
    let ratePerKm = 0.85;
    if (vehicle.category === 'SUV') ratePerKm = 1.25;
    if (vehicle.category === 'Luxury VIP') ratePerKm = 2.10;
    if (vehicle.category === 'Van') ratePerKm = 1.45;
    if (vehicle.category === 'Mini Coach') ratePerKm = 2.40;

    const baseFare = 20; // Airport greeting & toll fee base
    return Math.round(baseFare + route.distanceKm * ratePerKm);
  };

  const formatPrice = (priceUsd: number) => {
    const rateObj = currencyRates[currency] || { rate: 1, symbol: '$' };
    const converted = Math.round(priceUsd * rateObj.rate);
    return `${rateObj.symbol}${converted}`;
  };

  return (
    <section className="py-24 bg-[#022C22] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-dark-emerald-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#0EA5A4]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            <PlaneTakeoff className="w-3.5 h-3.5" /> BIA Airport Transfer Concierge
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Airport Transfer Fare Calculator
          </h2>
          <p className="mt-4 text-base text-gray-300">
            Calculate instant fixed pricing from Bandaranaike International Airport (CMB) to any hotel or villa across Paradise Island.
          </p>
        </div>

        <div className="glass-card-dark p-6 sm:p-10 rounded-3xl border border-[#D4AF37]/40 shadow-2xl max-w-4xl mx-auto backdrop-blur-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Inputs */}
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-2 flex items-center gap-1">
                  <PlaneTakeoff className="w-3.5 h-3.5" /> Pickup Point
                </label>
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs font-bold text-white flex items-center justify-between">
                  <span>Bandaranaike International Airport (CMB)</span>
                  <span className="text-emerald-400 text-[10px] bg-emerald-950 px-2 py-0.5 rounded">Terminal Paging</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Drop-off Destination
                </label>
                <select
                  value={selectedRouteId}
                  onChange={(e) => setSelectedRouteId(e.target.value)}
                  className="w-full bg-[#043C30] border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  {DESTINATION_ROUTES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.distanceKm} km)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-2 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5" /> Vehicle Type
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-[#043C30] border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  {FLEET_VEHICLES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.passengerCapacity} Passengers)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Estimated Distance</span>
                  <span className="text-lg font-bold text-white flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#0EA5A4]" /> {route.distanceKm} km
                  </span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Estimated Travel Time</span>
                  <span className="text-lg font-bold text-white flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#F59E0B]" /> ~{route.estHours} Hours
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] uppercase font-bold text-gray-400 block">Total Fixed Transfer Rate</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-extrabold gold-text-gradient">
                    {formatPrice(calculateFareUsd())}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold"> (All Expressway Tolls Included)</span>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking({ vehicleId: vehicle.id })}
                className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-gray-950 font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-2xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
              >
                <span>Book This Transfer</span>
                <ArrowRight className="w-4 h-4 text-gray-950" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
