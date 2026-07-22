'use client';

import { motion } from 'framer-motion';
import { Plane, Compass, Building2, Heart, Award, ShieldCheck, ArrowRight, Car, Clock } from 'lucide-react';
import { SERVICES } from '../../data/servicesData';

interface OurServicesProps {
  onOpenBooking: (options?: { tourId?: string; vehicleId?: string }) => void;
}

export default function OurServices({ onOpenBooking }: OurServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane': return Plane;
      case 'Compass': return Compass;
      case 'Building2': return Building2;
      case 'Heart': return Heart;
      case 'Award': return Award;
      case 'ShieldCheck': return ShieldCheck;
      default: return Car;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-tropical-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-widest mb-3">
            <Car className="w-3.5 h-3.5 text-[#0F766E]" /> Premier Transport Services
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Tailored Transport & Tour Solutions
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Whether arriving on an international flight or embarking on an island-wide round tour, experience world-class VIP luxury.
          </p>
        </motion.div>

        {/* Services Grid with Viewport Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = getIcon(srv.iconName);
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 45, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: (idx % 3) * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group p-8 rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#022C22] text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-[#0F766E] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {srv.shortDesc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {srv.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0F766E]" /> 24/7 VIP Service
                  </span>

                  <button
                    onClick={() => onOpenBooking()}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:brightness-110 text-gray-950 font-bold text-xs uppercase px-4 py-2.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-950" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
