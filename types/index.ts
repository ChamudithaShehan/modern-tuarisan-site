export type Currency = 'USD' | 'EUR' | 'GBP' | 'AUD' | 'LKR';

export type Language = 'EN' | 'SI' | 'DE' | 'FR';

export interface CurrencyRate {
  code: Currency;
  symbol: string;
  rate: number; // multiplier relative to USD
}

export interface DestinationWeather {
  tempC: number;
  tempF: number;
  condition: string;
  iconName: 'sun' | 'cloud-sun' | 'cloud-rain';
  bestMonths: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  location: string;
  image: string;
  highlights: string[];
}

export interface TourPackage {
  id: string;
  packageNumber: string;
  title: string;
  subtitle: string;
  durationDays: number;
  durationNights: number;
  priceUsd: number;
  bestTime: string;
  distanceKm: number;
  vehicleIncluded: string;
  destinations: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  image: string;
  tag: string;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'Economy' | 'Sedan' | 'SUV' | 'Luxury VIP' | 'Van' | 'Mini Coach';
  passengerCapacity: number;
  luggageCapacity: number;
  ac: boolean;
  wifi: boolean;
  pricingPerDayUsd: number;
  image: string;
  description: string;
  features: string[];
  popularFor: string[];
  transmission: string;
  fuelType: string;
  isFleetHighlight?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  area: string;
  tagline: string;
  description: string;
  image: string;
  category: 'Nature' | 'Heritage' | 'Beach' | 'Wildlife' | 'Adventure';
  highlights: string[];
  recommendedDays: number;
  isTopDestination?: boolean;
  weather: DestinationWeather;
  mapCoordsSvg: { x: number; y: number }; // Percentage offset on SVG map
  googleMapEmbedUrl: string;
}

export interface JourneyStory {
  id: string;
  title: string;
  location: string;
  category: 'Beach' | 'Hill Country' | 'Wildlife' | 'Drone Views' | 'Road Trip' | 'VIP Transport';
  date: string;
  imageUrl: string;
  clientName: string;
  clientCountry: string;
  vehicleUsed: string;
  testimonialSnippet: string;
  stats?: string;
}

export interface Review {
  id: string;
  author: string;
  country: string;
  flag: string;
  rating: number;
  date: string;
  avatar: string;
  title: string;
  text: string;
  tourTaken: string;
  vehicleBooked: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking' | 'Vehicles' | 'Drivers' | 'Payments';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
  iconName: string;
}

export interface BookingFormData {
  name: string;
  country: string;
  email: string;
  phone: string;
  pickupLocation: string;
  tourPackage: string;
  vehicleType: string;
  travelDate: string;
  noOfTravelers: number;
  specialRequests: string;
}

export interface WishlistItem {
  id: string;
  type: 'tour' | 'vehicle' | 'destination';
  title: string;
  image: string;
  priceUsd: number;
  subtitle: string;
}
