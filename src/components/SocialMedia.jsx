"use client";

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faFacebook, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faHeart, 
  faComment, 
  faShare, 
  faRetweet,
  faThumbsUp,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const SocialMedia = () => {
  const [activeTab, setActiveTab] = useState('instagram');
  const carouselRef = useRef(null);

  // Mock social media posts data
  const socialPosts = {
    instagram: [
      {
        id: 1,
        platform: 'instagram',
        author: '@dreamholidays',
        time: '2 hours ago',
        image: '/destination1.jpg',
        caption: 'Paradise found! 🏝️ This stunning beach in Maldives is calling your name. Who\'s ready for crystal clear waters and white sandy beaches?',
        likes: 1247,
        comments: 89
      },
      {
        id: 2,
        platform: 'instagram',
        author: '@dreamholidays',
        time: '1 day ago',
        image: '/destination2.jpg',
        caption: 'Mountain adventures await! 🏔️ Experience the breathtaking views of Swiss Alps with our exclusive packages.',
        likes: 892,
        comments: 45
      },
      {
        id: 3,
        platform: 'instagram',
        author: '@dreamholidays',
        time: '3 days ago',
        image: '/destination3.jpg',
        caption: 'City lights and urban delights ✨ Discover the magic of Tokyo with our guided tours and local experiences.',
        likes: 1567,
        comments: 123
      }
    ],
    facebook: [
      {
        id: 4,
        platform: 'facebook',
        author: 'Dream Holidays',
        time: '4 hours ago',
        content: 'Just helped the Johnson family plan their dream European vacation! 🇪🇺 From romantic Paris evenings to the canals of Venice, every moment was perfectly crafted. Ready to plan your next adventure?',
        likes: 234,
        comments: 18,
        shares: 12
      },
      {
        id: 5,
        platform: 'facebook',
        author: 'Dream Holidays',
        time: '2 days ago',
        content: 'Travel Tip Tuesday! 💡 Did you know that booking flights on Tuesday can save you up to 20%? Our travel experts are here to help you find the best deals for your dream destination.',
        likes: 189,
        comments: 34,
        shares: 8
      }
    ],
    twitter: [
      {
        id: 6,
        platform: 'twitter',
        author: '@dreamholidays',
        time: '30 minutes ago',
        content: 'Flash Sale Alert! 🚨 50% off on Bali packages for the next 24 hours only! Limited spots available. Book now and thank us later! #TravelDeals #Bali #DreamHolidays',
        likes: 456,
        retweets: 123,
        comments: 67
      },
      {
        id: 7,
        platform: 'twitter',
        author: '@dreamholidays',
        time: '6 hours ago',
        content: 'Customer spotlight: "Dream Holidays made our honeymoon absolutely perfect! Every detail was taken care of." - Sarah & Mike ❤️ #CustomerLove #Honeymoon',
        likes: 289,
        retweets: 45,
        comments: 23
      }
    ]
  };

  const tabButtons = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />,
      color: 'text-pink-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />,
      color: 'text-blue-400'
    }
  ];

  // Carousel navigation functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const renderInstagramPost = (post) => (
    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 w-80">
      <div className="flex items-center p-4 border-b">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">DH</span>
        </div>
        <div className="ml-3">
          <p className="font-semibold text-gray-900">{post.author}</p>
          <p className="text-gray-500 text-sm">{post.time}</p>
        </div>
      </div>
      {post.image && (
        <img src={post.image} alt="Post" className="w-full h-64 object-cover" />
      )}
      <div className="p-4">
        <p className="text-gray-800 mb-3">{post.caption}</p>
        <div className="flex items-center space-x-4 text-gray-500">
          <span className="flex items-center">
            <FontAwesomeIcon icon={faHeart} className="w-5 h-5 mr-1 text-red-500" />
            {post.likes}
          </span>
          <span className="flex items-center">
            <FontAwesomeIcon icon={faComment} className="w-5 h-5 mr-1" />
            {post.comments}
          </span>
        </div>
      </div>
    </div>
  );

  const renderFacebookPost = (post) => (
    <div key={post.id} className="bg-white rounded-lg shadow-md p-6 flex-shrink-0 w-80">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">DH</span>
        </div>
        <div className="ml-3">
          <p className="font-semibold text-gray-900">{post.author}</p>
          <p className="text-gray-500 text-sm">{post.time}</p>
        </div>
      </div>
      <p className="text-gray-800 mb-4">{post.content}</p>
      <div className="flex items-center space-x-6 text-gray-500 pt-3 border-t">
        <span className="flex items-center">
          <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5 mr-1 text-blue-600" />
          {post.likes}
        </span>
        <span className="flex items-center">
          <FontAwesomeIcon icon={faComment} className="w-5 h-5 mr-1" />
          {post.comments}
        </span>
        <span className="flex items-center">
          <FontAwesomeIcon icon={faShare} className="w-5 h-5 mr-1" />
          {post.shares}
        </span>
      </div>
    </div>
  );

  const renderTwitterPost = (post) => (
    <div key={post.id} className="bg-white rounded-lg shadow-md p-6 flex-shrink-0 w-80">
      <div className="flex items-start">
        <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">DH</span>
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <p className="font-semibold text-gray-900">{post.author}</p>
            <span className="text-gray-500 text-sm ml-2">{post.time}</span>
          </div>
          <p className="text-gray-800 mt-2">{post.content}</p>
          <div className="flex items-center space-x-6 text-gray-500 mt-4">
            <span className="flex items-center">
              <FontAwesomeIcon icon={faComment} className="w-5 h-5 mr-1" />
              {post.comments}
            </span>
            <span className="flex items-center">
              <FontAwesomeIcon icon={faRetweet} className="w-5 h-5 mr-1" />
              {post.retweets}
            </span>
            <span className="flex items-center">
              <FontAwesomeIcon icon={faHeart} className="w-5 h-5 mr-1 text-red-500" />
              {post.likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Follow Our <span className="text-blue-600">Travel Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay connected with our latest travel adventures, destination highlights, and exclusive offers 
            through our social media posts.
          </p>
        </div>

        {/* Social Media Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-full p-2 shadow-lg">
            {tabButtons.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white shadow-md`
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className={`mr-2 ${activeTab === tab.id ? 'text-white' : tab.color}`}>
                  {tab.icon}
                </span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Social Media Posts Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6 text-gray-600" />
          </button>

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {activeTab === 'instagram' && socialPosts.instagram.map(renderInstagramPost)}
            {activeTab === 'facebook' && socialPosts.facebook.map(renderFacebookPost)}
            {activeTab === 'twitter' && socialPosts.twitter.map(renderTwitterPost)}
          </div>
        </div>

        {/* Follow More Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Want to See More?</h3>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              Follow us on your favorite social platforms to never miss our latest travel content, 
              tips, and exclusive deals!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.instagram.com/officialdreamholidays"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Follow on Instagram
              </a>
              <a
                href="https://www.facebook.com/dreamholidays77"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Follow on Facebook
              </a>
              <a
                href="https://twitter.com/dreamholidays"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Follow on Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
