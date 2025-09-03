'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';

const PackageDetails = ({ params }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Mock data - in real app this would come from API/database
  const packageData = {
    id: params?.id || 1,
    name: 'Santorini Paradise',
    location: 'Santorini, Greece',
    price: 1299,
    originalPrice: 1599,
    duration: '7 Days / 6 Nights',
    rating: 4.9,
    reviews: 124,
    maxPeople: 8,
    images: ['/destination1.jpg', '/destination2.jpg', '/destination3.jpg'],
    description: 'Experience the breathtaking beauty of Santorini with its iconic white buildings, blue domes, and stunning sunsets over the Aegean Sea. This carefully crafted itinerary includes luxury accommodations, guided tours, and unforgettable experiences.',
    highlights: [
      'Luxury oceanview accommodation',
      'Private sunset cruise',
      'Wine tasting at local vineyards',
      'Guided tour of Oia village',
      'Traditional Greek cooking class',
      'Airport transfers included'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Welcome', description: 'Airport pickup, hotel check-in, welcome dinner' },
      { day: 2, title: 'Oia Exploration', description: 'Guided tour of Oia, sunset viewing, local shopping' },
      { day: 3, title: 'Wine & Culture', description: 'Vineyard tours, wine tasting, cultural experiences' },
      { day: 4, title: 'Beach Day', description: 'Relaxation at Red Beach, swimming, beachside lunch' },
      { day: 5, title: 'Cruise Adventure', description: 'Private sunset cruise, dinner on board' },
      { day: 6, title: 'Cooking & Leisure', description: 'Greek cooking class, free time for shopping' },
      { day: 7, title: 'Departure', description: 'Hotel checkout, airport transfer' }
    ],
    included: ['Accommodation', 'Meals', 'Transportation', 'Tours', 'Activities'],
    notIncluded: ['International flights', 'Travel insurance', 'Personal expenses']
  };

  const BookingForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Book Your Trip</h3>
          <button 
            onClick={() => setShowBookingForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input type="tel" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Travel Date</label>
            <input type="date" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Number of Travelers</label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>1 Person</option>
              <option>2 People</option>
              <option>3 People</option>
              <option>4 People</option>
            </select>
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Request Booking
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/packages" className="text-blue-600 hover:underline">Packages</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{packageData.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-96 mb-4 rounded-2xl overflow-hidden">
                <Image
                  src={packageData.images[selectedImage]}
                  alt={packageData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {packageData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <Image src={image} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Package Info */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{packageData.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="font-medium">{packageData.rating}</span>
                  <span className="text-gray-600 ml-1">({packageData.reviews} reviews)</span>
                </div>
                <span className="text-gray-600">📍 {packageData.location}</span>
                <span className="text-gray-600">👥 Max {packageData.maxPeople} people</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{packageData.description}</p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Package Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-green-600">✓</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Day by Day Itinerary</h3>
              <div className="space-y-4">
                {packageData.itinerary.map((day) => (
                  <div key={day.day} className="border rounded-lg p-4">
                    <h4 className="font-bold text-lg mb-2">Day {day.day}: {day.title}</h4>
                    <p className="text-gray-700">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-blue-600">${packageData.price}</span>
                  <span className="text-lg text-gray-500 line-through">${packageData.originalPrice}</span>
                </div>
                <span className="text-sm text-gray-600">per person</span>
                <div className="text-sm text-green-600 font-medium">Save ${packageData.originalPrice - packageData.price}</div>
              </div>

              <button 
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-transform shadow-lg mb-4"
              >
                Book Now
              </button>

              <div className="border-t pt-4">
                <h4 className="font-bold mb-3">What's Included</h4>
                <ul className="space-y-2 mb-4">
                  {packageData.included.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <h4 className="font-bold mb-3">Not Included</h4>
                <ul className="space-y-2">
                  {packageData.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="text-red-500">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingForm && <BookingForm />}
    </div>
  );
};

export default PackageDetails;
