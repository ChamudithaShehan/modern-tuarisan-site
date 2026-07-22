'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Trash2, ArrowRight, Car, Compass } from 'lucide-react';
import { WishlistItem, Currency, CurrencyRate } from '../../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemoveItem: (id: string) => void;
  onOpenBooking: (options?: { tourId?: string; vehicleId?: string }) => void;
  currency: Currency;
  currencyRates: Record<Currency, CurrencyRate>;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onOpenBooking,
  currency,
  currencyRates,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  const formatPrice = (priceUsd: number) => {
    const rateObj = currencyRates[currency] || { rate: 1, symbol: '$' };
    const converted = Math.round(priceUsd * rateObj.rate);
    return `${rateObj.symbol}${converted}`;
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md bg-[#022C22] border-l border-[#D4AF37]/40 h-full p-6 text-white shadow-2xl flex flex-col justify-between overflow-y-auto"
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="text-xl font-serif font-bold text-white">Your Saved Wishlist</h3>
                <span className="bg-[#D4AF37] text-gray-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="py-16 text-center text-gray-400 space-y-3">
                <Heart className="w-12 h-12 text-gray-600 mx-auto stroke-1" />
                <p className="text-sm font-semibold text-gray-300">Your wishlist is currently empty.</p>
                <p className="text-xs text-gray-400">Click the heart icon on any tour package or vehicle card to save your favorites.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-4 hover:border-[#D4AF37] transition-all"
                  >
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                        {item.type === 'tour' ? 'Tour Package' : 'Fleet Vehicle'}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-white line-clamp-1">{item.title}</h4>
                      <span className="text-xs font-bold text-[#0EA5A4]">{formatPrice(item.priceUsd)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          if (item.type === 'tour') onOpenBooking({ tourId: item.id });
                          else onOpenBooking({ vehicleId: item.id });
                        }}
                        className="p-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold hover:scale-105 transition-transform"
                        title="Book Now"
                      >
                        <ArrowRight className="w-4 h-4 text-gray-950" />
                      </button>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 rounded-xl bg-white/10 hover:bg-rose-950 text-gray-400 hover:text-rose-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-gray-950 font-bold text-xs uppercase py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2"
            >
              <Car className="w-4 h-4 text-gray-950" />
              <span>Proceed to Booking</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
