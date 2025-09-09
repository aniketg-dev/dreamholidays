import Image from 'next/image';

const DestinationGallery = () => {
  const destinations = [
    {
      id: 1,
      name: 'Santorini',
      country: 'Greece',
      image: '/gallery/image1.jpeg',
      tagline: 'Where Blue Meets White',
      size: 'large',
      position: 'col-span-2 row-span-2'
    },
    {
      id: 2,
      name: 'Bali',
      country: 'Indonesia',
      image: '/gallery/image2.jpg',
      tagline: 'Tropical Paradise',
      size: 'medium',
      position: 'col-span-1 row-span-2'
    },
    {
      id: 3,
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: '/destination3.jpg',
      tagline: 'Mountain Majesty',
      size: 'medium',
      position: 'col-span-1 row-span-1'
    },
    {
      id: 4,
      name: 'Maldives',
      country: 'Maldives',
      image: '/gallery/image3.jpg', // Using placeholder
      tagline: 'Crystal Clear Waters',
      size: 'small',
      position: 'col-span-1 row-span-1'
    },
    {
      id: 5,
      name: 'Paris',
      country: 'France',
      image: '/gallery/image4.jpg', // Using placeholder
      tagline: 'City of Love',
      size: 'small',
      position: 'col-span-1 row-span-1'
    },
    {
      id: 6,
      name: 'Tokyo',
      country: 'Japan',
      image: '/gallery/image5.jpg', // Using placeholder
      tagline: 'Modern Traditions',
      size: 'medium',
      position: 'col-span-2 row-span-1'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Amazing Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover breathtaking locations around the world, each offering unique experiences and unforgettable memories
          </p>
        </div>

        {/* Gallery Grid */}
        {/* Mobile: Single column, Tablet: 2 columns, Desktop: Complex grid */}
        <div className="max-w-6xl mx-auto">
          {/* Mobile Layout */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-64"
              >
                {/* Background Image */}
                <Image
                  src={destination.image}
                  alt={`${destination.name}, ${destination.country}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Tagline */}
                    <p className="text-sm font-medium text-blue-200 mb-1 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {destination.tagline}
                    </p>
                    
                    {/* Place Name */}
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-100 transition-colors duration-300">
                      {destination.name}
                    </h3>
                    
                    {/* Country */}
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      {destination.country}
                    </p>
                  </div>

                  {/* Hover Effect - Explore Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="w-8 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-80"
              >
                {/* Background Image */}
                <Image
                  src={destination.image}
                  alt={`${destination.name}, ${destination.country}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Tagline */}
                    <p className="text-sm font-medium text-blue-200 mb-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {destination.tagline}
                    </p>
                    
                    {/* Place Name */}
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-100 transition-colors duration-300">
                      {destination.name}
                    </h3>
                    
                    {/* Country */}
                    <p className="text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                      {destination.country}
                    </p>
                  </div>

                  {/* Hover Effect - Explore Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="w-10 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout - Complex Grid */}
          <div className="hidden lg:grid grid-cols-4 grid-rows-3 gap-4 h-[800px]">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className={`${destination.position} relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer`}
              >
                {/* Background Image */}
                <Image
                  src={destination.image}
                  alt={`${destination.name}, ${destination.country}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Tagline */}
                    <p className="text-sm md:text-base font-medium text-blue-200 mb-2 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {destination.tagline}
                    </p>
                    
                    {/* Place Name */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-1 group-hover:text-blue-100 transition-colors duration-300">
                      {destination.name}
                    </h3>
                    
                    {/* Country */}
                    <p className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                      {destination.country}
                    </p>
                  </div>

                  {/* Hover Effect - Explore Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="w-12 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-full"></div>
                  </div>
                </div>

                {/* Floating Stats Badge (for larger tiles) */}
                {destination.size === 'large' && (
                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <div className="text-white text-center">
                      <div className="text-lg font-bold">5+</div>
                      <div className="text-xs">Packages</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-lg text-gray-600 mb-6">Ready to explore these amazing destinations?</p>
          <button className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
            Discover All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default DestinationGallery;