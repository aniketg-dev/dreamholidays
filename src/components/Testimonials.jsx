'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useContent } from '../context/ContentContext';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { siteContent } = useContent();

  const testimonials = siteContent?.testimonials?.reviews || [
    {
      id: 1,
      name: 'Aisha K.',
      comment: 'Our trip was flawless. Charika Tours and Travels took care of everything and exceeded expectations.',
      image: '/testimonials/test1.jpeg',
      location: 'Santorini, Greece',
      rating: 5
    },
    {
      id: 2,
      name: 'Carlos M.',
      comment: 'Amazing service and great value. Will book again!',
      image: '/testimonials/test2.jpg',
      location: 'Bali, Indonesia',
      rating: 5
    },
    {
      id: 3,
      name: 'Priya S.',
      comment: 'Beautifully planned itinerary and friendly guides. Highly recommend.',
      image: '/testimonials/test3.jpg',
      location: 'Swiss Alps',
      rating: 5
    }
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800">What Travelers Say</h2>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/20">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="min-w-full">
                  <div className="flex flex-col lg:flex-row bg-gradient-to-r from-white to-blue-50/50">
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative h-48 sm:h-64 lg:h-96">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.location}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                        {testimonial.location}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
                      <StarRating rating={testimonial.rating} />
                      
                      <blockquote className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 text-center lg:text-left leading-relaxed font-medium">
                        "{testimonial.comment}"
                      </blockquote>
                      
                      <div className="text-center lg:text-left">
                        <div className="font-bold text-gray-800 text-base sm:text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-xs sm:text-sm text-blue-600 font-medium mt-1">
                          Verified Traveler
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
