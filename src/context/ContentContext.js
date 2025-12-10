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
    heroSlides: [
      {
        id: 1,
        title: 'Discover Paradise',
        subtitle: 'Make Your Travel Dreams Come True',
        description: 'Experience breathtaking destinations with our carefully crafted travel packages',
        backgroundImage: '/hero/destination5.jpg',
        gradient: 'from-black/80 to-blue-900/60',
        visible: true,
        order: 1
      },
      {
        id: 2,
        title: 'Tropical Escape',
        subtitle: 'Bali, Indonesia',
        description: 'Immerse yourself in rich culture and stunning beaches',
        backgroundImage: '/hero/destination6.jpg',
        gradient: 'from-black/80 to-green-900/60',
        visible: true,
        order: 2
      },
      {
        id: 3,
        title: 'Alpine Adventure',
        subtitle: 'Swiss Alps',
        description: 'Conquer majestic peaks and pristine mountain landscapes',
        backgroundImage: '/hero/destination7.jpg',
        gradient: 'from-black/80 to-gray-900/60',
        visible: true,
        order: 3
      }
    ],
    company: {
      name: 'Charika Tours and Travels',
      email: 'charikaworld8@gmail.com',
      phone: '+91 86552 04900',
      secondaryPhone: '+91 86552 04900',
      address: 'near Best staff quarters, Best Colony, Amrut Nagar, Ghatkopar West, Mumbai, Maharashtra 400086',
      visible: true
    },
    stats: {
      happyCustomers: 10000,
      destinationsServed: 150,
      yearsExperience: 15,
      toursCompleted: 5000,
      visible: true
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Real experiences from real travelers',
      reviews: [
        {
          id: 1,
          name: 'Sarah Johnson',
          location: 'New York, USA',
          rating: 5,
          comment: 'Absolutely incredible experience! The attention to detail and personalized service made our honeymoon perfect.',
          image: '/testimonials/test1.jpeg'
        },
        {
          id: 2,
          name: 'Michael Chen',
          location: 'Toronto, Canada',
          rating: 5,
          comment: 'Professional service and amazing destinations. Highly recommend Charika Tours and Travels for your next adventure!',
          image: '/testimonials/test2.jpg'
        }
      ],
      visible: true
    },
    gallery: {
      title: 'Explore Amazing Destinations',
      subtitle: 'Discover breathtaking places around the world',
      images: [
        { id: 1, src: '/gallery/image1.jpeg', alt: 'Beautiful destination 1' },
        { id: 2, src: '/gallery/image2.jpg', alt: 'Beautiful destination 2' },
        { id: 3, src: '/gallery/image3.jpg', alt: 'Beautiful destination 3' },
        { id: 4, src: '/gallery/image4.jpg', alt: 'Beautiful destination 4' },
        { id: 5, src: '/gallery/image5.jpg', alt: 'Beautiful destination 5' }
      ],
      visible: true
    },
    whyChoose: {
      title: 'Why Choose Charika Tours and Travels?',
      subtitle: 'Your trusted travel partner',
      features: [
        {
          id: 1,
          title: 'Expert Planning',
          description: 'Our experienced team crafts perfect itineraries',
          icon: '🎯'
        },
        {
          id: 2,
          title: '24/7 Support',
          description: 'Round-the-clock assistance during your travels',
          icon: '🆘'
        },
        {
          id: 3,
          title: 'Best Prices',
          description: 'Competitive rates with no hidden fees',
          icon: '💰'
        },
        {
          id: 4,
          title: 'Local Expertise',
          description: 'Deep knowledge of destinations worldwide',
          icon: '🌍'
        }
      ],
      visible: true
    },
    contact: {
      title: 'Plan Your Dream Trip',
      subtitle: 'Get in touch with our travel experts',
      visible: true
    },
    social: {
      title: 'Follow Our Journey',
      subtitle: 'Stay connected for travel inspiration',
      platforms: [
        { name: 'Facebook', url: '#', icon: 'facebook' },
        { name: 'Instagram', url: '#', icon: 'instagram' },
        { name: 'Twitter', url: '#', icon: 'twitter' },
        { name: 'YouTube', url: '#', icon: 'youtube' }
      ],
      posts: {
        instagram: [
          {
            id: 1,
            platform: 'instagram',
            author: '@dreamholidays',
            time: '2 hours ago',
            image: '/gallery/image1.jpeg',
            caption: 'Paradise found! 🏝️ This stunning beach in Maldives is calling your name. Who\'s ready for crystal clear waters and white sandy beaches?',
            likes: 1247,
            comments: 89
          }
        ],
        facebook: [
          {
            id: 2,
            platform: 'facebook',
            author: 'Charika Tours and Travels',
            time: '4 hours ago',
            content: 'Just helped the Johnson family plan their dream European vacation! 🇪🇺 From romantic Paris evenings to the canals of Venice, every moment was perfectly crafted. Ready to plan your next adventure?',
            likes: 234,
            comments: 18,
            shares: 12
          }
        ],
        twitter: [
          {
            id: 3,
            platform: 'twitter',
            author: '@dreamholidays',
            time: '30 minutes ago',
            content: 'Flash Sale Alert! 🚨 50% off on Bali packages for the next 24 hours only! Limited spots available. Book now and thank us later! #TravelDeals #Bali #DreamHolidays',
            likes: 456,
            retweets: 123,
            comments: 67
          }
        ]
      },
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

  const togglePackageStatus = (id) => {
    setSiteContent(prev => ({
      ...prev,
      packages: prev.packages.map(pkg => 
        pkg.id === id ? { 
          ...pkg, 
          status: pkg.status === 'active' ? 'inactive' : 'active' 
        } : pkg
      )
    }));
  };

  const togglePackageFeatured = (id) => {
    setSiteContent(prev => ({
      ...prev,
      packages: prev.packages.map(pkg => 
        pkg.id === id ? { 
          ...pkg, 
          featured: !pkg.featured 
        } : pkg
      )
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

  // Hero Slides Management Functions
  const addHeroSlide = (slideData) => {
    const newSlide = {
      ...slideData,
      id: Date.now(),
      order: siteContent.heroSlides.length + 1,
      visible: true
    };
    setSiteContent(prev => ({
      ...prev,
      heroSlides: [...prev.heroSlides, newSlide]
    }));
  };

  const updateHeroSlide = (id, slideData) => {
    setSiteContent(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map(slide => 
        slide.id === id ? { ...slide, ...slideData } : slide
      )
    }));
  };

  const deleteHeroSlide = (id) => {
    setSiteContent(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.filter(slide => slide.id !== id)
    }));
  };

  const toggleHeroSlideVisibility = (id) => {
    setSiteContent(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map(slide => 
        slide.id === id ? { ...slide, visible: !slide.visible } : slide
      )
    }));
  };

  const getVisibleHeroSlides = () => {
    return siteContent.heroSlides
      .filter(slide => slide.visible)
      .sort((a, b) => a.order - b.order);
  };

  const reorderHeroSlides = (slides) => {
    setSiteContent(prev => ({
      ...prev,
      heroSlides: slides
    }));
  };

  // Section Visibility Management
  const toggleSectionVisibility = (sectionName) => {
    setSiteContent(prev => ({
      ...prev,
      [sectionName]: {
        ...prev[sectionName],
        visible: !prev[sectionName].visible
      }
    }));
  };

  // Content Item Management
  const addTestimonial = (testimonialData) => {
    const newTestimonial = {
      ...testimonialData,
      id: Date.now()
    };
    setSiteContent(prev => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        reviews: [...prev.testimonials.reviews, newTestimonial]
      }
    }));
  };

  const updateTestimonial = (id, testimonialData) => {
    setSiteContent(prev => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        reviews: prev.testimonials.reviews.map(review =>
          review.id === id ? { ...review, ...testimonialData } : review
        )
      }
    }));
  };

  const deleteTestimonial = (id) => {
    setSiteContent(prev => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        reviews: prev.testimonials.reviews.filter(review => review.id !== id)
      }
    }));
  };

  // Gallery Management
  const addGalleryImage = (imageData) => {
    const newImage = {
      ...imageData,
      id: Date.now()
    };
    setSiteContent(prev => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images: [...prev.gallery.images, newImage]
      }
    }));
  };

  const updateGalleryImage = (id, imageData) => {
    setSiteContent(prev => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images: prev.gallery.images.map(image =>
          image.id === id ? { ...image, ...imageData } : image
        )
      }
    }));
  };

  const deleteGalleryImage = (id) => {
    setSiteContent(prev => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        images: prev.gallery.images.filter(image => image.id !== id)
      }
    }));
  };

  // Why Choose Us Management
  const addWhyChooseFeature = (featureData) => {
    const newFeature = {
      ...featureData,
      id: Date.now()
    };
    setSiteContent(prev => ({
      ...prev,
      whyChoose: {
        ...prev.whyChoose,
        features: [...prev.whyChoose.features, newFeature]
      }
    }));
  };

  const updateWhyChooseFeature = (id, featureData) => {
    setSiteContent(prev => ({
      ...prev,
      whyChoose: {
        ...prev.whyChoose,
        features: prev.whyChoose.features.map(feature =>
          feature.id === id ? { ...feature, ...featureData } : feature
        )
      }
    }));
  };

  const deleteWhyChooseFeature = (id) => {
    setSiteContent(prev => ({
      ...prev,
      whyChoose: {
        ...prev.whyChoose,
        features: prev.whyChoose.features.filter(feature => feature.id !== id)
      }
    }));
  };

  // Social Media Posts Management
  const addSocialPost = (platform, postData) => {
    const newPost = {
      ...postData,
      id: Date.now(),
      platform: platform,
      time: 'Just now'
    };
    setSiteContent(prev => ({
      ...prev,
      social: {
        ...prev.social,
        posts: {
          ...(prev.social.posts || {}),
          [platform]: [...((prev.social.posts && prev.social.posts[platform]) || []), newPost]
        }
      }
    }));
  };

  const updateSocialPost = (platform, id, postData) => {
    setSiteContent(prev => ({
      ...prev,
      social: {
        ...prev.social,
        posts: {
          ...(prev.social.posts || {}),
          [platform]: ((prev.social.posts && prev.social.posts[platform]) || []).map(post =>
            post.id === id ? { ...post, ...postData } : post
          )
        }
      }
    }));
  };

  const deleteSocialPost = (platform, id) => {
    setSiteContent(prev => ({
      ...prev,
      social: {
        ...prev.social,
        posts: {
          ...(prev.social.posts || {}),
          [platform]: ((prev.social.posts && prev.social.posts[platform]) || []).filter(post => post.id !== id)
        }
      }
    }));
  };

  // Social Media Management
  const updateSocialPlatform = (index, platformData) => {
    setSiteContent(prev => ({
      ...prev,
      social: {
        ...prev.social,
        platforms: prev.social.platforms.map((platform, i) =>
          i === index ? { ...platform, ...platformData } : platform
        )
      }
    }));
  };

  // Load content from config file on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            const configData = result.data;
            // Ensure social posts structure exists
            if (configData.social && !configData.social.posts) {
              configData.social.posts = {
                instagram: [],
                facebook: [],
                twitter: []
              };
            }
            setSiteContent(configData);
          }
        }
      } catch (error) {
        console.error('Error loading config:', error);
        // Fallback to localStorage if API fails
        const savedContent = localStorage.getItem('dreamHolidaysContent');
        if (savedContent) {
          try {
            const parsedContent = JSON.parse(savedContent);
            // Ensure social posts structure exists
            if (parsedContent.social && !parsedContent.social.posts) {
              parsedContent.social.posts = {
                instagram: [],
                facebook: [],
                twitter: []
              };
            }
            setSiteContent(parsedContent);
          } catch (error) {
            console.error('Error loading saved content:', error);
          }
        }
      }
    };
    
    loadConfig();
  }, []);

  // Save content to config file whenever it changes (with debouncing)
  useEffect(() => {
    const saveConfig = async () => {
      try {
        await fetch('/api/config', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: siteContent }),
        });
        // Also save to localStorage as backup
        localStorage.setItem('dreamHolidaysContent', JSON.stringify(siteContent));
      } catch (error) {
        console.error('Error saving config:', error);
        // Fallback to localStorage if API fails
        localStorage.setItem('dreamHolidaysContent', JSON.stringify(siteContent));
      }
    };

    // Debounce the save operation to avoid too frequent API calls
    const timeoutId = setTimeout(saveConfig, 1000);
    return () => clearTimeout(timeoutId);
  }, [siteContent]);

  const value = {
    siteContent,
    updateSiteContent,
    addPackage,
    updatePackage,
    deletePackage,
    togglePackageStatus,
    togglePackageFeatured,
    getPackageById,
    getFeaturedPackages,
    searchPackages,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    toggleHeroSlideVisibility,
    getVisibleHeroSlides,
    reorderHeroSlides,
    toggleSectionVisibility,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    addWhyChooseFeature,
    updateWhyChooseFeature,
    deleteWhyChooseFeature,
    addSocialPost,
    updateSocialPost,
    deleteSocialPost,
    updateSocialPlatform
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
