"use client";

import Image from 'next/image';
import { useContent } from '../context/ContentContext';

const MasonryGallery = () => {
  const { siteContent } = useContent();
  
  if (!siteContent.gallery?.visible) {
    return null;
  }

  const galleryImages = siteContent.gallery?.images || [];

  // Define height variations for masonry effect
  const heightVariations = ['h-64', 'h-80', 'h-72', 'h-96', 'h-60', 'h-84'];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {siteContent.gallery?.title || 'Explore Amazing Destinations'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {siteContent.gallery?.subtitle || 'Discover breathtaking locations around the world, each offering unique experiences and unforgettable memories'}
          </p>
        </div>

        {/* Masonry Grid */}
        {galleryImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`${heightVariations[index % heightVariations.length]} relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer break-inside-avoid`}
              >
                {/* Background Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Alt text as caption */}
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-blue-100 transition-colors duration-300">
                      {image.alt}
                    </h3>
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Gallery Images</h3>
            <p className="text-gray-500">Gallery images will appear here once added through the admin panel.</p>
          </div>
        )}

        {/* Bottom CTA */}
        {galleryImages.length > 0 && (
          <div className="text-center mt-16">
            <p className="text-lg text-gray-600 mb-6">Ready to explore these amazing destinations?</p>
            <button className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              View All Destinations
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MasonryGallery;
