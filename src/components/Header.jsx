'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Only enable scrolling effect on the home page
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return; // Skip scroll listener for non-home pages
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Packages', href: '/packages' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
      !isHomePage
        ? 'bg-white' // Always white with shadow for non-home pages
        : isScrolled 
          ? 'bg-white' 
          : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          !isHomePage 
            ? 'py-2' // Static padding for non-home pages
            : isScrolled ? 'py-2' : 'py-3 sm:py-4'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/dhlogo-bg.png"
              alt="Dream Holidays"
              width={250}
              height={60}
              className={`w-auto transition-all duration-300 ${
                !isHomePage
                  ? 'h-14 sm:h-16' // Static size for non-home pages
                  : isScrolled 
                    ? 'h-14 sm:h-16' 
                    : 'h-24 sm:h-26'
              }`}
              priority
            />
          </Link>

          {/* Desktop Contact Info */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a 
              href="tel:+15551234567" 
              className={`flex items-center space-x-2 hover:text-blue-600 transition-colors ${
                !isHomePage 
                  ? 'text-gray-700' // Always dark text for non-home pages
                  : isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <svg className="w-4 h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium text-sm xl:text-base">(022)-2242-5160</span>
            </a>
            
            <a 
              href="mailto:sales@dreamholidaysonline.in" 
              className={`flex items-center space-x-2 hover:text-blue-600 transition-colors ${
                !isHomePage 
                  ? 'text-gray-700' // Always dark text for non-home pages
                  : isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <svg className="w-4 h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-sm xl:text-base hidden xl:inline">sales@dreamholidaysonline.in</span>
              <span className="font-medium text-sm lg:inline xl:hidden">Contact</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              !isHomePage 
                ? 'text-gray-700' // Always dark text for non-home pages
                : isScrolled ? 'text-gray-700' : 'text-white hover:bg-white/10'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Contact Info */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4 px-2">
              <a 
                href="tel:(022)-2242-5160" 
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">(022)-2242-5160</span>
              </a>
              
              <a 
                href="mailto:sales@dreamholidaysonline.in" 
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-sm">sales@dreamholidaysonline.in</span>
              </a>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center px-4">Contact us for your dream vacation!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
