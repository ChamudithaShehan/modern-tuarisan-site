'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Car, Clock, Sparkles, MapPin, Compass, PhoneCall, Award } from 'lucide-react';

const FEATURES = [
  {
    icon: Car,
    title: 'Modern Luxury Fleet',
    description: 'Sedans, 4x4 SUVs, VIP Hybrids, and spacious Luxury Vans maintained to premier international standards.',
  },
  {
    icon: ShieldCheck,
    title: 'Licensed Chauffeur Guides',
    description: 'English-speaking, Sri Lanka Tourism Development Authority (SLTDA) registered professional driver-guides.',
  },
  {
    icon: Clock,
    title: '24/7 Airport Pickup',
    description: 'Punctual BIA Colombo Airport transfers with live flight tracking and complimentary refreshing welcome drinks.',
  },
  {
    icon: Compass,
    title: 'Custom Island Itineraries',
    description: '100% tailor-made private tours designed around your budget, timeline, and travel preferences.',
  },
  {
    icon: Sparkles,
    title: 'Zero Hidden Charges',
    description: 'Transparent pricing inclusive of express highway tolls, fuel, parking, driver lodging, and meals.',
  },
  {
    icon: Award,
    title: 'VIP Concierge Service',
    description: 'Dedicated travel manager available 24/7 on WhatsApp & Phone throughout your entire journey.',
  },
  {
    icon: MapPin,
    title: 'Island-Wide Coverage',
    description: 'From Sigiriya & Kandy to Ella, Yala Safaris, Mirissa Beaches, and Jaffna Tamil heritage sites.',
  },
  {
    icon: PhoneCall,
    title: 'Instant Booking Guarantee',
    description: 'Secure your private vehicle or tour package within 60 seconds with instant booking confirmations.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Graphic Patterns */}
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
            <Award className="w-3.5 h-3.5 text-[#0F766E]" /> Why Choose Ceylon Ride Tours
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            The Pinnacle of Sri Lankan Hospitality
          </h2>
          <p className="mt-4 text-base text-gray-600">
            We combine luxury private transport with authentic local expertise to create unforgettably seamless travel experiences.
          </p>
        </motion.div>

        {/* Feature Cards Grid with Staggered Scroll Reveal Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 45, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group p-6 rounded-3xl bg-[#FAFAF9] border border-gray-200/80 hover:border-[#D4AF37] hover:bg-gradient-to-b hover:from-white hover:to-[#FAFAF9] hover:shadow-2xl transition-all duration-500 relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#022C22] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#D4AF37]" />
                  </div>

                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 group-hover:text-[#0F766E] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
