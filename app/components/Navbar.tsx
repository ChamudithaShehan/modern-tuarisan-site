'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Menu, X, Car, Calendar, Globe, Compass, Heart, Layers, Sparkles } from 'lucide-react';
import { Currency, Language, WishlistItem } from '../../types';

interface NavbarProps {
  onOpenBooking: (options?: { tourId?: string; vehicleId?: string }) => void;
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenComparison: () => void;
}

export default function Navbar({
  onOpenBooking,
  currentCurrency,
  onCurrencyChange,
  currentLanguage,
  onLanguageChange,
  wishlistCount,
  onOpenWishlist,
  onOpenComparison,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tours', href: '#tours' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Services', href: '#services' },
    { name: 'Our Journey', href: '#journey' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0B0F17] border-b border-[#D4AF37]/30 py-3.5 shadow-2xl backdrop-blur-2xl'
            : 'bg-transparent backdrop-blur-none py-5 border-b border-transparent'
        }`}
      >
        {/* Full Width Container Across PC */}
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#0F766E] to-[#022C22] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="font-serif font-bold text-[#D4AF37] text-lg sm:text-xl">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-md">
                  Ceylon <span className="text-[#D4AF37]">Ride</span> Tours
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#0EA5A4] uppercase font-semibold">
                  Private Chauffeur & Packages
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Full Width Spacing) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-wider font-bold text-white/90 hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              {/* Language Selector */}
              <div className="relative flex items-center bg-white/10 border border-white/20 hover:border-[#D4AF37]/50 rounded-full px-2.5 py-1.5 shadow-md">
                <Globe className="w-3.5 h-3.5 text-[#0EA5A4] mr-1" />
                <select
                  value={currentLanguage}
                  onChange={(e) => onLanguageChange(e.target.value as Language)}
                  className="bg-transparent text-[11px] font-bold text-white focus:outline-none cursor-pointer"
                >
                  <option value="EN" className="text-gray-900">EN (English)</option>
                  <option value="SI" className="text-gray-900">SI (සිංහල)</option>
                  <option value="DE" className="text-gray-900">DE (Deutsch)</option>
                  <option value="FR" className="text-gray-900">FR (Français)</option>
                </select>
              </div>

              {/* Currency Selector */}
              <div className="relative flex items-center bg-white/10 border border-white/20 hover:border-[#D4AF37]/50 rounded-full px-2.5 py-1.5 shadow-md">
                <select
                  value={currentCurrency}
                  onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                  className="bg-transparent text-[11px] font-bold text-[#D4AF37] focus:outline-none cursor-pointer"
                >
                  <option value="USD" className="text-gray-900">USD ($)</option>
                  <option value="EUR" className="text-gray-900">EUR (€)</option>
                  <option value="GBP" className="text-gray-900">GBP (£)</option>
                  <option value="AUD" className="text-gray-900">AUD ($)</option>
                  <option value="LKR" className="text-gray-900">LKR (Rs)</option>
                </select>
              </div>

              {/* Wishlist Button Badge */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#D4AF37]/50 text-white cursor-pointer transition-transform hover:scale-105 shadow-md"
                title="Saved Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-400 fill-rose-400' : 'text-white'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-md">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Vehicle Compare Button */}
              <button
                onClick={onOpenComparison}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#D4AF37]/50 text-white cursor-pointer transition-transform hover:scale-105 shadow-md"
                title="Compare Vehicles Side-by-Side"
              >
                <Layers className="w-4 h-4 text-[#D4AF37]" />
              </button>

              {/* WhatsApp Direct CTA */}
              <a
                href="https://wa.me/94771234567?text=Hello%20Ceylon%20Ride%20Tours,%20I%20would%20like%20to%20inquire%20about%20a%20private%20vehicle%20booking."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-3.5 py-2 rounded-full transition-all shadow-md"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                <span>WhatsApp</span>
              </a>

              {/* Book Now Button */}
              <button
                onClick={() => onOpenBooking()}
                className="group relative inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] text-gray-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-xl hover:shadow-amber-500/30 hover:scale-105 transition-all cursor-pointer"
              >
                <Car className="w-4 h-4 text-gray-950" />
                <span>Book Now</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-[72px] z-50 lg:hidden bg-[#0B0F17]/98 backdrop-blur-2xl border-b border-[#D4AF37]/30 px-6 py-6 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-bold text-white hover:text-[#D4AF37] transition-colors py-2 border-b border-white/10 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <Compass className="w-4 h-4 text-[#0EA5A4]" />
                  </a>
                ))}

                {/* Mobile Drawer Controls Row */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 py-2">
                    <Globe className="w-4 h-4 text-[#D4AF37] mr-2" />
                    <select
                      value={currentLanguage}
                      onChange={(e) => onLanguageChange(e.target.value as Language)}
                      className="bg-transparent text-xs font-bold text-white focus:outline-none w-full"
                    >
                      <option value="EN" className="text-gray-900">EN (English)</option>
                      <option value="SI" className="text-gray-900">SI (සිංහල)</option>
                      <option value="DE" className="text-gray-900">DE (Deutsch)</option>
                      <option value="FR" className="text-gray-900">FR (Français)</option>
                    </select>
                  </div>

                  <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-3 py-2">
                    <select
                      value={currentCurrency}
                      onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                      className="bg-transparent text-xs font-bold text-[#D4AF37] focus:outline-none w-full"
                    >
                      <option value="USD" className="text-gray-900">USD ($)</option>
                      <option value="EUR" className="text-gray-900">EUR (€)</option>
                      <option value="GBP" className="text-gray-900">GBP (£)</option>
                      <option value="AUD" className="text-gray-900">AUD ($)</option>
                      <option value="LKR" className="text-gray-900">LKR (Rs)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenWishlist();
                    }}
                    className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 py-2.5 rounded-xl text-xs font-bold text-white"
                  >
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>Wishlist ({wishlistCount})</span>
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenComparison();
                    }}
                    className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 py-2.5 rounded-xl text-xs font-bold text-white"
                  >
                    <Layers className="w-4 h-4 text-[#D4AF37]" />
                    <span>Compare</span>
                  </button>
                </div>

                <a
                  href="https://wa.me/94771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-500/40 py-3 rounded-full"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp VIP Concierge</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full mt-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-sm uppercase py-3.5 rounded-full shadow-xl"
                >
                  <Car className="w-4 h-4 text-gray-950" />
                  <span>Book Vehicle / Tour Package</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
