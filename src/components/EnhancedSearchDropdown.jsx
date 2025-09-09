'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const EnhancedSearchDropdown = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [isSectorOpen, setIsSectorOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDestinationOpen(false);
        setIsSectorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
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

  const destinations = [
    { 
      id: 1, 
      name: 'Santorini, Greece', 
      country: 'Greece', 
      packages: 5,
      sectors: ['Beaches', 'Historical Sites', 'Luxury Resorts', 'Wine Tours']
    },
    { 
      id: 2, 
      name: 'Bali, Indonesia', 
      country: 'Indonesia', 
      packages: 8,
      sectors: ['Beaches', 'Temples', 'Adventure Sports', 'Wellness Retreats']
    },
    { 
      id: 3, 
      name: 'Swiss Alps, Switzerland', 
      country: 'Switzerland', 
      packages: 3,
      sectors: ['Mountain Adventures', 'Skiing', 'Hiking', 'Scenic Railways']
    },
    { 
      id: 4, 
      name: 'Maldives', 
      country: 'Maldives', 
      packages: 6,
      sectors: ['Luxury Resorts', 'Water Sports', 'Spa & Wellness', 'Private Islands']
    },
    { 
      id: 5, 
      name: 'Paris, France', 
      country: 'France', 
      packages: 12,
      sectors: ['Cultural Tours', 'Art & Museums', 'Cuisine', 'Fashion & Shopping']
    },
    { 
      id: 6, 
      name: 'Tokyo, Japan', 
      country: 'Japan', 
      packages: 7,
      sectors: ['Cultural Experiences', 'Technology Tours', 'Cuisine', 'Traditional Arts']
    },
    { 
      id: 7, 
      name: 'Dubai, UAE', 
      country: 'UAE', 
      packages: 9,
      sectors: ['Luxury Shopping', 'Desert Safari', 'Modern Architecture', 'Adventure Parks']
    },
    { 
      id: 8, 
      name: 'New York, USA', 
      country: 'USA', 
      packages: 15,
      sectors: ['City Tours', 'Broadway Shows', 'Museums', 'Shopping']
    },
  ];

  const selectedDestinationData = destinations.find(dest => dest.name === selectedDestination);
  const availableSectors = selectedDestinationData ? selectedDestinationData.sectors : [];

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
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0L16.95 6.05M6.05 17.95l-1.414 1.414M9 17h6m-6-4h6" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 sm:p-6 bg-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          
          {/* Destination Dropdown */}
          <div className="relative flex-1 min-w-0">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Choose Destination
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setIsDestinationOpen(!isDestinationOpen);
                  setIsSectorOpen(false); // Close other dropdown
                }}
                className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-3 sm:py-2 text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 text-sm min-h-[44px] touch-manipulation"
                type="button"
              >
                <span className={`block pr-8 ${selectedDestination ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  {selectedDestination || 'Select destination'}
                </span>
                <svg
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform text-gray-400 ${
                    isDestinationOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDestinationOpen && (
                <div className="absolute z-[60] w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto left-0 right-0">
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
          </div>

          {/* Sector Dropdown */}
          <div className="relative flex-1 min-w-0">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Choose Sector
            </label>
            <div className="relative">
              <button
                onClick={() => {
                  setIsSectorOpen(!isSectorOpen);
                  setIsDestinationOpen(false); // Close other dropdown
                }}
                disabled={!selectedDestination}
                className="w-full bg-white border-2 border-gray-200 rounded-lg px-3 py-3 sm:py-2 text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm min-h-[44px] touch-manipulation"
                type="button"
              >
                <span className={`block pr-8 ${selectedSector ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  {selectedSector || (selectedDestination ? 'Select sector' : 'Choose destination first')}
                </span>
                <svg
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform text-gray-400 ${
                    isSectorOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isSectorOpen && availableSectors.length > 0 && (
                <div className="absolute z-[60] w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto left-0 right-0">
                  {availableSectors.map((sector, index) => (
                    <button
                      key={index}
                      onClick={() => handleSectorSelect(sector)}
                      className="w-full px-4 sm:px-6 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0 min-h-[44px] touch-manipulation"
                      type="button"
                    >
                      <div className="font-medium text-gray-900 text-sm sm:text-base">{sector}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Search Button */}
          <div className="flex-shrink-0 lg:mt-6">
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
  );
};

export default EnhancedSearchDropdown;
