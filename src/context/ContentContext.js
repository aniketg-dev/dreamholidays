'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [siteContent, setSiteContent] = useState({
    hero: {
  title: 'Discover Paradise',
  subtitle: 'Make Your Travel Dreams Come True',
  description: 'Experience breathtaking destinations with our carefully crafted travel packages',
  visible: true
    },
    company: {
  name: 'Dream Holidays',
  email: 'info@dreamholidays.com',
  phone: '+1 (555) 123-4567',
  address: '123 Travel Street, Adventure City, AC 12345',
  visible: true
    },
    packages: [
      {
        id: 1,
        name: 'Santorini Paradise',
        location: 'Santorini, Greece',
        price: 1299,
        originalPrice: 1599,
        duration: '7 Days / 6 Nights',
        rating: 4.9,
        reviews: 124,
        maxPeople: 8,
        image: '/gallery/image1.jpeg',
        images: ['/gallery/image1.jpeg', '/gallery/image2.jpg', '/gallery/image3.jpg'],
        description: 'Experience the breathtaking beauty of Santorini with its iconic white buildings, blue domes, and stunning sunsets over the Aegean Sea.',
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
        notIncluded: ['International flights', 'Travel insurance', 'Personal expenses'],
        featured: true,
        category: 'Luxury',
        status: 'active'
      },
      {
        id: 2,
        name: 'Bali Adventure',
        location: 'Bali, Indonesia',
        price: 899,
        originalPrice: 1199,
        duration: '10 Days / 9 Nights',
        rating: 4.7,
        reviews: 98,
        maxPeople: 12,
        image: '/gallery/image2.jpg',
        images: ['/gallery/image2.jpg', '/gallery/image1.jpeg', '/gallery/image3.jpg'],
        description: 'Discover the magic of Bali with its beautiful beaches, ancient temples, lush rice terraces, and vibrant cultural experiences.',
        highlights: [
          'Beachfront resort accommodation',
          'Temple hopping tours',
          'Rice terrace trekking',
          'Traditional dance performances',
          'Balinese cooking workshop',
          'Spa treatments included'
        ],
        itinerary: [
          { day: 1, title: 'Arrival in Bali', description: 'Airport transfer, hotel check-in, welcome ceremony' },
          { day: 2, title: 'Ubud Cultural Tour', description: 'Visit temples, art villages, and rice terraces' },
          { day: 3, title: 'Adventure Day', description: 'White water rafting and jungle trekking' },
          { day: 4, title: 'Beach Relaxation', description: 'Free day at beautiful beaches' },
          { day: 5, title: 'Cooking & Spa', description: 'Cooking class and traditional spa treatments' }
        ],
        included: ['Accommodation', 'Most meals', 'Tours', 'Activities', 'Spa'],
        notIncluded: ['International flights', 'Some meals', 'Personal expenses'],
        featured: false,
        category: 'Adventure',
        status: 'active'
      },
      {
        id: 3,
        name: 'Swiss Alps Escape',
        location: 'Swiss Alps, Switzerland',
        price: 1599,
        originalPrice: 1999,
        duration: '8 Days / 7 Nights',
        rating: 4.9,
        reviews: 87,
        maxPeople: 6,
        image: '/gallery/image3.jpg',
        images: ['/gallery/image3.jpg', '/gallery/image1.jpeg', '/gallery/image2.jpg'],
        description: 'Adventure awaits in the majestic Swiss Alps with pristine mountain lakes, snow-capped peaks, and charming alpine villages.',
        highlights: [
          'Mountain lodge accommodation',
          'Cable car rides',
          'Alpine hiking trails',
          'Lake boat cruises',
          'Traditional Swiss cuisine',
          'Photography workshops'
        ],
        itinerary: [
          { day: 1, title: 'Arrival in Zurich', description: 'Transfer to alpine resort, welcome dinner' },
          { day: 2, title: 'Jungfraujoch', description: 'Top of Europe excursion' },
          { day: 3, title: 'Lake Cruise', description: 'Scenic boat ride and village visits' },
          { day: 4, title: 'Hiking Day', description: 'Alpine trails and mountain photography' },
          { day: 5, title: 'Adventure Activities', description: 'Paragliding and mountain biking options' }
        ],
        included: ['Accommodation', 'Meals', 'Cable cars', 'Tours', 'Activities'],
        notIncluded: ['International flights', 'Travel insurance', 'Personal gear'],
        featured: true,
        category: 'Adventure',
        status: 'active'
      }
    ]
  });

  const updateSiteContent = (section, data) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const addPackage = (packageData) => {
    const newPackage = {
      ...packageData,
      id: Date.now(),
      status: 'active'
    };
    setSiteContent(prev => ({
      ...prev,
      packages: [...prev.packages, newPackage]
    }));
  };

  const updatePackage = (id, packageData) => {
    setSiteContent(prev => ({
      ...prev,
      packages: prev.packages.map(pkg => 
        pkg.id === id ? { ...pkg, ...packageData } : pkg
      )
    }));
  };

  const deletePackage = (id) => {
    setSiteContent(prev => ({
      ...prev,
      packages: prev.packages.filter(pkg => pkg.id !== id)
    }));
  };

  const getPackageById = (id) => {
    return siteContent.packages.find(pkg => pkg.id === parseInt(id));
  };

  const getFeaturedPackages = () => {
    return siteContent.packages.filter(pkg => pkg.featured && pkg.status === 'active');
  };

  const searchPackages = (query) => {
    const lowerQuery = query.toLowerCase();
    return siteContent.packages.filter(pkg => 
      pkg.status === 'active' && (
        pkg.name.toLowerCase().includes(lowerQuery) ||
        pkg.location.toLowerCase().includes(lowerQuery) ||
        pkg.description.toLowerCase().includes(lowerQuery)
      )
    );
  };

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('dreamHolidaysContent');
    if (savedContent) {
      try {
        setSiteContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dreamHolidaysContent', JSON.stringify(siteContent));
  }, [siteContent]);

  const value = {
    siteContent,
    updateSiteContent,
    addPackage,
    updatePackage,
    deletePackage,
    getPackageById,
    getFeaturedPackages,
    searchPackages
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
