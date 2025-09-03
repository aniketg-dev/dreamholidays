'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EnhancedSearchDropdown = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const destinations = [
    { id: 1, name: 'Santorini, Greece', country: 'Greece', packages: 5 },
    { id: 2, name: 'Bali, Indonesia', country: 'Indonesia', packages: 8 },
    { id: 3, name: 'Swiss Alps, Switzerland', country: 'Switzerland', packages: 3 },
    { id: 4, name: 'Maldives', country: 'Maldives', packages: 6 },
    { id: 5, name: 'Paris, France', country: 'France', packages: 12 },
    { id: 6, name: 'Tokyo, Japan', country: 'Japan', packages: 7 },
    { id: 7, name: 'Dubai, UAE', country: 'UAE', packages: 9 },
    { id: 8, name: 'New York, USA', country: 'USA', packages: 15 },
    { id: 9, name: 'London, UK', country: 'UK', packages: 11 },
    { id: 10, name: 'Rome, Italy', country: 'Italy', packages: 8 },
  ];

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination.name);
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (selectedDestination) {
      const searchParams = new URLSearchParams({
        destination: selectedDestination,
        date: selectedDate,
        travelers: travelers
      });
      router.push(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <div className="relative z-50 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-5xl mx-auto border border-white/20">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Find Your Perfect Getaway
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Destination Dropdown */}
        <div className="relative md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Where to?
          </label>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-4 text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
            >
              <span className={`block ${selectedDestination ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                {selectedDestination || 'Select destination'}
              </span>
              <svg
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform text-gray-400 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto">
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => handleDestinationSelect(destination)}
                    className="w-full px-6 py-4 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-900">{destination.name}</div>
                        <div className="text-sm text-gray-500">{destination.country}</div>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                        {destination.packages} packages
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Travel Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            When?
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
          />
        </div>

        {/* Number of Travelers */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Travelers
          </label>
          <select 
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
          >
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4">4 People</option>
            <option value="5">5 People</option>
            <option value="6+">6+ People</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-8">
        <button
          onClick={handleSearch}
          disabled={!selectedDestination}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg text-lg"
        >
          Search Amazing Packages
        </button>
      </div>
    </div>
  );
};

export default EnhancedSearchDropdown;
