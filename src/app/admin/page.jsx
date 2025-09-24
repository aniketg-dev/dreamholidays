"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useContent, ContentProvider } from '../../context/ContentContext';
import './admin-styles.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    siteContent, 
    addPackage, 
    updatePackage, 
    deletePackage, 
    togglePackageStatus,
    togglePackageFeatured,
    updateSiteContent,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    toggleHeroSlideVisibility,
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
  } = useContent();
  const [editingPackage, setEditingPackage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [showSlideForm, setShowSlideForm] = useState(false);
  const [showPackageForm, setShowPackageForm] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Content Overview', icon: '📊' },
    { id: 'hero', label: 'Hero Section', icon: '🏠' },
    { id: 'packages', label: 'Packages', icon: '📦' },
    { id: 'stats', label: 'Statistics', icon: '📊' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'whyChoose', label: 'Why Choose Us', icon: '⭐' },
    { id: 'contact', label: 'Contact Info', icon: '📞' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'company', label: 'Company Info', icon: '🏢' }
  ];

  // Hero Slides Management
  const HeroSlidesManager = () => {
    const [draggedItem, setDraggedItem] = useState(null);

    const handleImageUpload = async (file, slideId) => {
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', 'hero/uploads');

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const result = await response.json();
        
        if (slideId) {
          updateHeroSlide(slideId, { backgroundImage: result.url });
        }
        
        return result.url;
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload image');
        return null;
      }
    };

    const SlideForm = ({ slide, onSave, onCancel }) => {
      const [formData, setFormData] = useState(slide || {
        title: '',
        subtitle: '',
        description: '',
        backgroundImage: '',
        gradient: 'from-black/80 to-blue-900/60',
        visible: true
      });
      const [imageFile, setImageFile] = useState(null);
      const [previewUrl, setPreviewUrl] = useState(formData.backgroundImage);

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImageFile(file);
          setPreviewUrl(URL.createObjectURL(file));
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        let imageUrl = formData.backgroundImage;
        if (imageFile) {
          imageUrl = await handleImageUpload(imageFile);
          if (!imageUrl) return;
        }

        const slideData = {
          ...formData,
          backgroundImage: imageUrl
        };

        if (slide) {
          updateHeroSlide(slide.id, slideData);
        } else {
          addHeroSlide(slideData);
        }
        
        onSave();
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 slide-form-overlay flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {slide ? 'Edit Slide' : 'Add New Slide'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 form-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Background Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
                {previewUrl && (
                  <div className="mt-2">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded"
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={formData.backgroundImage}
                  onChange={(e) => setFormData({...formData, backgroundImage: e.target.value})}
                  placeholder="Or enter image URL"
                  className="w-full border rounded-lg px-3 py-2 mt-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gradient Overlay</label>
                <select
                  value={formData.gradient}
                  onChange={(e) => setFormData({...formData, gradient: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="from-black/80 to-blue-900/60">Blue Gradient</option>
                  <option value="from-black/80 to-green-900/60">Green Gradient</option>
                  <option value="from-black/80 to-purple-900/60">Purple Gradient</option>
                  <option value="from-black/80 to-red-900/60">Red Gradient</option>
                  <option value="from-black/80 to-gray-900/60">Gray Gradient</option>
                  <option value="from-black/60 to-transparent">Simple Dark</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.visible}
                  onChange={(e) => setFormData({...formData, visible: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Show on website</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="btn-primary text-white px-6 py-2 rounded-lg"
                >
                  {slide ? 'Update Slide' : 'Add Slide'}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn-secondary text-white px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    const handleDragStart = (e, index) => {
      setDraggedItem(index);
      e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
      e.preventDefault();
      if (draggedItem === null) return;

      const slides = [...siteContent.heroSlides];
      const draggedSlide = slides[draggedItem];
      slides.splice(draggedItem, 1);
      slides.splice(dropIndex, 0, draggedSlide);

      // Update order property
      const reorderedSlides = slides.map((slide, index) => ({
        ...slide,
        order: index + 1
      }));

      reorderHeroSlides(reorderedSlides);
      setDraggedItem(null);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Hero Slides Management</h2>
          <button
            onClick={() => setShowSlideForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add New Slide
          </button>
        </div>

        <div className="grid gap-4">
          {siteContent.heroSlides?.map((slide, index) => (
            <div
              key={slide.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`hero-slide-card bg-white border rounded-lg p-4 cursor-move transition-shadow hover:shadow-md ${
                !slide.visible ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={slide.backgroundImage}
                    alt={slide.title}
                    className="w-24 h-16 object-cover rounded"
                    onError={(e) => {
                      e.target.src = '/hero/destination1.jpg';
                    }}
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{slide.title}</h3>
                  <p className="text-gray-600">{slide.subtitle}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{slide.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      slide.visible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {slide.visible ? 'Visible' : 'Hidden'}
                    </span>
                    <span className="text-xs text-gray-500">Order: {slide.order}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleHeroSlideVisibility(slide.id)}
                    className={`p-2 rounded ${
                      slide.visible ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}
                    title={slide.visible ? 'Hide slide' : 'Show slide'}
                  >
                    {slide.visible ? '👁️' : '🙈'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingSlide(slide);
                      setShowSlideForm(true);
                    }}
                    className="p-2 bg-blue-100 text-blue-700 rounded"
                    title="Edit slide"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this slide?')) {
                        deleteHeroSlide(slide.id);
                      }
                    }}
                    className="p-2 bg-red-100 text-red-700 rounded"
                    title="Delete slide"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {siteContent.heroSlides?.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-4">No hero slides yet</p>
            <button
              onClick={() => setShowSlideForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Create Your First Slide
            </button>
          </div>
        )}

        {showSlideForm && (
          <SlideForm
            slide={editingSlide}
            onSave={() => {
              setShowSlideForm(false);
              setEditingSlide(null);
              alert('Slide saved successfully!');
            }}
            onCancel={() => {
              setShowSlideForm(false);
              setEditingSlide(null);
            }}
          />
        )}
      </div>
    );
  };

  // Content Overview Dashboard
  const ContentOverview = () => {
    const getSectionStats = () => {
      return {
        heroSlides: {
          total: siteContent.heroSlides?.length || 0,
          visible: siteContent.heroSlides?.filter(slide => slide.visible).length || 0,
          section: 'heroSlides'
        },
        packages: {
          total: siteContent.packages?.length || 0,
          visible: siteContent.packages?.filter(pkg => pkg.status === 'active').length || 0,
          section: 'packages'
        },
        testimonials: {
          total: siteContent.testimonials?.reviews?.length || 0,
          visible: siteContent.testimonials?.visible ? siteContent.testimonials?.reviews?.length || 0 : 0,
          section: 'testimonials'
        },
        gallery: {
          total: siteContent.gallery?.images?.length || 0,
          visible: siteContent.gallery?.visible ? siteContent.gallery?.images?.length || 0 : 0,
          section: 'gallery'
        },
        whyChoose: {
          total: siteContent.whyChoose?.features?.length || 0,
          visible: siteContent.whyChoose?.visible ? siteContent.whyChoose?.features?.length || 0 : 0,
          section: 'whyChoose'
        },
        social: {
          total: siteContent.social?.platforms?.length || 0,
          visible: siteContent.social?.visible ? siteContent.social?.platforms?.length || 0 : 0,
          section: 'social'
        }
      };
    };

    const stats = getSectionStats();

    const SectionCard = ({ title, icon, sectionKey, stats, hasItems = true }) => (
      <div className="bg-white rounded-lg shadow-md p-6 border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSectionVisibility(sectionKey)}
              className={`px-3 py-1 text-sm rounded-full ${
                siteContent[sectionKey]?.visible 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {siteContent[sectionKey]?.visible ? 'Visible' : 'Hidden'}
            </button>
            <button
              onClick={() => setActiveTab(sectionKey === 'heroSlides' ? 'hero' : sectionKey)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
            >
              Edit
            </button>
          </div>
        </div>
        
        {hasItems && stats && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-gray-700">{stats.total}</div>
              <div className="text-gray-500">Total Items</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">{stats.visible}</div>
              <div className="text-gray-500">Visible</div>
            </div>
          </div>
        )}

        {!hasItems && (
          <div className="text-sm text-gray-500">
            Section configuration and settings
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Content Overview</h2>
          <div className="text-sm text-gray-500">
            Manage all website content and visibility
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SectionCard
            title="Hero Slides"
            icon="🏠"
            sectionKey="heroSlides"
            stats={stats.heroSlides}
          />
          
          <SectionCard
            title="Travel Packages"
            icon="📦"
            sectionKey="packages"
            stats={stats.packages}
          />
          
          <SectionCard
            title="Statistics"
            icon="📊"
            sectionKey="stats"
            hasItems={false}
          />
          
          <SectionCard
            title="Testimonials"
            icon="💬"
            sectionKey="testimonials"
            stats={stats.testimonials}
          />
          
          <SectionCard
            title="Gallery"
            icon="🖼️"
            sectionKey="gallery"
            stats={stats.gallery}
          />
          
          <SectionCard
            title="Why Choose Us"
            icon="⭐"
            sectionKey="whyChoose"
            stats={stats.whyChoose}
          />
          
          <SectionCard
            title="Contact Info"
            icon="📞"
            sectionKey="contact"
            hasItems={false}
          />
          
          <SectionCard
            title="Social Media"
            icon="📱"
            sectionKey="social"
            stats={stats.social}
          />
          
          <SectionCard
            title="Company Info"
            icon="🏢"
            sectionKey="company"
            hasItems={false}
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('hero')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Hero Slide
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Package
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Add Testimonial
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Add Gallery Image
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Statistics Form
  const StatsForm = () => {
    const [formData, setFormData] = useState(siteContent.stats);

    const handleSave = (e) => {
      e.preventDefault();
      updateSiteContent('stats', formData);
      alert('Statistics updated successfully!');
    };

    return (
      <form onSubmit={handleSave} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Statistics Settings</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Happy Customers</label>
            <input
              type="number"
              value={formData.happyCustomers}
              onChange={(e) => setFormData({...formData, happyCustomers: parseInt(e.target.value)})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Destinations Served</label>
            <input
              type="number"
              value={formData.destinationsServed}
              onChange={(e) => setFormData({...formData, destinationsServed: parseInt(e.target.value)})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Years Experience</label>
            <input
              type="number"
              value={formData.yearsExperience}
              onChange={(e) => setFormData({...formData, yearsExperience: parseInt(e.target.value)})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tours Completed</label>
            <input
              type="number"
              value={formData.toursCompleted}
              onChange={(e) => setFormData({...formData, toursCompleted: parseInt(e.target.value)})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.visible}
            onChange={(e) => setFormData({...formData, visible: e.target.checked})}
            className="mr-2"
          />
          <label className="text-sm font-medium">Show on website</label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    );
  };

  // Testimonials Form
  const TestimonialsForm = () => {
    const [formData, setFormData] = useState(siteContent.testimonials);
    const [editingReview, setEditingReview] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const handleSave = (e) => {
      e.preventDefault();
      updateSiteContent('testimonials', formData);
      alert('Testimonials updated successfully!');
    };

    const ReviewForm = ({ review, onSave, onCancel }) => {
      const [reviewData, setReviewData] = useState(review || {
        name: '',
        location: '',
        rating: 5,
        comment: '',
        image: ''
      });

      const handleSubmit = (e) => {
        e.preventDefault();
        if (review) {
          updateTestimonial(review.id, reviewData);
        } else {
          addTestimonial(reviewData);
        }
        onSave();
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              {review ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={reviewData.name}
                  onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  required
                  value={reviewData.location}
                  onChange={(e) => setReviewData({...reviewData, location: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <select
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({...reviewData, rating: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Comment</label>
                <textarea
                  required
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  value={reviewData.image}
                  onChange={(e) => setReviewData({...reviewData, image: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="/testimonials/test1.jpeg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  {review ? 'Update' : 'Add'} Testimonial
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Testimonials Management</h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Section Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Section Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.visible}
              onChange={(e) => setFormData({...formData, visible: e.target.checked})}
              className="mr-2"
            />
            <label className="text-sm font-medium">Show testimonials section on website</label>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Save Section Settings
          </button>
        </form>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Testimonials ({siteContent.testimonials?.reviews?.length || 0})</h3>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + Add Testimonial
            </button>
          </div>

          <div className="grid gap-4">
            {siteContent.testimonials?.reviews?.map((review) => (
              <div key={review.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={review.image || '/testimonials/test1.jpeg'}
                      alt={review.name}
                      className="w-16 h-16 object-cover rounded-full"
                      onError={(e) => {
                        e.target.src = '/testimonials/test1.jpeg';
                      }}
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-gray-600 text-sm">{review.location}</p>
                    <div className="flex items-center gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{review.comment}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingReview(review);
                        setShowReviewForm(true);
                      }}
                      className="p-2 bg-blue-100 text-blue-700 rounded"
                      title="Edit testimonial"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this testimonial?')) {
                          deleteTestimonial(review.id);
                        }
                      }}
                      className="p-2 bg-red-100 text-red-700 rounded"
                      title="Delete testimonial"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!siteContent.testimonials?.reviews || siteContent.testimonials.reviews.length === 0) && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-4">No testimonials yet</p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Add Your First Testimonial
              </button>
            </div>
          )}
        </div>

        {showReviewForm && (
          <ReviewForm
            review={editingReview}
            onSave={() => {
              setShowReviewForm(false);
              setEditingReview(null);
              alert('Testimonial saved successfully!');
            }}
            onCancel={() => {
              setShowReviewForm(false);
              setEditingReview(null);
            }}
          />
        )}
      </div>
    );

    return (
      <form onSubmit={handleSave} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Testimonials Settings</h2>
        
        <div>
          <label className="block text-sm font-medium mb-2">Section Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Section Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <button
              type="button"
              onClick={addReview}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add Review
            </button>
          </div>

          {(formData.reviews || []).map((review, index) => (
            <div key={review.id} className="border rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={review.name}
                    onChange={(e) => updateReview(index, 'name', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={review.location}
                    onChange={(e) => updateReview(index, 'location', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <select
                    value={review.rating}
                    onChange={(e) => updateReview(index, 'rating', parseInt(e.target.value))}
                    className="w-full border rounded px-2 py-1"
                  >
                    {[1,2,3,4,5].map(rating => (
                      <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    value={review.image}
                    onChange={(e) => updateReview(index, 'image', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    placeholder="/testimonials/test1.jpeg"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Comment</label>
                <textarea
                  value={review.comment}
                  onChange={(e) => updateReview(index, 'comment', e.target.value)}
                  className="w-full border rounded px-2 py-1 h-20"
                />
              </div>
              <button
                type="button"
                onClick={() => removeReview(index)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove Review
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.visible}
            onChange={(e) => setFormData({...formData, visible: e.target.checked})}
            className="mr-2"
          />
          <label className="text-sm font-medium">Show on website</label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    );
  };

  // Gallery Form
  const GalleryForm = () => {
    const [formData, setFormData] = useState(siteContent.gallery);
    const [editingImage, setEditingImage] = useState(null);
    const [showImageForm, setShowImageForm] = useState(false);

    const handleSave = (e) => {
      e.preventDefault();
      updateSiteContent('gallery', formData);
      alert('Gallery updated successfully!');
    };

    const ImageForm = ({ image, onSave, onCancel }) => {
      const [imageData, setImageData] = useState(image || {
        src: '',
        alt: ''
      });
      const [uploading, setUploading] = useState(false);
      const [uploadMethod, setUploadMethod] = useState('upload'); // 'upload' or 'url'

      const handleFileUpload = async (file) => {
        setUploading(true);
        try {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('folder', 'gallery/uploads');

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            setImageData({...imageData, src: data.url});
          } else {
            alert('Upload failed. Please try again.');
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Upload failed. Please try again.');
        } finally {
          setUploading(false);
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (image) {
          updateGalleryImage(image.id, imageData);
        } else {
          addGalleryImage(imageData);
        }
        onSave();
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              {image ? 'Edit Gallery Image' : 'Add New Gallery Image'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Upload Method</label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="upload"
                      checked={uploadMethod === 'upload'}
                      onChange={(e) => setUploadMethod(e.target.value)}
                      className="mr-2"
                    />
                    Upload File
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="url"
                      checked={uploadMethod === 'url'}
                      onChange={(e) => setUploadMethod(e.target.value)}
                      className="mr-2"
                    />
                    Image URL
                  </label>
                </div>
              </div>

              {uploadMethod === 'upload' ? (
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleFileUpload(file);
                      }
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                    disabled={uploading}
                  />
                  {uploading && (
                    <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="text"
                    required
                    value={imageData.src}
                    onChange={(e) => setImageData({...imageData, src: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="/gallery/image1.jpeg"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Alt Text (Description)</label>
                <input
                  type="text"
                  required
                  value={imageData.alt}
                  onChange={(e) => setImageData({...imageData, alt: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Beautiful destination 1"
                />
              </div>

              {imageData.src && (
                <div>
                  <label className="block text-sm font-medium mb-2">Preview</label>
                  <img
                    src={imageData.src}
                    alt={imageData.alt}
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.target.src = '/gallery/image1.jpeg';
                    }}
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading || !imageData.src}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {image ? 'Update' : 'Add'} Image
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Gallery Management</h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Section Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Section Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.visible}
              onChange={(e) => setFormData({...formData, visible: e.target.checked})}
              className="mr-2"
            />
            <label className="text-sm font-medium">Show gallery section on website</label>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Save Section Settings
          </button>
        </form>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Gallery Images ({siteContent.gallery?.images?.length || 0})</h3>
            <button
              onClick={() => setShowImageForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + Add Image
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteContent.gallery?.images?.map((image) => (
              <div key={image.id} className="bg-white border rounded-lg overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = '/gallery/image1.jpeg';
                  }}
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-3">{image.alt}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingImage(image);
                        setShowImageForm(true);
                      }}
                      className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this image?')) {
                          deleteGalleryImage(image.id);
                        }
                      }}
                      className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!siteContent.gallery?.images || siteContent.gallery.images.length === 0) && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-4">No gallery images yet</p>
              <button
                onClick={() => setShowImageForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Add Your First Image
              </button>
            </div>
          )}
        </div>

        {showImageForm && (
          <ImageForm
            image={editingImage}
            onSave={() => {
              setShowImageForm(false);
              setEditingImage(null);
              alert('Gallery image saved successfully!');
            }}
            onCancel={() => {
              setShowImageForm(false);
              setEditingImage(null);
            }}
          />
        )}
      </div>
    );

    return (
      <form onSubmit={handleSave} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Gallery Settings</h2>
        
        <div>
          <label className="block text-sm font-medium mb-2">Section Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Section Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <button
              type="button"
              onClick={addImage}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add Image
            </button>
          </div>

          {(formData.images || []).map((image, index) => (
            <div key={image.id} className="border rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    value={image.src}
                    onChange={(e) => updateImage(index, 'src', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    placeholder="/gallery/image1.jpeg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => updateImage(index, 'alt', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove Image
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.visible}
            onChange={(e) => setFormData({...formData, visible: e.target.checked})}
            className="mr-2"
          />
          <label className="text-sm font-medium">Show on website</label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    );
  };

  // Why Choose Us Form
  const WhyChooseForm = () => {
    const [formData, setFormData] = useState(siteContent.whyChoose);

    const handleSave = (e) => {
      e.preventDefault();
      updateSiteContent('whyChoose', formData);
      alert('Why Choose Us section updated successfully!');
    };

    const addFeature = () => {
      setFormData({
        ...formData,
        features: [...(formData.features || []), {
          id: Date.now(),
          title: '',
          description: '',
          icon: '⭐'
        }]
      });
    };

    const updateFeature = (index, field, value) => {
      const updatedFeatures = [...(formData.features || [])];
      updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
      setFormData({ ...formData, features: updatedFeatures });
    };

    const removeFeature = (index) => {
      const updatedFeatures = (formData.features || []).filter((_, i) => i !== index);
      setFormData({ ...formData, features: updatedFeatures });
    };

    return (
      <form onSubmit={handleSave} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us Settings</h2>
        
        <div>
          <label className="block text-sm font-medium mb-2">Section Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Section Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <button
              type="button"
              onClick={addFeature}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add Feature
            </button>
          </div>

          {(formData.features || []).map((feature, index) => (
            <div key={feature.id} className="border rounded-lg p-4 mb-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Icon (emoji)</label>
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                    placeholder="🎯"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  className="w-full border rounded px-2 py-1 h-16"
                />
              </div>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove Feature
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.visible}
            onChange={(e) => setFormData({...formData, visible: e.target.checked})}
            className="mr-2"
          />
          <label className="text-sm font-medium">Show on website</label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    );
  };

  // Company Info Form
  const CompanyForm = () => {
    const [formData, setFormData] = useState(siteContent.company);

    const handleSave = (e) => {
      e.preventDefault();
      updateSiteContent('company', formData);
      alert('Company information updated successfully!');
    };

    return (
      <form onSubmit={handleSave} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Company Information</h2>
        
        <div>
          <label className="block text-sm font-medium mb-2">Company Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Secondary Phone</label>
            <input
              type="text"
              value={formData.secondaryPhone || ''}
              onChange={(e) => setFormData({...formData, secondaryPhone: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full border rounded-lg px-3 py-2 h-24"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    );
  };

  // Social Media Form
  const SocialForm = () => {
    const [formData, setFormData] = useState(siteContent.social);
    const [activePostPlatform, setActivePostPlatform] = useState('instagram');
    const [showPostForm, setShowPostForm] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    const handleSave = (e) => {
      e.preventDefault();
      updateSiteContent('social', formData);
      alert('Social media settings updated successfully!');
    };

    const updatePlatform = (index, field, value) => {
      const updatedPlatforms = [...(formData.platforms || [])];
      updatedPlatforms[index] = { ...updatedPlatforms[index], [field]: value };
      setFormData({ ...formData, platforms: updatedPlatforms });
    };

    const SocialPostForm = ({ post, platform, onSave, onCancel }) => {
      const [postData, setPostData] = useState(post || {
        author: platform === 'instagram' ? '@dreamholidays' : 
                platform === 'facebook' ? 'Dream Holidays' : '@dreamholidays',
        content: '',
        caption: '',
        image: '',
        likes: 0,
        comments: 0,
        shares: 0,
        retweets: 0
      });
      const [uploading, setUploading] = useState(false);
      const [uploadMethod, setUploadMethod] = useState('upload');

      const handleFileUpload = async (file) => {
        setUploading(true);
        try {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('folder', 'social/uploads');

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            setPostData({...postData, image: data.url});
          } else {
            alert('Upload failed. Please try again.');
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Upload failed. Please try again.');
        } finally {
          setUploading(false);
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (post) {
          updateSocialPost(platform, post.id, postData);
        } else {
          addSocialPost(platform, postData);
        }
        onSave();
      };

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {post ? 'Edit' : 'Add'} {platform.charAt(0).toUpperCase() + platform.slice(1)} Post
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  required
                  value={postData.author}
                  onChange={(e) => setPostData({...postData, author: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              {platform === 'instagram' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Method</label>
                    <div className="flex gap-4 mb-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="upload"
                          checked={uploadMethod === 'upload'}
                          onChange={(e) => setUploadMethod(e.target.value)}
                          className="mr-2"
                        />
                        Upload File
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="url"
                          checked={uploadMethod === 'url'}
                          onChange={(e) => setUploadMethod(e.target.value)}
                          className="mr-2"
                        />
                        Image URL
                      </label>
                    </div>
                  </div>

                  {uploadMethod === 'upload' ? (
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleFileUpload(file);
                          }
                        }}
                        className="w-full border rounded-lg px-3 py-2"
                        disabled={uploading}
                      />
                      {uploading && (
                        <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium mb-2">Image URL</label>
                      <input
                        type="text"
                        value={postData.image || ''}
                        onChange={(e) => setPostData({...postData, image: e.target.value})}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="/social/uploads/image.jpg"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Caption</label>
                    <textarea
                      required
                      value={postData.caption || ''}
                      onChange={(e) => setPostData({...postData, caption: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2 h-24"
                      placeholder="Write your Instagram caption..."
                    />
                  </div>

                  {postData.image && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Preview</label>
                      <img
                        src={postData.image}
                        alt="Post preview"
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => {
                          e.target.src = '/gallery/image1.jpeg';
                        }}
                      />
                    </div>
                  )}
                </>
              )}

              {(platform === 'facebook' || platform === 'twitter') && (
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    required
                    value={postData.content || ''}
                    onChange={(e) => setPostData({...postData, content: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 h-24"
                    placeholder={`Write your ${platform} post...`}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Likes</label>
                  <input
                    type="number"
                    min="0"
                    value={postData.likes || 0}
                    onChange={(e) => setPostData({...postData, likes: parseInt(e.target.value) || 0})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Comments</label>
                  <input
                    type="number"
                    min="0"
                    value={postData.comments || 0}
                    onChange={(e) => setPostData({...postData, comments: parseInt(e.target.value) || 0})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {platform === 'facebook' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Shares</label>
                  <input
                    type="number"
                    min="0"
                    value={postData.shares || 0}
                    onChange={(e) => setPostData({...postData, shares: parseInt(e.target.value) || 0})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              )}

              {platform === 'twitter' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Retweets</label>
                  <input
                    type="number"
                    min="0"
                    value={postData.retweets || 0}
                    onChange={(e) => setPostData({...postData, retweets: parseInt(e.target.value) || 0})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {post ? 'Update' : 'Add'} Post
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-8">
        <form onSubmit={handleSave} className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Social Media Settings</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">Section Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Section Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
            {(formData.platforms || []).map((platform, index) => (
              <div key={platform.name} className="border rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{platform.name} Name</label>
                    <input
                      type="text"
                      value={platform.name}
                      onChange={(e) => updatePlatform(index, 'name', e.target.value)}
                      className="w-full border rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{platform.name} URL</label>
                    <input
                      type="url"
                      value={platform.url}
                      onChange={(e) => updatePlatform(index, 'url', e.target.value)}
                      className="w-full border rounded px-2 py-1"
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.visible}
              onChange={(e) => setFormData({...formData, visible: e.target.checked})}
              className="mr-2"
            />
            <label className="text-sm font-medium">Show on website</label>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Save Settings
          </button>
        </form>

        {/* Social Media Posts Management */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Social Media Posts</h2>
          
          {/* Platform Tabs */}
          <div className="flex gap-2 mb-6">
            {['instagram', 'facebook', 'twitter'].map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePostPlatform(platform)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activePostPlatform === platform
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </button>
            ))}
          </div>

          {/* Add Post Button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {activePostPlatform.charAt(0).toUpperCase() + activePostPlatform.slice(1)} Posts
              ({(siteContent.social?.posts?.[activePostPlatform] || []).length})
            </h3>
            <button
              onClick={() => setShowPostForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + Add Post
            </button>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {(siteContent.social?.posts?.[activePostPlatform] || []).map((post) => (
              <div key={post.id} className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setShowPostForm(true);
                      }}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this post?')) {
                          deleteSocialPost(activePostPlatform, post.id);
                        }
                      }}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {post.image && (
                  <div className="mb-3">
                    <img
                      src={post.image}
                      alt="Post image"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
                
                <p className="text-gray-800 mb-3">
                  {post.caption || post.content}
                </p>
                
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  {post.shares && <span>📤 {post.shares}</span>}
                  {post.retweets && <span>🔄 {post.retweets}</span>}
                </div>
              </div>
            ))}

            {(!siteContent.social?.posts?.[activePostPlatform] || 
              siteContent.social.posts[activePostPlatform].length === 0) && (
              <div className="text-center py-12 text-gray-500 border rounded-lg">
                <p className="text-lg mb-4">No {activePostPlatform} posts yet</p>
                <button
                  onClick={() => setShowPostForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  Add Your First Post
                </button>
              </div>
            )}
          </div>
        </div>

        {showPostForm && (
          <SocialPostForm
            post={editingPost}
            platform={activePostPlatform}
            onSave={() => {
              setShowPostForm(false);
              setEditingPost(null);
              alert('Social media post saved successfully!');
            }}
            onCancel={() => {
              setShowPostForm(false);
              setEditingPost(null);
            }}
          />
        )}
      </div>
    );
  };

  // Contact Form Settings
  const ContactFormSettings = () => {
    const [formData, setFormData] = useState(siteContent.contact);

    const handleSave = (e) => {
      e.preventDefault();
      updateSiteContent('contact', formData);
      alert('Contact section updated successfully!');
    };

    return (
      <form onSubmit={handleSave} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Contact Section Settings</h2>
        
        <div>
          <label className="block text-sm font-medium mb-2">Section Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Section Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.visible}
            onChange={(e) => setFormData({...formData, visible: e.target.checked})}
            className="mr-2"
          />
          <label className="text-sm font-medium">Show on website</label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    );
  };

  // Package Form Component
  const PackageForm = ({ packageData = null, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: packageData?.name || '',
      location: packageData?.location || '',
      price: packageData?.price || '',
      originalPrice: packageData?.originalPrice || '',
      duration: packageData?.duration || '',
      rating: packageData?.rating || 4.5,
      reviews: packageData?.reviews || 0,
      maxPeople: packageData?.maxPeople || 8,
      image: packageData?.image || '',
      images: packageData?.images || [],
      description: packageData?.description || '',
      highlights: packageData?.highlights || [''],
      itinerary: packageData?.itinerary || [{ day: 1, title: '', description: '' }],
      included: packageData?.included || [''],
      notIncluded: packageData?.notIncluded || [''],
      featured: packageData?.featured || false,
      category: packageData?.category || 'Luxury',
      status: packageData?.status || 'active'
    });

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (file, index = null) => {
      if (!file) return;
      
      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      formDataUpload.append('folder', `packages/${formData.name.toLowerCase().replace(/\s+/g, '-')}`);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        if (response.ok) {
          const data = await response.json();
          const imagePath = data.path;
          
          if (index === null) {
            // Main image
            setFormData(prev => ({ ...prev, image: imagePath }));
          } else {
            // Gallery images
            setFormData(prev => {
              const newImages = [...prev.images];
              newImages[index] = imagePath;
              return { ...prev, images: newImages };
            });
          }
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      } finally {
        setUploading(false);
      }
    };

    const addHighlight = () => {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, '']
      }));
    };

    const removeHighlight = (index) => {
      setFormData(prev => ({
        ...prev,
        highlights: prev.highlights.filter((_, i) => i !== index)
      }));
    };

    const updateHighlight = (index, value) => {
      setFormData(prev => ({
        ...prev,
        highlights: prev.highlights.map((h, i) => i === index ? value : h)
      }));
    };

    const addItineraryDay = () => {
      setFormData(prev => ({
        ...prev,
        itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', description: '' }]
      }));
    };

    const removeItineraryDay = (index) => {
      setFormData(prev => ({
        ...prev,
        itinerary: prev.itinerary.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 }))
      }));
    };

    const updateItineraryDay = (index, field, value) => {
      setFormData(prev => ({
        ...prev,
        itinerary: prev.itinerary.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }));
    };

    const addIncluded = () => {
      setFormData(prev => ({
        ...prev,
        included: [...prev.included, '']
      }));
    };

    const removeIncluded = (index) => {
      setFormData(prev => ({
        ...prev,
        included: prev.included.filter((_, i) => i !== index)
      }));
    };

    const updateIncluded = (index, value) => {
      setFormData(prev => ({
        ...prev,
        included: prev.included.map((item, i) => i === index ? value : item)
      }));
    };

    const addNotIncluded = () => {
      setFormData(prev => ({
        ...prev,
        notIncluded: [...prev.notIncluded, '']
      }));
    };

    const removeNotIncluded = (index) => {
      setFormData(prev => ({
        ...prev,
        notIncluded: prev.notIncluded.filter((_, i) => i !== index)
      }));
    };

    const updateNotIncluded = (index, value) => {
      setFormData(prev => ({
        ...prev,
        notIncluded: prev.notIncluded.map((item, i) => i === index ? value : item)
      }));
    };

    const addGalleryImage = () => {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, '']
      }));
    };

    const removeGalleryImage = (index) => {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Clean up empty fields
      const cleanedData = {
        ...formData,
        highlights: formData.highlights.filter(h => h.trim() !== ''),
        included: formData.included.filter(i => i.trim() !== ''),
        notIncluded: formData.notIncluded.filter(i => i.trim() !== ''),
        images: formData.images.filter(img => img.trim() !== ''),
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
        maxPeople: parseInt(formData.maxPeople)
      };

      onSave(cleanedData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-6">
              {packageData ? 'Edit Package' : 'Add New Package'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Package Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Original Price ($)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g., 7 Days / 6 Nights"
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max People</label>
                  <input
                    type="number"
                    value={formData.maxPeople}
                    onChange={(e) => setFormData({...formData, maxPeople: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reviews Count</label>
                  <input
                    type="number"
                    value={formData.reviews}
                    onChange={(e) => setFormData({...formData, reviews: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="Luxury">Luxury</option>
                    <option value="Budget">Budget</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Romance">Romance</option>
                    <option value="Family">Family</option>
                    <option value="Cultural">Cultural</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium">Featured Package</label>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 h-24"
                  required
                />
              </div>

              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Main Image</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="hidden"
                    id="main-image-upload"
                  />
                  <label
                    htmlFor="main-image-upload"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                  >
                    Upload Main Image
                  </label>
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                  )}
                  {uploading && <span className="text-blue-600">Uploading...</span>}
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Gallery Images</label>
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    + Add Image
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0], index)}
                        className="hidden"
                        id={`gallery-image-${index}`}
                      />
                      <label
                        htmlFor={`gallery-image-${index}`}
                        className="bg-gray-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-gray-700"
                      >
                        Choose File
                      </label>
                      {image && <img src={image} alt={`Gallery ${index}`} className="w-16 h-16 object-cover rounded" />}
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Package Highlights</label>
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    + Add Highlight
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => updateHighlight(index, e.target.value)}
                        className="flex-1 border rounded-lg px-3 py-2"
                        placeholder="Package highlight"
                      />
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Itinerary</label>
                  <button
                    type="button"
                    onClick={addItineraryDay}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    + Add Day
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.itinerary.map((day, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Day {day.day}</h4>
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(index)}
                          className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                          placeholder="Day title"
                          className="border rounded-lg px-3 py-2"
                        />
                        <input
                          type="text"
                          value={day.description}
                          onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                          placeholder="Day description"
                          className="border rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included Items */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Included in Package</label>
                  <button
                    type="button"
                    onClick={addIncluded}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.included.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateIncluded(index, e.target.value)}
                        className="flex-1 border rounded-lg px-3 py-2"
                        placeholder="Included item"
                      />
                      <button
                        type="button"
                        onClick={() => removeIncluded(index)}
                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Not Included Items */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Not Included in Package</label>
                  <button
                    type="button"
                    onClick={addNotIncluded}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.notIncluded.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateNotIncluded(index, e.target.value)}
                        className="flex-1 border rounded-lg px-3 py-2"
                        placeholder="Not included item"
                      />
                      <button
                        type="button"
                        onClick={() => removeNotIncluded(index)}
                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  {packageData ? 'Update Package' : 'Add Package'}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Package Management (simplified)
  const PackagesManagement = () => {
    const handleAddPackage = () => {
      setEditingPackage(null);
      setShowPackageForm(true);
    };

    const handleEditPackage = (pkg) => {
      setEditingPackage(pkg);
      setShowPackageForm(true);
    };

    const handleSavePackage = (packageData) => {
      if (editingPackage) {
        updatePackage(editingPackage.id, packageData);
      } else {
        addPackage(packageData);
      }
      setShowPackageForm(false);
      setEditingPackage(null);
    };

    const handleDeletePackage = (id) => {
      if (confirm('Are you sure you want to delete this package?')) {
        deletePackage(id);
      }
    };

    const handleToggleStatus = (id) => {
      togglePackageStatus(id);
    };

    const handleToggleFeatured = (id) => {
      togglePackageFeatured(id);
    };

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Package Management</h2>
          <button
            onClick={handleAddPackage}
            className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            + Add New Package
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(siteContent.packages || []).map((pkg) => (
            <div key={pkg.id} className="border rounded-lg p-4 shadow-sm bg-white">
              <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
              <p className="text-gray-600 text-sm mb-2">📍 {pkg.location}</p>
              <p className="text-blue-600 font-bold mb-2">${pkg.price}</p>
              <p className="text-gray-600 text-sm mb-2">⏱️ {pkg.duration}</p>
              
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`px-2 py-1 rounded text-xs ${
                  pkg.status === 'active' ? 'bg-green-100 text-green-800' :
                  pkg.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {pkg.status}
                </span>
                {pkg.featured && (
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                    ⭐ Featured
                  </span>
                )}
                <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                  {pkg.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => handleToggleStatus(pkg.id)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    pkg.status === 'active' 
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {pkg.status === 'active' ? '👁️ Hide' : '🙈 Show'}
                </button>
                <button
                  onClick={() => handleToggleFeatured(pkg.id)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    pkg.featured 
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {pkg.featured ? '⭐ Unfeature' : '☆ Feature'}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditPackage(pkg)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showPackageForm && (
          <PackageForm
            packageData={editingPackage}
            onSave={handleSavePackage}
            onCancel={() => {
              setShowPackageForm(false);
              setEditingPackage(null);
            }}
          />
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <ContentOverview />;
      case 'hero':
        return <HeroSlidesManager />;
      case 'stats':
        return <StatsForm />;
      case 'testimonials':
        return <TestimonialsForm />;
      case 'gallery':
        return <GalleryForm />;
      case 'whyChoose':
        return <WhyChooseForm />;
      case 'company':
        return <CompanyForm />;
      case 'social':
        return <SocialForm />;
      case 'contact':
        return <ContactFormSettings />;
      case 'packages':
        return <PackagesManagement />;
      default:
        return <div>Select a tab to manage content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your website content</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// This is the component that gets exported as the default
const AdminPage = () => {
  return (
    <ContentProvider>
      <AdminDashboard />
    </ContentProvider>
  );
};

export default AdminPage;
