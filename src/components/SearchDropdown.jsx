'use client';

import { useState } from 'react';

const SearchDropdown = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const destinations = [
    { id: 1, name: 'Santorini, Greece', country: 'Greece' },
    { id: 2, name: 'Bali, Indonesia', country: 'Indonesia' },
    { id: 3, name: 'Swiss Alps, Switzerland', country: 'Switzerland' },
    { id: 4, name: 'Maldives', country: 'Maldives' },
    { id: 5, name: 'Paris, France', country: 'France' },
    { id: 6, name: 'Tokyo, Japan', country: 'Japan' },
    { id: 7, name: 'Dubai, UAE', country: 'UAE' },
    { id: 8, name: 'New York, USA', country: 'USA' },
    { id: 9, name: 'London, UK', country: 'UK' },
    { id: 10, name: 'Rome, Italy', country: 'Italy' },
  ];

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination.name);
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (selectedDestination) {
      // Navigate to packages page or filter results
      console.log('Searching for:', selectedDestination);
      // You can add navigation logic here
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Find Your Dream Destination
      </h3>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Destination Dropdown */}
        <div className="relative flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Destination
          </label>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <span className={selectedDestination ? 'text-gray-900' : 'text-gray-500'}>
                {selectedDestination || 'Choose a destination'}
              </span>
              <svg
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform ${
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
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => handleDestinationSelect(destination)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                  >
                    <div className="font-medium text-gray-900">{destination.name}</div>
                    <div className="text-sm text-gray-500">{destination.country}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Travel Date */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travel Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Number of Travelers */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travelers
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4">4 People</option>
            <option value="5+">5+ People</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            Search Packages
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
