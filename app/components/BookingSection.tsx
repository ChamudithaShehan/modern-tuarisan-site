'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOUR_PACKAGES } from '../../data/toursData';
import { FLEET_VEHICLES } from '../../data/fleetData';
import { Currency, CurrencyRate } from '../../types';

interface BookingSectionProps {
  currency: Currency;
  currencyRates: Record<Currency, CurrencyRate>;
}

export default function BookingSection({ currency, currencyRates }: BookingSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    email: '',
    phone: '',
    pickupLocation: 'Bandaranaike International Airport (CMB)',
    tourPackage: 'custom',
    vehicleType: 'toyota-land-cruiser-prado',
    travelDate: '',
    noOfTravelers: 2,
    specialRequests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#0F766E', '#0EA5A4', '#D4AF37', '#F59E0B'],
    });
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

  return (
    <section id="booking" className="py-24 bg-[#022C22] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-dark-emerald-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0EA5A4]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Instant Reservation
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Book Your Private Vehicle & Tour
          </h2>
          <p className="mt-3 text-base text-gray-300">
            No pre-payment required. Lock in your private chauffeur and luxury vehicle in under 60 seconds.
          </p>
        </div>

        {/* Modern Glass Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-dark p-6 sm:p-10 rounded-3xl border border-[#D4AF37]/40 shadow-2xl backdrop-blur-2xl"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Germany / Australia"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

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
                    placeholder="john@domain.com"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="BIA Airport / Colombo Hotel"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

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
                        #{pkg.packageNumber} {pkg.title}
                      </option>
                    ))}
                  </select>
                </div>

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
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    No. of Travelers
                  </label>
                  <select
                    name="noOfTravelers"
                    value={formData.noOfTravelers}
                    onChange={handleChange}
                    className="w-full bg-[#043C30] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="1">1 Traveler</option>
                    <option value="2">2 Travelers (Couple)</option>
                    <option value="4">3-4 Family</option>
                    <option value="8">5-8 Small Group</option>
                    <option value="15">9+ Large Delegation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Special Requests / Luggage Notes
                </label>
                <textarea
                  rows={2}
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Need child car seat, extra luggage space, or English speaking chauffeur guide..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Price Estimate Row */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Estimated All-Inclusive Quote</span>
                  <span className="text-3xl font-serif font-extrabold gold-text-gradient">
                    {formatPrice(calculateEstimateUsd())}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Includes Fuel, Tolls & Driver Expenses</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 text-gray-950 font-bold text-sm uppercase tracking-wider py-4 rounded-full shadow-2xl flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Car className="w-5 h-5 text-gray-950" />
                <span>Submit Reservation Request</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-10 flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 text-[#D4AF37] mb-4 animate-bounce" />
              <h3 className="text-3xl font-serif font-bold text-white mb-2">Reservation Received!</h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto mb-6">
                Our concierge team is reviewing your travel itinerary and will send your WhatsApp voucher shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#D4AF37] text-gray-950 font-bold text-xs uppercase px-6 py-2.5 rounded-full"
              >
                Book Another Trip
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
