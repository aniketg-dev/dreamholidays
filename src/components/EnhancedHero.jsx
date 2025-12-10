'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useContent } from '../context/ContentContext';

const EnhancedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { siteContent, getVisibleHeroSlides } = useContent();

  // Get visible slides from context
  const slides = getVisibleHeroSlides();

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Don't render if no visible slides
  if (!slides || slides.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Charika Tours and Travels</h1>
          <p className="text-xl">No hero slides configured</p>
        </div>
      </section>
    );
  }

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
            src={slide.backgroundImage}
            alt={slide.subtitle}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-blue-200 mb-4 sm:mb-6 font-light">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            {slides[currentSlide].description}
          </p>
        </div>

      </div>

      {/* Manual Navigation Arrows */}
      <div className="absolute inset-y-0 left-2 sm:left-4 flex items-center z-20">
        <button
          onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 group"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6 group-hover:w-5 group-hover:h-5 sm:group-hover:w-7 sm:group-hover:h-7 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-2 sm:right-4 flex items-center z-20">
        <button
          onClick={() => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 group"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6 group-hover:w-5 group-hover:h-5 sm:group-hover:w-7 sm:group-hover:h-7 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 sm:bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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
