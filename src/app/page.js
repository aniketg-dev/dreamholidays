"use client";

import { useEffect } from 'react';
import Header from '../components/Header';
import EnhancedHero from '../components/EnhancedHero';
import DestinationGallery from '../components/DestinationGallery';
import FeaturedPackages from '../components/FeaturedPackages';
import { WhyChooseUs } from '../components/DestinationSections';
import ContactForm from '@/components/Contactus';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import NewsletterCTA from '../components/NewsletterCTA';
import SocialMedia from '../components/SocialMedia';
import { ContentProvider, useContent } from '../context/ContentContext';
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    // Add hide-scrollbar class to html and body elements when component mounts
    document.documentElement.classList.add('hide-scrollbar');
    document.body.classList.add('hide-scrollbar');
    
    // Remove the class when component unmounts (user navigates away)
    return () => {
      document.documentElement.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
    };
  }, []);

  return (
    <ContentProvider>
      <InnerApp />
    </ContentProvider>
  );
}

function InnerApp() {
  const { siteContent } = useContent();

  return (
    <div className="font-sans">
      <Header />

      {/* Enhanced Hero Section */}
      {siteContent?.hero?.visible !== false && <EnhancedHero />}

      {/* <main> */}
      <FeaturedPackages packages={siteContent?.packages || []} />
      {siteContent?.gallery?.visible !== false && <DestinationGallery />}
      {siteContent?.testimonials?.visible !== false && <Testimonials />}
      {siteContent?.stats?.visible !== false && <Stats />}
      {siteContent?.social?.visible !== false && <SocialMedia />}
      {siteContent?.whyChoose?.visible !== false && <WhyChooseUs />}
      {siteContent?.contact?.visible !== false && <ContactForm />}
      {/* </main> */}

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="sm:col-span-2 lg:col-span-1">
                <Image
                    src="/logo/dhlogo-bg.png"
                    alt="Dream Holidays"
                    width={250}
                    height={60}
                    className="w-auto transition-all duration-300 h-12 sm:h-14 lg:h-16 mb-4"
                    priority
                 />
                <div className="space-y-3 sm:space-y-4 text-gray-300">
                  <p className="text-sm sm:text-base flex items-start gap-2">
                    <span className="text-blue-400 flex-shrink-0">📍</span>
                    <span>142E, Office No.26, Lal Baba Haveli, Bhuleshwar, Charni Road(E), Mumbai - 400 002.</span>
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base flex items-center gap-2">
                      <span className="text-green-400">📞</span>
                      <a href="tel:+918655204900" className="hover:text-white transition-colors">+91 86552 04900</a>
                    </p>
                    <p className="text-sm sm:text-base flex items-center gap-2">
                      <span className="text-green-400">📞</span>
                      <a href="tel:(022)-2242-5160" className="hover:text-white transition-colors">(022)-2242-5160</a>
                    </p>
                    <p className="text-sm sm:text-base flex items-center gap-2">
                      <span className="text-yellow-400">📧</span>
                      <a href="mailto:info@dreamholidays.com" className="hover:text-white transition-colors break-all">sales@dreamholidaysonline.in</a>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-lg">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/" className="hover:text-white transition-colors text-sm sm:text-base">Home</a></li>
                  <li><a href="/packages" className="hover:text-white transition-colors text-sm sm:text-base">Packages</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors text-sm sm:text-base">About Us</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors text-sm sm:text-base">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-lg">Destinations</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Europe</a></li>
                  <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Asia</a></li>
                  <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Americas</a></li>
                  <li><a href="#" className="hover:text-white transition-colors text-sm sm:text-base">Africa</a></li>
                </ul>
              </div>
              
            </div>
            <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
              <p className="text-sm sm:text-base">© {new Date().getFullYear()} Dream Holidays. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
}