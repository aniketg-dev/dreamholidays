'use client';

import { useState, useEffect, useRef } from 'react';

// Custom hook for counter animation
const useCountUp = (endValue, duration = 2000, isVisible = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const updateCounter = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(endValue * progress));
        animationFrame = requestAnimationFrame(updateCounter);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration, isVisible]);

  return count;
};

// Hook for intersection observer
const useIntersectionObserver = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, isVisible]);

  return [ref, isVisible];
};

const Stats = () => {
  const [ref, isVisible] = useIntersectionObserver(0.3);

  const stats = [
    { 
      id: 1, 
      label: 'Amazing Destinations', 
      value: 120, 
      suffix: '+',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      id: 2, 
      label: 'Happy Travelers', 
      value: 15, 
      suffix: 'k+',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      gradient: 'from-green-500 to-teal-600'
    },
    { 
      id: 3, 
      label: 'Countries Worldwide', 
      value: 45, 
      suffix: '+',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section id="stats-section" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden" ref={ref}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-24 sm:w-32 h-24 sm:h-32 bg-purple-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-green-100 rounded-full opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Trusted by thousands of travelers worldwide, we're committed to creating unforgettable experiences
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((s, index) => {
            const count = useCountUp(s.value, 2500, isVisible);
            
            return (
              <div 
                key={s.id} 
                className={`group relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform transition-all duration-700 hover:-translate-y-2 ${
                  isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 rounded-xl sm:rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br ${s.gradient} text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8">
                    {s.icon}
                  </div>
                </div>

                {/* Number */}
                <div className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent mb-2 leading-none`}>
                  {count}{s.suffix}
                </div>

                {/* Label */}
                <div className="text-base sm:text-lg font-semibold text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                  {s.label}
                </div>

                {/* Decorative Line */}
                <div className={`absolute bottom-0 left-6 right-6 sm:left-8 sm:right-8 h-1 bg-gradient-to-r ${s.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 px-4">
            Join thousands of satisfied travelers and start your adventure today
          </p>
          <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
            <span>Explore Destinations</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Stats;
