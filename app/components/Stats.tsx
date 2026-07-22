'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, MapPin, Compass, Car, Award, Star } from 'lucide-react';

interface StatItemProps {
  icon: any;
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
  delay: number;
}

function StatCard({ icon: Icon, target, suffix, label, sublabel, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="relative group p-6 sm:p-8 rounded-3xl bg-white border border-[#0F766E]/10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden"
    >
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#0EA5A4]/10 to-[#D4AF37]/10 rounded-bl-full group-hover:scale-110 transition-transform" />

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#022C22] text-[#D4AF37] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#0F766E] font-bold">
          Verified Metric
        </span>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-4xl sm:text-5xl font-serif font-extrabold text-gray-900 tracking-tight">
          {count.toLocaleString()}
        </span>
        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#D4AF37]">{suffix}</span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mt-2 font-serif">{label}</h3>
      <p className="text-xs text-gray-500 mt-1 font-medium">{sublabel}</p>
    </motion.div>
  );
}

export default function Stats() {
  const STATS_DATA = [
    {
      icon: Users,
      target: 1000,
      suffix: '+',
      label: 'Happy Travelers',
      sublabel: 'Foreign tourists, couples & families from over 45 countries.',
      delay: 0.1,
    },
    {
      icon: Compass,
      target: 50,
      suffix: '+',
      label: 'Tour Packages',
      sublabel: 'Customizable day tours & multi-day round island journeys.',
      delay: 0.2,
    },
    {
      icon: MapPin,
      target: 100,
      suffix: '+',
      label: 'Destinations',
      sublabel: 'UNESCO heritage sites, tea estates & pristine beaches.',
      delay: 0.3,
    },
    {
      icon: Car,
      target: 10,
      suffix: '+',
      label: 'Luxury Vehicles',
      sublabel: 'Air-conditioned sedans, SUVs, VIP Mercedes & vans.',
      delay: 0.4,
    },
  ];

  return (
    <section className="py-20 bg-[#FAFAF9] relative overflow-hidden">
      {/* Subtle Tropical Watermark */}
      <div className="absolute inset-0 bg-tropical-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" /> Proven Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
            Excellence Measured in Unforgettable Memories
          </h2>
          <p className="mt-3 text-sm text-gray-600">
            Over a decade of providing private vehicle hire and curated chauffeur experiences across Paradise Island.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
