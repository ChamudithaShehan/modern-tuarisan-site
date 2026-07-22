'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Camera, Maximize2, X, Sparkles, MapPin, Heart, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
  location: string;
  aspectRatio: number; // 4/3, 16/9, 3/4, 1/1
  likes: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'm-1',
    url: 'https://images.unsplash.com/photo-1546853020-ca2a080d7237?auto=format&fit=crop&w=1200&q=85',
    title: 'Misty Tea Plantations & Mountain Valleys',
    category: 'Highlands',
    location: 'Nuwara Eliya',
    aspectRatio: 4 / 5,
    likes: 342,
  },
  {
    id: 'm-2',
    url: 'https://images.unsplash.com/photo-1602643163983-ed0bafd39797?auto=format&fit=crop&w=1200&q=85',
    title: '5th-Century Sigiriya Lion Rock Fortress',
    category: 'Heritage',
    location: 'Sigiriya',
    aspectRatio: 16 / 9,
    likes: 512,
  },
  {
    id: 'm-3',
    url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=85',
    title: 'Colonial Ramparts at Sunset',
    category: 'Heritage',
    location: 'Galle Fort',
    aspectRatio: 1 / 1,
    likes: 289,
  },
  {
    id: 'm-4',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85',
    title: 'Wild Leopard Resting on Granite Boulders',
    category: 'Wildlife',
    location: 'Yala National Park',
    aspectRatio: 4 / 3,
    likes: 478,
  },
  {
    id: 'm-5',
    url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85',
    title: 'Bentota Ocean Waves & Golden Palm Coast',
    category: 'Coastal',
    location: 'Bentota Beach',
    aspectRatio: 16 / 9,
    likes: 620,
  },
  {
    id: 'm-6',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    title: 'Nine Arch Bridge Train Crossing Gap',
    category: 'Highlands',
    location: 'Ella Gap',
    aspectRatio: 3 / 4,
    likes: 890,
  },
  {
    id: 'm-7',
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
    title: 'Executive Toyota Prado Highway Safari',
    category: 'Fleet',
    location: 'Southern Expressway',
    aspectRatio: 16 / 9,
    likes: 415,
  },
  {
    id: 'm-8',
    url: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=85',
    title: 'Elephants Gathering at Udawalawe Reservoir',
    category: 'Wildlife',
    location: 'Udawalawe',
    aspectRatio: 4 / 3,
    likes: 560,
  },
];

const CATEGORIES = ['All', 'Highlands', 'Heritage', 'Wildlife', 'Coastal', 'Fleet'];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeTab === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-tropical-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-[#0F766E]" /> Dynamic Masonry Image Gallery
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Captivating Island Memories
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Immerse yourself in our curated visual gallery highlighting Sri Lanka's tea country, wild safaris, and luxury private transport.
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
                  : 'bg-[#FAFAF9] text-gray-700 hover:bg-gray-200 border border-gray-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Masonry Columns Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveItem(item)}
                className="break-inside-avoid group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 bg-gray-900"
              >
                <AspectRatio ratio={item.aspectRatio}>
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                  />
                </AspectRatio>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#D4AF37] bg-black/60 px-3 py-1 rounded-full border border-[#D4AF37]/40 backdrop-blur-md">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md">
                    <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </div>

                {/* Bottom Title Info */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex items-center gap-1 text-[11px] text-[#0EA5A4] font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </div>
                  <h3 className="text-base font-serif font-bold text-white drop-shadow-md">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Popup Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-[#022C22] text-white"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 bg-black/70 text-white rounded-full p-2.5 hover:bg-black cursor-pointer z-20 border border-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="bg-black max-h-[70vh] flex items-center justify-center overflow-hidden">
                <img src={activeItem.url} alt={activeItem.title} className="w-full h-full max-h-[70vh] object-contain" />
              </div>

              <div className="p-6 bg-[#022C22] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest">{activeItem.category}</span>
                    <span className="text-xs text-gray-400">• 📍 {activeItem.location}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white">{activeItem.title}</h3>
                </div>

                <button
                  onClick={() => setActiveItem(null)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase px-6 py-3 rounded-full"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
