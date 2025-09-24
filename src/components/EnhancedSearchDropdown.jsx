'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useContent } from '../context/ContentContext';

const EnhancedSearchDropdown = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { siteContent } = useContent();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDestinationOpen(false);
        setIsSectorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDestinationOpen(false);
        setIsSectorOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Generate destinations from actual packages data
  const getDestinationsFromPackages = () => {
    if (!siteContent?.packages) return [];
    
    const destinationMap = new Map();
    
    siteContent.packages
      .filter(pkg => pkg.status === 'active')
      .forEach(pkg => {
        const key = pkg.location;
        if (destinationMap.has(key)) {
          const existing = destinationMap.get(key);
          existing.packages += 1;
        } else {
          // Extract country from location (assuming format "City, Country")
          const parts = pkg.location.split(',');
          const country = parts.length > 1 ? parts[parts.length - 1].trim() : parts[0];
          
          destinationMap.set(key, {
            id: destinationMap.size + 1,
            name: pkg.location,
            country: country,
            packages: 1,
            sectors: [pkg.category] // Use category as sector
          });
        }
      });

    return Array.from(destinationMap.values());
  };

  const destinations = getDestinationsFromPackages();

  // Get unique sectors from all packages
  const getAllSectors = () => {
    if (!siteContent?.packages) return [];
    
    const sectorsSet = new Set();
    siteContent.packages
      .filter(pkg => pkg.status === 'active')
      .forEach(pkg => {
        if (pkg.category) {
          sectorsSet.add(pkg.category);
        }
      });
    
    return Array.from(sectorsSet);
  };

  const selectedDestinationData = destinations.find(dest => dest.name === selectedDestination);
  const availableSectors = selectedDestinationData ? selectedDestinationData.sectors : getAllSectors();

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination.name);
    setSelectedSector(''); // Reset sector when destination changes
    setIsDestinationOpen(false);
  };

  const handleSectorSelect = (sector) => {
    setSelectedSector(sector);
    setIsSectorOpen(false);
  };

  const handleSearch = () => {
    if (selectedDestination) {
      const searchParams = new URLSearchParams({
        destination: selectedDestination,
        sector: selectedSector || 'all'
      });
      
      router.push(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <div ref={dropdownRef} className="relative bg-white rounded-lg shadow-lg max-w-6xl mx-auto border border-gray-200 overflow-visible">
    
      {/* Inline controls: destination, sector, search */}
      <div className="flex flex-col md:flex-row w-full">
        <div className="bg-blue-700 text-white flex items-center justify-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none p-4 sm:p-6 md:p-8 w-full md:w-1/4">
          <div className="text-center md:text-left">
            <p className="text-sm opacity-90">Find Your</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Holiday</h2>
            <div className="mt-2 flex justify-center md:justify-start">
              {/* Holiday Icon */}
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a1 1 0 001 1h3v-5a1 1 0 011-1h4a1 1 0 011 1v5h3a1 1 0 001-1V7l-7-5z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            
            {/* Destination Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Where to?</label>
              <button
                onClick={() => {
                  setIsDestinationOpen(!isDestinationOpen);
                  setIsSectorOpen(false);
                }}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-100 min-h-[44px] touch-manipulation"
                type="button"
              >
                <div className="flex justify-between items-center">
                  <span className={`text-sm sm:text-base ${selectedDestination ? 'text-gray-900' : 'text-gray-500'}`}>
                    {selectedDestination || 'Select destination'}
                  </span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isDestinationOpen && destinations.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {destinations.map((destination) => (
                    <button
                      key={destination.id}
                      onClick={() => handleDestinationSelect(destination)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0 min-h-[44px] touch-manipulation"
                      type="button"
                    >
                      <div className="flex justify-between items-center">
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{destination.name}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{destination.country}</div>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium ml-2 flex-shrink-0">
                          {destination.packages} packages
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sector Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">What type?</label>
              <button
                onClick={() => {
                  setIsSectorOpen(!isSectorOpen);
                  setIsDestinationOpen(false);
                }}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-gray-100 min-h-[44px] touch-manipulation"
                type="button"
              >
                <div className="flex justify-between items-center">
                  <span className={`text-sm sm:text-base ${selectedSector ? 'text-gray-900' : 'text-gray-500'}`}>
                    {selectedSector || 'Select type'}
                  </span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isSectorOpen && availableSectors.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {availableSectors.map((sector, index) => (
                    <button
                      key={index}
                      onClick={() => handleSectorSelect(sector)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0 text-sm sm:text-base min-h-[44px] touch-manipulation"
                      type="button"
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">When?</label>
              <input
                type="date"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 sm:px-4 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base min-h-[44px]"
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={!selectedDestination}
                className="w-full lg:w-auto bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg text-sm min-h-[44px] touch-manipulation"
                type="button"
              >
                Search Holidays
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearchDropdown;