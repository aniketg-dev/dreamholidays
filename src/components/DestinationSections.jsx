import Image from 'next/image';
import Link from 'next/link';
import { useContent } from '../context/ContentContext';

const DestinationCard = ({ destination }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {destination.duration}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{destination.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < destination.rating ? 'fill-current' : 'fill-gray-300'}`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="ml-2 text-gray-600 text-sm">({destination.reviews} reviews)</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">${destination.price}</span>
            <span className="text-gray-500 text-sm">/person</span>
          </div>
          <Link
            href={`/packages/${destination.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Santorini Paradise',
      image: '/destination1.jpg',
      description: 'Experience the breathtaking beauty of Santorini with its iconic white buildings, blue domes, and stunning sunsets over the Aegean Sea.',
      price: 1299,
      duration: '7 Days',
      rating: 5,
      reviews: 124
    },
    {
      id: 2,
      name: 'Bali Adventure',
      image: '/destination2.jpg',
      description: 'Discover the magic of Bali with its beautiful beaches, ancient temples, lush rice terraces, and vibrant cultural experiences.',
      price: 899,
      duration: '10 Days',
      rating: 4,
      reviews: 98
    },
    {
      id: 3,
      name: 'Swiss Alps Escape',
      image: '/destination3.jpg',
      description: 'Adventure awaits in the majestic Swiss Alps with pristine mountain lakes, snow-capped peaks, and charming alpine villages.',
      price: 1599,
      duration: '8 Days',
      rating: 5,
      reviews: 87
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved travel packages and create unforgettable memories with Dream Holidays
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/destinations"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            View All Destinations
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const { siteContent } = useContent();
  
  const features = siteContent?.whyChoose?.features || [
    {
      icon: '🆘',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you throughout your journey'
    },
    {
      icon: '💰',
      title: 'Best Price Guarantee',
      description: 'We offer the most competitive prices with no hidden fees'
    },
    {
      icon: '🎯',
      title: 'Expert Planning',
      description: 'Our travel experts create personalized itineraries just for you'
    },
    {
      icon: '❤️',
      title: 'Memorable Experiences',
      description: 'Creating unforgettable moments that last a lifetime'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {siteContent?.whyChoose?.title || 'Why Choose Dream Holidays?'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {siteContent?.whyChoose?.subtitle || "We're committed to making your travel dreams come true with exceptional service and unforgettable experiences"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { PopularDestinations, WhyChooseUs };
