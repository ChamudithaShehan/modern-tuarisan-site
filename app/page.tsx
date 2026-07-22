'use client';

import { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import WhyChooseUs from './components/WhyChooseUs';
import VehicleFleet from './components/VehicleFleet';
import TourPackages from './components/TourPackages';
import Destinations from './components/Destinations';
import InteractiveMap from './components/InteractiveMap';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import AirportFareEstimator from './components/AirportFareEstimator';
import OurServices from './components/OurServices';
import BookingProcess from './components/BookingProcess';
import OurJourney from './components/OurJourney';
import Gallery from './components/Gallery';
import ClientReviews from './components/ClientReviews';
import BookingSection from './components/BookingSection';
import BookingModal from './components/BookingModal';
import VehicleComparisonModal from './components/VehicleComparisonModal';
import WishlistDrawer from './components/WishlistDrawer';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import AmbientSound from './components/AmbientSound';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { Currency, CurrencyRate, Language, WishlistItem } from '../types';

const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  USD: { code: 'USD', symbol: '$', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.52 },
  LKR: { code: 'LKR', symbol: 'Rs. ', rate: 305 },
};

export default function Home() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [language, setLanguage] = useState<Language>('EN');
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [bookingOptions, setBookingOptions] = useState<{ tourId?: string; vehicleId?: string }>({});

  const handleOpenBooking = (options?: { tourId?: string; vehicleId?: string }) => {
    if (options) {
      setBookingOptions(options);
    } else {
      setBookingOptions({});
    }
    setIsBookingModalOpen(true);
  };

  const handleToggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      if (exists) {
        return prev.filter((w) => w.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleToggleCompare = (vehicleId: string) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(vehicleId)) {
        return prev.filter((id) => id !== vehicleId);
      } else {
        if (prev.length >= 3) return [...prev.slice(1), vehicleId];
        return [...prev, vehicleId];
      }
    });
  };

  const wishlistIds = wishlist.map((w) => w.id);

  return (
    <main className="relative min-h-screen bg-[#FAFAF9] overflow-x-hidden selection:bg-[#0F766E] selection:text-[#D4AF37]">
      {/* Luxury Preloader */}
      <Preloader />

      {/* Top Scroll Reading Progress */}
      <ScrollProgress />

      {/* Custom Glowing Cursor Trail */}
      <CustomCursor />

      {/* Persistent Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Ambient Soundscape Player */}
      <AmbientSound />

      {/* Translucent Glass Navigation Bar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        currentLanguage={language}
        onLanguageChange={setLanguage}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenBooking={handleOpenBooking}
        onOpenVideo={() => setIsVideoModalOpen(true)}
      />

      {/* Animated Counter Stats Section */}
      <Stats />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Vehicle Fleet Showcase Section */}
      <VehicleFleet
        onOpenBooking={handleOpenBooking}
        currency={currency}
        currencyRates={CURRENCY_RATES}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        selectedCompareIds={selectedCompareIds}
        onToggleCompare={handleToggleCompare}
      />

      {/* Flagship Tour Packages Section */}
      <TourPackages
        onOpenBooking={handleOpenBooking}
        currency={currency}
        currencyRates={CURRENCY_RATES}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Interactive Sri Lanka Vector Map */}
      <InteractiveMap onOpenBooking={handleOpenBooking} />

      {/* Vehicle & Tour Availability Calendar */}
      <AvailabilityCalendar onOpenBooking={handleOpenBooking} />

      {/* BIA Airport Transfer Fare Calculator */}
      <AirportFareEstimator
        onOpenBooking={handleOpenBooking}
        currency={currency}
        currencyRates={CURRENCY_RATES}
      />

      {/* 14 Destinations Showcase with Weather */}
      <Destinations
        onOpenBooking={handleOpenBooking}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Transport & Tour Services */}
      <OurServices onOpenBooking={handleOpenBooking} />

      {/* 5-Step Booking Process Timeline */}
      <BookingProcess onOpenBooking={handleOpenBooking} />

      {/* Our Journey (Completed Tours History) */}
      <OurJourney />

      {/* Masonry Gallery */}
      <Gallery />

      {/* Client Reviews Section */}
      <ClientReviews />

      {/* Inline Glass Reservation Section */}
      <BookingSection
        currency={currency}
        currencyRates={CURRENCY_RATES}
      />

      {/* FAQ Accordion Section */}
      <FAQ />

      {/* Grand Luxury Footer */}
      <Footer />

      {/* Booking Modal Popup */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialTourId={bookingOptions.tourId}
        initialVehicleId={bookingOptions.vehicleId}
        currency={currency}
        currencyRates={CURRENCY_RATES}
      />

      {/* Vehicle Comparison Modal */}
      <VehicleComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        selectedVehicleIds={selectedCompareIds}
        onOpenBooking={handleOpenBooking}
        currency={currency}
        currencyRates={CURRENCY_RATES}
      />

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemoveItem={(id) => setWishlist((prev) => prev.filter((item) => item.id !== id))}
        onOpenBooking={handleOpenBooking}
        currency={currency}
        currencyRates={CURRENCY_RATES}
      />

      {/* Cinematic Video Trailer Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </main>
  );
}
