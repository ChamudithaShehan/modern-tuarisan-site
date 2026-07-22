'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Compass, Car, Calendar, MapPin, Users, ArrowRight, ShieldCheck, Film, Sparkles } from 'lucide-react';
import { FLEET_VEHICLES } from '../../data/fleetData';

interface HeroProps {
  onOpenBooking: (options?: { tourId?: string; vehicleId?: string }) => void;
  onOpenVideo: () => void;
}

const HIGHLIGHT_BADGES = [
  'Luxury Fleet',
  'Sri Lankan Mountains',
  'Tea Plantations',
  'Golden Beaches',
  'Sigiriya Fortress',
  'Nine Arch Bridge',
  'Wild Elephants',
  'Tropical Rainforests',
];

export default function Hero({ onOpenBooking, onOpenVideo }: HeroProps) {
  const [quickPickup, setQuickPickup] = useState('Colombo Airport (CMB)');
  const [quickVehicle, setQuickVehicle] = useState('toyota-land-cruiser-prado');
  const [quickDate, setQuickDate] = useState('');
  const [quickTravelers, setQuickTravelers] = useState('2');

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking({ vehicleId: quickVehicle });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0B0F17] text-white pt-24 pb-12">
      {/* Real HTML5 Video Background Loop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=90"
          className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-and-the-sea-41538-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ultra-Luxury Obsidian Black & Gold Vignette Overlays (NO GREEN) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/95 via-[#0B0F17]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-[#0B0F17]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(11,15,23,0.85)_100%)]" />

        {/* Live HD Video Playing Badge */}
        <div className="absolute top-28 right-6 z-20 hidden md:flex items-center gap-2.5 bg-black/70 backdrop-blur-xl border border-[#D4AF37]/30 px-4 py-2 rounded-full text-xs font-semibold shadow-2xl">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <Film className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-gray-200">Live 4K Video Background</span>
        </div>
      </div>

      {/* Floating Animated Light Beams & Golden Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Golden Sunset Overlay Glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse-glow" />

        {/* Floating Sparkles Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, opacity: 0.2 }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            className="absolute w-2 h-2 rounded-full bg-[#D4AF37] blur-[1px]"
            style={{
              top: `${20 + i * 9}%`,
              left: `${15 + (i * 11) % 70}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl">
          {/* VIP Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 px-4 py-1.5 rounded-full text-xs font-semibold text-[#D4AF37] mb-6 shadow-xl"
          >
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>Sri Lanka’s #1 Private Chauffeur & Tour Specialist</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl"
          >
            Discover the <br />
            <span className="gold-text-gradient italic">Soul of Sri Lanka</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-base sm:text-xl text-gray-200 font-normal leading-relaxed max-w-2xl text-shadow"
          >
            Private Chauffeur Tours & Personalized Travel Experiences Across Paradise Island. Luxury Vehicles • Dedicated Driver-Guides • 100% Custom Routes.
          </motion.p>

          {/* CTA Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            {/* Button 1: Explore Tours */}
            <a
              href="#tours"
              className="group flex items-center gap-2 bg-gradient-to-r from-amber-600 to-[#F59E0B] text-gray-950 font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-full shadow-2xl hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300 border border-amber-400/30"
            >
              <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              <span>Explore Tours</span>
            </a>

            {/* Button 2: Book Vehicle */}
            <button
              onClick={() => onOpenBooking()}
              className="group flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-gray-950 font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-full shadow-2xl hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Car className="w-5 h-5 text-gray-950" />
              <span>Book Vehicle</span>
            </button>

            {/* Button 3: Watch Video */}
            <button
              onClick={onOpenVideo}
              className="group flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/30 text-white font-semibold text-sm px-6 py-4 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-gray-950 group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-gray-950 translate-x-[1px]" />
              </span>
              <span>Watch Full Reel</span>
            </button>
          </motion.div>

          {/* Highlights Pills Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-2 items-center"
          >
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mr-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Highlights:
            </span>
            {HIGHLIGHT_BADGES.map((badge, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-gray-200 hover:border-[#D4AF37]/50 hover:text-white transition-colors"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Quick Search Glass Booking Bar (NO GREEN) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-[#0F141C]/90 p-4 md:p-6 rounded-3xl shadow-2xl border border-[#D4AF37]/40 backdrop-blur-2xl"
        >
          <form onSubmit={handleQuickSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Pickup Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> Pickup Point
              </label>
              <select
                value={quickPickup}
                onChange={(e) => setQuickPickup(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="Colombo Airport (CMB)" className="text-gray-900">Colombo Airport (CMB)</option>
                <option value="Colombo Hotel" className="text-gray-900">Colombo City Hotel</option>
                <option value="Negombo Beach" className="text-gray-900">Negombo Beach</option>
                <option value="Kandy City" className="text-gray-900">Kandy City</option>
                <option value="Galle / Mirissa" className="text-gray-900">Galle / Mirissa</option>
              </select>
            </div>

            {/* Vehicle Selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                <Car className="w-3.5 h-3.5" /> Vehicle Type
              </label>
              <select
                value={quickVehicle}
                onChange={(e) => setQuickVehicle(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                {FLEET_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id} className="text-gray-900">
                    {v.name} (${v.pricingPerDayUsd}/day)
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Travel Date
              </label>
              <input
                type="date"
                value={quickDate}
                onChange={(e) => setQuickDate(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Travelers Count */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Passengers
              </label>
              <select
                value={quickTravelers}
                onChange={(e) => setQuickTravelers(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="1" className="text-gray-900">1 Solo Traveler</option>
                <option value="2" className="text-gray-900">2 Couple</option>
                <option value="4" className="text-gray-900">3-4 Family</option>
                <option value="8" className="text-gray-900">5-8 Small Group</option>
                <option value="15" className="text-gray-900">9+ Large Group</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 text-gray-950 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <span>Instant Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Ocean Wave Animated SVG Divider */}
      <div className="relative w-full overflow-hidden leading-none z-10 mt-6">
        <svg
          className="relative block w-full h-12 text-[#FAFAF9]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
