import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ContentProvider } from '../context/ContentContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Charika Tours and Travels - Your Perfect Vacation Awaits",
  description: "Discover amazing destinations and create unforgettable memories with Charika Tours and Travels. Explore our handpicked selection of travel packages worldwide.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        style={{ maxWidth: '100vw' }}
      >
        <ContentProvider>
          {children}
        </ContentProvider>
      </body>
    </html>
  );
}
