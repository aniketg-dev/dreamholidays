'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import FeaturedPackages from '../../components/FeaturedPackages';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    duration: '',
    rating: 0,
    category: ''
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');

  const destination = searchParams?.get('destination') || '';
  const date = searchParams?.get('date') || '';
  const travelers = searchParams?.get('travelers') || '';

  // Mock search results
  const searchResults = [
    {
      id: 1,
      name: 'Santorini Paradise',
      image: '/destination1.jpg',
      description: 'Experience the breathtaking beauty of Santorini with its iconic white buildings and sunsets.',
      price: 1299,
      duration: '7 Days',
      rating: 5,
      reviews: 124,
      location: 'Santorini, Greece',
      maxPeople: 8,
      category: 'Luxury'
    },
    {
      id: 2,
      name: 'Santorini Budget Tour',
      image: '/destination1.jpg',
      description: 'Affordable Santorini experience with comfortable accommodations and guided tours.',
      price: 799,
      duration: '5 Days',
      rating: 4,
      reviews: 89,
      location: 'Santorini, Greece',
      maxPeople: 12,
      category: 'Budget'
    },
    {
      id: 3,
      name: 'Santorini Honeymoon',
      image: '/destination1.jpg',
      description: 'Romantic getaway perfect for couples with private dinners and luxury amenities.',
      price: 1899,
      duration: '6 Days',
      rating: 5,
      reviews: 67,
      location: 'Santorini, Greece',
      maxPeople: 2,
      category: 'Romance'
    }
  ];

  const categories = ['All', 'Luxury', 'Budget', 'Adventure', 'Romance', 'Family'];
  const durations = ['Any', '3-5 Days', '6-8 Days', '9+ Days'];

  const filteredResults = searchResults.filter(pkg => {
    const matchesPrice = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1];
    const matchesDuration = !filters.duration || filters.duration === 'Any' || 
      (filters.duration === '3-5 Days' && parseInt(pkg.duration) <= 5) ||
      (filters.duration === '6-8 Days' && parseInt(pkg.duration) >= 6 && parseInt(pkg.duration) <= 8) ||
      (filters.duration === '9+ Days' && parseInt(pkg.duration) >= 9);
    const matchesRating = pkg.rating >= filters.rating;
    const matchesCategory = !filters.category || filters.category === 'All' || pkg.category === filters.category;
    
    return matchesPrice && matchesDuration && matchesRating && matchesCategory;
  });

  return (
    <div>
      <Header />
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Search Results</h1>
          <p className="text-xl opacity-90">
            {destination && `Showing packages for ${destination}`}
            {date && ` • Travel date: ${date}`}
            {travelers && ` • ${travelers} travelers`}
          </p>
          <p className="mt-2 opacity-75">{filteredResults.length} packages found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-6">Filter Results</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Duration</label>
                <select 
                  value={filters.duration}
                  onChange={(e) => setFilters({...filters, duration: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Minimum Rating</label>
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilters({...filters, rating})}
                      className={`flex items-center gap-2 p-2 rounded w-full text-left ${
                        filters.rating === rating ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm">{rating > 0 ? `${rating}+ stars` : 'Any rating'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setFilters({...filters, category})}
                      className={`block w-full text-left p-2 rounded ${
                        filters.category === category ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setFilters({priceRange: [0, 5000], duration: '', rating: 0, category: ''})}
                className="w-full text-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Sort and View Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Results Grid/List */}
            {filteredResults.length > 0 ? (
              <FeaturedPackages packages={filteredResults} />
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">No packages found matching your criteria</p>
                <button
                  onClick={() => setFilters({priceRange: [0, 5000], duration: '', rating: 0, category: ''})}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filters to see more results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
