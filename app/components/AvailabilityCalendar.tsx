'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, CheckCircle2, AlertCircle, Clock, ChevronLeft, ChevronRight, Car, Sparkles } from 'lucide-react';
import { FLEET_VEHICLES } from '../../data/fleetData';

interface AvailabilityCalendarProps {
  onOpenBooking: (options?: { vehicleId?: string; tourId?: string }) => void;
}

export default function AvailabilityCalendar({ onOpenBooking }: AvailabilityCalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');
  const [selectedVehicle, setSelectedVehicle] = useState(FLEET_VEHICLES[1].id);
  const [selectedDate, setSelectedDate] = useState<number | null>(15);

  // Generate demo 31 days with availability status
  const daysInMonth = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    // Mock availability logic
    let status: 'available' | 'limited' | 'booked' = 'available';
    if ([4, 11, 18, 25].includes(dayNum)) status = 'booked';
    else if ([7, 14, 21, 28].includes(dayNum)) status = 'limited';
    return { day: dayNum, status };
  });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-widest mb-3">
            <CalendarIcon className="w-3.5 h-3.5" /> Real-time Fleet Status
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Vehicle & Tour Availability Checker
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Check real-time availability for our private chauffeur fleet and tour dates before reserving your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Selector & Legend */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAFAF9] p-6 rounded-3xl border border-gray-200 shadow-sm">
              <label className="text-xs font-bold text-[#0F766E] uppercase tracking-wider block mb-2">
                Select Fleet Vehicle
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs font-semibold text-gray-900 focus:outline-none focus:border-[#0F766E] cursor-pointer"
              >
                {FLEET_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} (${v.pricingPerDayUsd}/day)
                  </option>
                ))}
              </select>

              {/* Status Legend */}
              <div className="mt-6 space-y-3 pt-4 border-t border-gray-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                  Calendar Status Legend
                </span>
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span><strong>Available</strong> (Instant Confirmation)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500 flex-shrink-0" />
                  <span><strong>Limited Slots</strong> (High Season Demand)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-700">
                  <span className="w-3.5 h-3.5 rounded-full bg-gray-300 flex-shrink-0" />
                  <span><strong>Fully Reserved</strong></span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0F766E] to-[#022C22] p-6 rounded-3xl text-white shadow-xl">
              <span className="text-[10px] text-[#D4AF37] font-extrabold uppercase tracking-widest block mb-1">
                Selected Date Notice
              </span>
              <h4 className="text-xl font-serif font-bold mb-2">
                {selectedDate ? `${selectedMonth} ${selectedDate}` : 'Select a Date'}
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Chauffeur driver and vehicle unit are ready for airport or hotel pickup on this date.
              </p>
              <button
                onClick={() => onOpenBooking({ vehicleId: selectedVehicle })}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase py-3 rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Car className="w-4 h-4 text-gray-950" />
                <span>Reserve Selected Date</span>
              </button>
            </div>
          </div>

          {/* Right Calendar Grid */}
          <div className="lg:col-span-7 bg-[#FAFAF9] p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#0F766E]" /> {selectedMonth}
              </h3>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600 cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600 cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((d) => {
                const isSelected = selectedDate === d.day;
                let bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
                if (d.status === 'limited') bgClass = 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100';
                if (d.status === 'booked') bgClass = 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';

                return (
                  <button
                    key={d.day}
                    disabled={d.status === 'booked'}
                    onClick={() => setSelectedDate(d.day)}
                    className={`h-12 rounded-2xl font-bold text-xs flex flex-col items-center justify-center transition-all border cursor-pointer ${bgClass} ${
                      isSelected ? 'ring-2 ring-[#D4AF37] ring-offset-2 scale-105 shadow-md font-extrabold' : ''
                    }`}
                  >
                    <span>{d.day}</span>
                    <span className="text-[9px] font-normal opacity-80">
                      {d.status === 'booked' ? 'Full' : d.status === 'limited' ? '2 Left' : 'Open'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
