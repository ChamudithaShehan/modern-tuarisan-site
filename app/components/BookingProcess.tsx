'use client';

import { motion } from 'framer-motion';
import { Compass, Car, CalendarCheck, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

interface BookingProcessProps {
  onOpenBooking: () => void;
}

const STEPS = [
  {
    step: '01',
    icon: Compass,
    title: 'Choose Package / Route',
    description: 'Select one of our flagship Sri Lankan tour itineraries or specify your custom list of destinations.',
  },
  {
    step: '02',
    icon: Car,
    title: 'Select Vehicle Type',
    description: 'Pick your preferred ride from Hybrid Sedans, 4x4 SUVs, Luxury VIP Mercedes, or HiAce Vans.',
  },
  {
    step: '03',
    icon: CalendarCheck,
    title: 'Choose Travel Date',
    description: 'Select your arrival date at BIA Airport or hotel pickup point across Sri Lanka.',
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Confirm Booking',
    description: 'Receive instant WhatsApp & email confirmation with your dedicated driver details and voucher.',
  },
  {
    step: '05',
    icon: MapPin,
    title: 'Travel Paradise Island',
    description: 'Meet your private chauffeur at the terminal and begin an effortless luxury road adventure!',
  },
];

export default function BookingProcess({ onOpenBooking }: BookingProcessProps) {
  return (
    <section className="py-24 bg-[#FAFAF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-widest mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" /> Effortless 5-Step Workflow
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            How Your Booking Works
          </h2>
          <p className="mt-4 text-base text-gray-600">
            From initial quote to airport reception, experience a seamless white-glove process.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {STEPS.map((s, index) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#022C22] text-[#D4AF37] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-3xl font-extrabold text-gray-300 group-hover:text-[#D4AF37] transition-colors">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-gray-900 mb-2">
                    {s.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-[10px] uppercase font-bold text-[#0F766E]">
                  <span>Step {s.step} Complete</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-gray-950 font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-2xl hover:shadow-amber-500/30 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Start Booking Process Now</span>
            <ArrowRight className="w-4 h-4 text-gray-950" />
          </button>
        </div>
      </div>
    </section>
  );
}
