import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ceylon Ride Tours | Private Vehicle Hire & Chauffeur Tour Packages Sri Lanka',
  description:
    'Award-winning Sri Lankan tourism website for private chauffeur services, luxury vehicle hire, airport transfers, and curated round island tour packages.',
  keywords: [
    'Sri Lanka Tourism',
    'Private Driver Sri Lanka',
    'Chauffeur Tours Sri Lanka',
    'Airport Transfer Colombo',
    'Luxury Vehicle Booking Sri Lanka',
    'Sigiriya Ella Kandy Tour Packages',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${playfairDisplay.variable} scroll-smooth antialiased h-full`}
    >
      <body className="min-h-full bg-[#FAFAF9] text-gray-900 font-sans flex flex-col selection:bg-[#0F766E] selection:text-[#D4AF37]">
        {children}
      </body>
    </html>
  );
}
