'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Calendar, MapPin, Users, Mail, Phone, Globe, Sparkles, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOUR_PACKAGES } from '../../data/toursData';
import { FLEET_VEHICLES } from '../../data/fleetData';
import { BookingFormData, Currency, CurrencyRate } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTourId?: string;
  initialVehicleId?: string;
  currency: Currency;
  currencyRates: Record<Currency, CurrencyRate>;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialTourId,
  initialVehicleId,
  currency,
  currencyRates,
}: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    country: '',
    email: '',
    phone: '',
    pickupLocation: 'Bandaranaike International Airport (CMB)',
    tourPackage: initialTourId || 'custom',
    vehicleType: initialVehicleId || 'toyota-land-cruiser-prado',
    travelDate: '',
    noOfTravelers: 2,
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialTourId) {
      setFormData((prev) => ({ ...prev, tourPackage: initialTourId }));
    }
    if (initialVehicleId) {
      setFormData((prev) => ({ ...prev, vehicleType: initialVehicleId }));
    }
  }, [initialTourId, initialVehicleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateEstimateUsd = () => {
    let base = 120;
    const matchedTour = TOUR_PACKAGES.find((t) => t.id === formData.tourPackage);
    if (matchedTour) {
      base = matchedTour.priceUsd * formData.noOfTravelers;
    } else {
      const matchedVeh = FLEET_VEHICLES.find((v) => v.id === formData.vehicleType);
      if (matchedVeh) {
        base = matchedVeh.pricingPerDayUsd * 3;
      }
    }
    return base;
  };

  const formatPrice = (priceUsd: number) => {
    const rateObj = currencyRates[currency] || { rate: 1, symbol: '$' };
    const converted = Math.round(priceUsd * rateObj.rate);
    return `${rateObj.symbol}${converted}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger Confetti Celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0F766E', '#0EA5A4', '#D4AF37', '#F59E0B'],
    });
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-[#022C22] border border-[#D4AF37]/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl my-8 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0EA5A4]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Direct Private Booking
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Reserve Your Chauffeur & Tour
                </h2>
                <p className="text-xs text-gray-300 mt-1">
                  Fill in your travel preferences below. All vehicle hire rates include fuel, toll fees, driver meals & lodging.
                </p>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="United Kingdom / Australia"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 7123 456789"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="CMB Airport / Colombo Hotel / Villa"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                      Travel Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Tour Package Selection */}
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                      Tour Package
                    </label>
                    <select
                      name="tourPackage"
                      value={formData.tourPackage}
                      onChange={handleChange}
                      className="w-full bg-[#043C30] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="custom">Custom Tailored Route</option>
                      {TOUR_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          #{pkg.packageNumber} {pkg.title} ({pkg.durationDays} Days)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Vehicle Type Selection */}
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                      Vehicle Type
                    </label>
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full bg-[#043C30] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                    >
                      {FLEET_VEHICLES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Travelers Count Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#D4AF37] uppercase tracking-wider">Number of Travelers</span>
                    <span className="font-bold text-white bg-white/10 px-3 py-0.5 rounded-full">{formData.noOfTravelers} Passengers</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    name="noOfTravelers"
                    value={formData.noOfTravelers}
                    onChange={handleChange}
                    className="w-full accent-[#D4AF37] cursor-pointer"
                  />
                </div>

                {/* Special Requests */}
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Special Requests / Child Seats / Flight No.
                  </label>
                  <textarea
                    rows={2}
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="E.g. We require a infant child seat and surfboard roof rack."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Real-time Estimate Banner */}
                <div className="bg-white/5 p-4 rounded-2xl border border-[#D4AF37]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Estimated All-Inclusive Quote</span>
                    <span className="text-2xl font-serif font-bold gold-text-gradient">
                      {formatPrice(calculateEstimateUsd())}
                    </span>
                    <span className="text-[10px] text-gray-400 block"> (Includes Vehicle, Chauffeur & Tolls)</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
                    ✓ Zero Prepayment Required
                  </span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 text-gray-950 font-bold text-sm uppercase tracking-wider py-4 rounded-full shadow-2xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Car className="w-5 h-5 text-gray-950" />
                  <span>Confirm Reservation Request</span>
                </button>
              </form>
            </>
          ) : (
            /* Confirmation Screen */
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0F766E] to-[#022C22] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-6 shadow-2xl">
                <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
              </div>

              <span className="text-xs uppercase font-extrabold tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1 rounded-full border border-[#D4AF37]/40 mb-3">
                Booking Reference #CRT-2026-88
              </span>

              <h2 className="text-3xl font-serif font-bold text-white mb-2">
                Thank You, {formData.name}!
              </h2>

              <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed mb-6">
                Your private vehicle reservation request for <strong className="text-white">{formData.travelDate || 'your travel date'}</strong> has been received! Our tour concierge team will contact you via WhatsApp at <strong className="text-[#D4AF37]">{formData.phone}</strong> within 15 minutes to finalize your chauffeur details.
              </p>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 max-w-md w-full text-xs space-y-2 mb-8 text-left">
                <div className="flex justify-between text-gray-300">
                  <span>Travelers:</span> <strong className="text-white">{formData.noOfTravelers} Passengers</strong>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Pickup Location:</span> <strong className="text-white">{formData.pickupLocation}</strong>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Estimated Total:</span> <strong className="text-[#D4AF37]">{formatPrice(calculateEstimateUsd())}</strong>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-xl cursor-pointer"
              >
                Back to Website
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
