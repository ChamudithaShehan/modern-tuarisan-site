'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sun, Compass, ArrowRight, Sparkles, Calendar, Navigation, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { DESTINATIONS } from '../../data/destinationsData';
import { Destination } from '../../types';

interface InteractiveMapProps {
  onOpenBooking: (options?: { tourId?: string; vehicleId?: string }) => void;
}

const ISLAND_REGIONS = [
  {
    id: 'cultural-triangle',
    name: 'Cultural Triangle & Heritage',
    tagline: 'Ancient Kings, Fortress Rocks & Cave mural temples',
    destinations: ['sigiriya', 'anuradhapura', 'polonnaruwa'],
    icon: Sparkles,
  },
  {
    id: 'hill-country',
    name: 'Central Tea Country',
    tagline: 'Misty mountain peaks, waterfalls & Ceylon tea estates',
    destinations: ['nuwara-eliya', 'ella', 'kandy', 'horton-plains', 'adams-peak'],
    icon: Compass,
  },
  {
    id: 'southern-coast',
    name: 'Southern Golden Coast',
    tagline: 'Colonial forts, secret beaches & whale watching ocean safaris',
    destinations: ['galle', 'mirissa'],
    icon: MapPin,
  },
  {
    id: 'wildlife-reserves',
    name: 'Wild Safari Reserves',
    tagline: 'World-famous leopard tracking & wild elephant gatherings',
    destinations: ['yala'],
    icon: Navigation,
  },
  {
    id: 'east-north',
    name: 'East & North Paradise',
    tagline: 'Turquoise ocean bays, coral snorkeling & Tamil heritage Kovils',
    destinations: ['trincomalee', 'arugam-bay', 'jaffna'],
    icon: Sun,
  },
];

export default function InteractiveMap({ onOpenBooking }: InteractiveMapProps) {
  const [selectedRegionId, setSelectedRegionId] = useState('cultural-triangle');
  const [selectedDest, setSelectedDest] = useState<Destination>(DESTINATIONS[0]);

  const activeRegion = ISLAND_REGIONS.find((r) => r.id === selectedRegionId) || ISLAND_REGIONS[0];

  // Get destinations matching active region
  const regionDestinations = DESTINATIONS.filter((d) => activeRegion.destinations.includes(d.id));

  return (
    <section className="py-24 bg-[#022C22] text-white relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-dark-emerald-pattern opacity-70 pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-[#0EA5A4]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">
            <Compass className="w-3.5 h-3.5" /> Interactive Island Route Explorer
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Sri Lanka Travel Regions & Routes
          </h2>
          <p className="mt-4 text-base text-gray-300">
            Select a region to explore key destinations, highway drive times from BIA Colombo Airport, live weather previews, and curated tour highlights.
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {ISLAND_REGIONS.map((reg) => {
            const Icon = reg.icon;
            const isSelected = selectedRegionId === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => {
                  setSelectedRegionId(reg.id);
                  const firstDest = DESTINATIONS.find((d) => reg.destinations.includes(d.id));
                  if (firstDest) setSelectedDest(firstDest);
                }}
                className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-gray-950 border-white shadow-xl scale-105'
                    : 'bg-white/10 text-gray-200 border-white/15 hover:bg-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-gray-950' : 'text-[#D4AF37]'}`} />
                <span>{reg.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Destination Nodes in Active Region */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/15 backdrop-blur-xl">
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                  Active Region Hub
                </span>
                <h3 className="text-xl font-serif font-bold text-white mb-1">{activeRegion.name}</h3>
                <p className="text-xs text-gray-300 italic">{activeRegion.tagline}</p>
              </div>

              <div className="space-y-3">
                {regionDestinations.map((dest) => {
                  const isSelected = selectedDest.id === dest.id;
                  return (
                    <motion.div
                      key={dest.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDest(dest)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#0F766E] to-[#022C22] border-[#D4AF37] shadow-xl text-white'
                          : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={dest.image} alt={dest.name} className="w-12 h-12 rounded-xl object-cover border border-white/20" />
                        <div>
                          <h4 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
                            <span>{dest.name}</span>
                            {dest.isTopDestination && (
                              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                            )}
                          </h4>
                          <span className="text-[11px] text-[#0EA5A4] font-medium">{dest.area}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-400/30 flex items-center gap-1">
                          <Sun className="w-3 h-3 text-amber-400" /> {dest.weather.tempC}°C
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Chauffeur Guarantee Banner */}
            <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
              <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <span>
                All inter-region chauffeur drives include express expressway tolls, refreshment stops, and 100% insured vehicle safety.
              </span>
            </div>
          </div>

          {/* Right Column: Selected Destination Spotlight Glass Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-card-dark p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/50 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between"
              >
                <div>
                  {/* Spotlight Image Banner */}
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-white/15 shadow-xl">
                    <img src={selectedDest.image} alt={selectedDest.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                        {selectedDest.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-6 right-6">
                      <span className="text-xs text-[#0EA5A4] font-semibold block mb-1">📍 {selectedDest.area}</span>
                      <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                        {selectedDest.name}
                      </h3>
                      <p className="text-xs text-gray-300 italic line-clamp-1 mt-1">{selectedDest.tagline}</p>
                    </div>
                  </div>

                  {/* Distance & Weather Specs Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs mb-6">
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block">Live Weather Status</span>
                        <span className="font-bold text-white">{selectedDest.weather.tempC}°C • {selectedPinCondition(selectedDest.weather.condition)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#0EA5A4] flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block">Best Season</span>
                        <span className="font-bold text-white">{selectedDest.weather.bestMonths}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                      <Calendar className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-gray-400 block">Recommended Stay</span>
                        <span className="font-bold text-white">{selectedDest.recommendedDays} Days</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-3">
                      Spotlight Destination Highlights
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {selectedDest.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 text-gray-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Private Chauffeur Transfer</span>
                    <span className="text-sm font-bold text-white">Direct Pickup from BIA Airport or Hotel</span>
                  </div>

                  <button
                    onClick={() => onOpenBooking()}
                    className="bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:brightness-110 text-gray-950 font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <span>Book Private Vehicle</span>
                    <ArrowRight className="w-4 h-4 text-gray-950" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function selectedPinCondition(condition: string) {
  return condition || 'Sunny';
}
