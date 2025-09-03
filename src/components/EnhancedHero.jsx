'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import EnhancedSearchDropdown from './EnhancedSearchDropdown';

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/destination1.jpg',
      title: 'Discover Paradise',
      subtitle: 'Santorini, Greece',
      description: 'Experience breathtaking sunsets and pristine white architecture',
      gradient: 'from-blue-900/60 to-purple-900/60'
    },
    {
      image: '/destination2.jpg',
      title: 'Tropical Escape',
      subtitle: 'Bali, Indonesia',
      description: 'Immerse yourself in rich culture and stunning beaches',
      gradient: 'from-green-900/60 to-blue-900/60'
    },
    {
      image: '/destination3.jpg',
      title: 'Alpine Adventure',
      subtitle: 'Swiss Alps',
      description: 'Conquer majestic peaks and pristine mountain landscapes',
      gradient: 'from-gray-900/60 to-blue-900/60'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.subtitle}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-2xl md:text-4xl text-blue-200 mb-6 font-light">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Search Component Positioned at Bottom Border */}
      <div className="absolute left-0 right-0 -bottom-16 z-50 flex justify-center px-4">
        <div className="w-full max-w-5xl">
          <EnhancedSearchDropdown />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default EnhancedHero;
