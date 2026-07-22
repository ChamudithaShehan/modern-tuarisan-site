'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, X, Sparkles } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    id: 'g-1',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85',
    title: 'Bentota Ocean Waves & Palm Fringed Beaches',
    category: 'Coastline',
  },
  {
    id: 'g-2',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    title: 'Nine Arch Bridge Train Passage',
    category: 'Heritage',
  },
  {
    id: 'g-3',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85',
    title: 'Majestic Leopard Resting in Yala Jungle',
    category: 'Wildlife',
  },
  {
    id: 'g-4',
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
    title: 'Toyota Prado 4x4 Highway Cruising',
    category: 'Fleet',
  },
  {
    id: 'g-5',
    url: 'https://images.unsplash.com/photo-1546853020-ca2a080d7237?auto=format&fit=crop&w=1200&q=85',
    title: 'Misty Tea Plantation Terraces in Nuwara Eliya',
    category: 'Nature',
  },
  {
    id: 'g-6',
    url: 'https://images.unsplash.com/photo-1602643163983-ed0bafd39797?auto=format&fit=crop&w=1200&q=85',
    title: 'Golden Sunset at Sigiriya Lion Rock',
    category: 'Heritage',
  },
  {
    id: 'g-7',
    url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=85',
    title: 'Historic Galle Fort Colonial Ramparts',
    category: 'Heritage',
  },
  {
    id: 'g-8',
    url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=85',
    title: 'Herds of Wild Tuskers at Udawalawe Reservoir',
    category: 'Wildlife',
  },
];

const CATEGORIES = ['All', 'Coastline', 'Heritage', 'Wildlife', 'Nature', 'Fleet'];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  const filtered = activeTab === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeTab);

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" /> Instagram Style Visual Feed
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Captivating Island Gallery
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            A glimpse into the stunning landscapes, wildlife encounters, and luxury vehicles experienced by our guests.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-[#0F766E] to-[#022C22] text-[#D4AF37] shadow-lg scale-105 border border-[#D4AF37]/40'
                  : 'bg-[#FAFAF9] text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Instagram Grid Layout: 2 Columns on Mobile, 3-4 on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveLightbox(item)}
                className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200/60"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white" />

                <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded-full border border-[#D4AF37]/30 backdrop-blur-md mb-1 inline-block">
                    {item.category}
                  </span>
                  <h3 className="text-xs font-serif font-bold text-white leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-md">
                  <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Popup Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={() => setActiveLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2.5 hover:bg-black cursor-pointer z-20"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <img src={activeLightbox.url} alt={activeLightbox.title} className="w-full max-h-[75vh] object-contain bg-black" />

              <div className="p-4 sm:p-6 bg-[#022C22] text-white flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest">{activeLightbox.category}</span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold">{activeLightbox.title}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
