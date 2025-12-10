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
  const { siteContent, getVisibleHeroSlides } = useContent();
  
  const company = siteContent?.company || {};
  const footer = siteContent?.footer || {};

  return (
    <div className="font-sans">
      <Header />

      {/* Enhanced Hero Section */}
      {getVisibleHeroSlides().length > 0 && <EnhancedHero />}

      {/* <main> */}
      <FeaturedPackages packages={siteContent?.packages || []} />
      {siteContent?.gallery?.visible !== false && <DestinationGallery />}
      {siteContent?.testimonials?.visible !== false && <Testimonials />}
      {siteContent?.stats?.visible !== false && <Stats />}
      {siteContent?.social?.visible !== false && <SocialMedia />}
      {siteContent?.whyChoose?.visible !== false && <WhyChooseUs />}
      {siteContent?.contact?.visible !== false && <ContactForm />}
      {/* </main> */}

      {footer.visible !== false && (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="sm:col-span-2 lg:col-span-1">
                {footer.logo && (
                  <Image
                    src={footer.logo}
                    alt={company.name || "Charika Tours and Travels"}
                    width={250}
                    height={60}
                    className="w-auto transition-all duration-300 h-12 sm:h-14 lg:h-16 mb-4"
                    priority
                  />
                )}
                <div className="space-y-3 sm:space-y-4 text-gray-300">
                  {company.address && (
                    <p className="text-sm sm:text-base flex items-start gap-2">
                      <span className="text-blue-400 flex-shrink-0">📍</span>
                      <span>{company.address}</span>
                    </p>
                  )}
                  <div className="space-y-2">
                    {company.phone && (
                      <p className="text-sm sm:text-base flex items-center gap-2">
                        <span className="text-green-400">📞</span>
                        <a href={`tel:${company.phone}`} className="hover:text-white transition-colors">{company.phone}</a>
                      </p>
                    )}
                    {company.secondaryPhone && (
                      <p className="text-sm sm:text-base flex items-center gap-2">
                        <span className="text-green-400">📞</span>
                        <a href={`tel:${company.secondaryPhone}`} className="hover:text-white transition-colors">{company.secondaryPhone}</a>
                      </p>
                    )}
                    {company.email && (
                      <p className="text-sm sm:text-base flex items-center gap-2">
                        <span className="text-yellow-400">📧</span>
                        <a href={`mailto:${company.email}`} className="hover:text-white transition-colors break-all">{company.email}</a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {footer.quickLinks && footer.quickLinks.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 sm:mb-4 text-lg">Quick Links</h4>
                  <ul className="space-y-2 text-gray-300">
                    {footer.quickLinks.map((link, index) => (
                      <li key={index}>
                        <a href={link.href} className="hover:text-white transition-colors text-sm sm:text-base">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {footer.destinations && footer.destinations.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 sm:mb-4 text-lg">Destinations</h4>
                  <ul className="space-y-2 text-gray-300">
                    {footer.destinations.map((dest, index) => (
                      <li key={index}>
                        <a href={dest.href} className="hover:text-white transition-colors text-sm sm:text-base">
                          {dest.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
              <p className="text-sm sm:text-base">
                © {new Date().getFullYear()} {footer.copyright || `${company.name || 'Charika Tours and Travels'}. All rights reserved.`}
              </p>
            </div>
          </div>
        </footer>
      )}
      </div>
    );
}