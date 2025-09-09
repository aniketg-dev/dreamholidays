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
  title: "Dream Holidays - Your Perfect Vacation Awaits",
  description: "Discover amazing destinations and create unforgettable memories with Dream Holidays. Explore our handpicked selection of travel packages worldwide.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
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
