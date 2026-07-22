'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, ShieldCheck, Heart, Share2, Globe, Compass } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#022C22] text-white pt-20 pb-10 border-t border-[#D4AF37]/30 relative overflow-hidden">
      {/* Background Subtle Leaf Texture */}
      <div className="absolute inset-0 bg-dark-emerald-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F766E] to-[#022C22] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg">
                <span className="font-serif font-bold text-[#D4AF37] text-xl">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Ceylon <span className="text-[#D4AF37]">Ride</span> Tours
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#0EA5A4] uppercase font-semibold">
                  Sri Lankan Tourism & Chauffeur Fleet
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Sri Lanka’s premier private vehicle hire and tour package specialist. Dedicated exclusively to luxury ground transport, airport transfers, and bespoke chauffeur travel.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SLTDA Reg. #SL-TOUR-8942
              </span>
            </div>

            {/* Social Icons SVGs */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-gray-950 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-gray-950 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-gray-950 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>
              </a>
              <a href="#" aria-label="Twitter / X" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-gray-950 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><a href="#tours" className="hover:text-[#D4AF37] transition-colors">Tour Packages</a></li>
              <li><a href="#fleet" className="hover:text-[#D4AF37] transition-colors">Vehicle Fleet</a></li>
              <li><a href="#destinations" className="hover:text-[#D4AF37] transition-colors">Destinations</a></li>
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Services</a></li>
              <li><a href="#journey" className="hover:text-[#D4AF37] transition-colors">Our Journey</a></li>
              <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Photo Gallery</a></li>
              <li><a href="#reviews" className="hover:text-[#D4AF37] transition-colors">Client Reviews</a></li>
              <li><a href="#faq" className="hover:text-[#D4AF37] transition-colors">FAQ & Guide</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & HQ */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Contact & HQ
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0EA5A4] flex-shrink-0 mt-0.5" />
                <span>No. 148 Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0EA5A4] flex-shrink-0" />
                <span>+94 11 234 5678 / +94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0EA5A4] flex-shrink-0" />
                <span>info@ceylonridetours.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-400 font-semibold">24/7 WhatsApp VIP Line</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Map Preview */}
          <div>
            <h4 className="text-sm font-serif font-bold text-[#D4AF37] uppercase tracking-wider mb-4">
              Newsletter & Route Map
            </h4>
            <p className="text-xs text-gray-300 mb-3">
              Subscribe for exclusive Sri Lankan road trip guides and seasonal vehicle discounts.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2 mb-4">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-gray-950 font-bold text-xs uppercase py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="bg-white/10 p-3 rounded-xl border border-emerald-500/30 text-xs text-emerald-400 font-semibold mb-4 text-center">
                ✓ Subscribed to Ceylon Newsletter!
              </div>
            )}

            {/* Embedded Google Map Preview Box */}
            <div className="h-24 w-full rounded-xl overflow-hidden border border-white/20 relative group">
              <iframe
                title="Sri Lanka Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7984671120286!2d79.8485293!3d6.9146781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593b4a24316d%3A0xb307185012a67e41!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-0 filter grayscale contrast-125 opacity-70 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Ceylon Ride Tours. All Rights Reserved. Private Chauffeur & Tour Specialist.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Transport Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">SLTDA License</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
