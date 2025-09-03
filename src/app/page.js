"use client";

import Header from '../components/Header';
import EnhancedHero from '../components/EnhancedHero';
import DestinationGallery from '../components/DestinationGallery';
import FeaturedPackages from '../components/FeaturedPackages';
import { WhyChooseUs } from '../components/DestinationSections';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import NewsletterCTA from '../components/NewsletterCTA';
import { ContentProvider } from '../context/ContentContext';

export default function Home() {
  return (
    <ContentProvider>
      <div className="font-sans">
        <Header />

        {/* Enhanced Hero Section */}
        <EnhancedHero />

        <main>
          <Stats />
          <DestinationGallery />
          <FeaturedPackages />
          <WhyChooseUs />
          <Testimonials />
          <NewsletterCTA />
        </main>

        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Dream Holidays</h3>
                <p className="text-gray-300">Making your travel dreams come true with exceptional service and unforgettable experiences.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/" className="hover:text-white">Home</a></li>
                  <li><a href="/packages" className="hover:text-white">Packages</a></li>
                  <li><a href="/about" className="hover:text-white">About Us</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Destinations</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">Europe</a></li>
                  <li><a href="#" className="hover:text-white">Asia</a></li>
                  <li><a href="#" className="hover:text-white">Americas</a></li>
                  <li><a href="#" className="hover:text-white">Africa</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact Info</h4>
                <div className="space-y-2 text-gray-300">
                  <p>📧 info@dreamholidays.com</p>
                  <p>📞 +1 (555) 123-4567</p>
                  <p>📍 123 Travel Street<br />Adventure City, AC 12345</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              © {new Date().getFullYear()} Dream Holidays. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </ContentProvider>
  );
}