import Image from 'next/image';
import Link from 'next/link';
import EnhancedSearchDropdown from './EnhancedSearchDropdown';

const PackageCard = ({ package: pkg, onEdit }) => {
  console.log({pkg});
  
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-2">
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">
            {pkg.duration}
          </span>
          {pkg.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">
              Featured
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
      
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
            {pkg.name}
          </h3>
          <div className="flex items-center text-yellow-400 ml-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < pkg.rating ? 'fill-current' : 'fill-gray-300'}`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
          {pkg.description}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{pkg.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            {pkg.maxPeople} people max
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600">₹{pkg.price.toLocaleString('en-IN')}</span>
            <span className="text-xs sm:text-sm text-gray-500">per person</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(pkg)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Edit
              </button>
            )}
            <Link
              href={`/packages/${pkg.id}`}
              className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg text-center text-sm sm:text-base"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedPackages = ({ packages = [], isAdmin = false, onEdit }) => {
  const defaultPackages = [
    {
      id: 1,
      name: 'Santorini Paradise',
      image: '/gallery/image1.jpeg',
      description: 'Experience the breathtaking beauty of Santorini with its iconic white buildings, blue domes, and stunning sunsets over the Aegean Sea.',
      price: 109900,
      duration: '7 Days',
      rating: 5,
      reviews: 124,
      location: 'Santorini, Greece',
      maxPeople: 8,
      featured: true
    },
    {
      id: 2,
      name: 'Bali Adventure',
      image: '/gallery/image2.jpg',
      description: 'Discover the magic of Bali with its beautiful beaches, ancient temples, lush rice terraces, and vibrant cultural experiences.',
      price: 75900,
      duration: '10 Days',
      rating: 4,
      reviews: 98,
      location: 'Bali, Indonesia',
      maxPeople: 12,
      featured: false
    },
    {
      id: 3,
      name: 'Swiss Alps Escape',
      image: '/gallery/image3.jpg',
      description: 'Adventure awaits in the majestic Swiss Alps with pristine mountain lakes, snow-capped peaks, and charming alpine villages.',
      price: 134900,
      duration: '8 Days',
      rating: 5,
      reviews: 87,
      location: 'Swiss Alps',
      maxPeople: 6,
      featured: true
    }
  ];

  const displayPackages = packages.length > 0 ? packages : defaultPackages;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Component */}
        <div className="mb-16">
          <EnhancedSearchDropdown />
        </div>
        
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Featured Destinations
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover our handpicked selection of extraordinary travel experiences crafted to create memories that last a lifetime
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayPackages.map((pkg) => (
            <PackageCard 
              key={pkg.id} 
              package={pkg} 
              onEdit={isAdmin ? onEdit : null}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/packages"
            className="inline-flex items-center bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg text-base sm:text-lg"
          >
            Explore All Destinations
            <svg className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
