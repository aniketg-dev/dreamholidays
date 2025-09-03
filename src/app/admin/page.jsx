'use client';

import { useState } from 'react';
import Image from 'next/image';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('packages');
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Santorini Paradise',
      location: 'Santorini, Greece',
      price: 1299,
      duration: '7 Days',
      image: '/destination1.jpg',
      status: 'active'
    },
    {
      id: 2,
      name: 'Bali Adventure',
      location: 'Bali, Indonesia',
      price: 899,
      duration: '10 Days',
      image: '/destination2.jpg',
      status: 'active'
    }
  ]);

  const [editingPackage, setEditingPackage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const tabs = [
    { id: 'packages', label: 'Packages', icon: '📦' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'content', label: 'Site Content', icon: '📝' },
    { id: 'images', label: 'Media', icon: '�' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

  const PackageForm = ({ package: pkg, onSave, onCancel }) => {
    const [formData, setFormData] = useState(pkg || {
      name: '',
      location: '',
      price: '',
      duration: '',
      description: '',
      image: '',
      highlights: [''],
      itinerary: [{ day: 1, title: '', description: '' }]
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    const addHighlight = () => {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, '']
      });
    };

    const updateHighlight = (index, value) => {
      const newHighlights = [...formData.highlights];
      newHighlights[index] = value;
      setFormData({ ...formData, highlights: newHighlights });
    };

    const removeHighlight = (index) => {
      setFormData({
        ...formData,
        highlights: formData.highlights.filter((_, i) => i !== index)
      });
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">
              {pkg ? 'Edit Package' : 'Add New Package'}
            </h3>
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Package Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price ($)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 7 Days"
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Main Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Package Highlights</label>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2"
                    placeholder="Enter highlight"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addHighlight}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                + Add Highlight
              </button>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {pkg ? 'Update Package' : 'Create Package'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSavePackage = (packageData) => {
    if (editingPackage) {
      setPackages(packages.map(pkg => 
        pkg.id === editingPackage.id ? { ...packageData, id: editingPackage.id } : pkg
      ));
      setEditingPackage(null);
    } else {
      setPackages([...packages, { ...packageData, id: Date.now(), status: 'active' }]);
      setShowAddForm(false);
    }
  };

  const handleDeletePackage = (id) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const renderPackagesTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Packages</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add New Package
        </button>
      </div>

      <div className="grid gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow p-6 flex gap-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{pkg.name}</h3>
              <p className="text-gray-600">{pkg.location}</p>
              <p className="text-lg font-semibold text-blue-600">${pkg.price} • {pkg.duration}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingPackage(pkg)}
                className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePackage(pkg.id)}
                className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGalleryTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gallery Destinations</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Destination
        </button>
      </div>

      <div className="grid gap-6">
        {[
          { id: 1, name: 'Santorini', country: 'Greece', tagline: 'Where Blue Meets White', image: '/destination1.jpg' },
          { id: 2, name: 'Bali', country: 'Indonesia', tagline: 'Tropical Paradise', image: '/destination2.jpg' },
          { id: 3, name: 'Swiss Alps', country: 'Switzerland', tagline: 'Mountain Majesty', image: '/destination3.jpg' }
        ].map((dest) => (
          <div key={dest.id} className="bg-white rounded-lg shadow p-6 flex gap-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image src={dest.image} alt={dest.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{dest.name}</h3>
              <p className="text-gray-600">{dest.country}</p>
              <p className="text-sm text-blue-600 italic">"{dest.tagline}"</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200">
                Edit
              </button>
              <button className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Site Content Management</h2>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Main Title</label>
              <input type="text" defaultValue="Discover Paradise" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input type="text" defaultValue="Make Your Travel Dreams Come True" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Update Hero Section
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Company Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input type="text" defaultValue="Dream Holidays" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input type="email" defaultValue="info@dreamholidays.com" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full border rounded-lg px-3 py-2" />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Update Company Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Media Management</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-700 font-medium">Upload images</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept="image/*" />
            </label>
            <p className="text-gray-500">or drag and drop</p>
          </div>
          <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-600">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">247</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-600">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$124,560</p>
          <p className="text-sm text-green-600">+8% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-600">Active Packages</h3>
          <p className="text-3xl font-bold text-purple-600">{packages.length}</p>
          <p className="text-sm text-gray-500">Total packages</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'packages' && renderPackagesTab()}
          {activeTab === 'gallery' && renderGalleryTab()}
          {activeTab === 'content' && renderContentTab()}
          {activeTab === 'images' && renderMediaTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
        </main>
      </div>

      {/* Forms */}
      {showAddForm && (
        <PackageForm
          onSave={handleSavePackage}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      {editingPackage && (
        <PackageForm
          package={editingPackage}
          onSave={handleSavePackage}
          onCancel={() => setEditingPackage(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
