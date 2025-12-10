"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SettingsManagement() {
  const [company, setCompany] = useState({
    name: "",
    logo: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    address: "",
    visible: true,
  });
  const [whyChoose, setWhyChoose] = useState({
    title: "",
    subtitle: "",
    features: [],
    visible: true,
  });
  const [contact, setContact] = useState({
    title: "",
    subtitle: "",
    visible: true,
  });
  const [footer, setFooter] = useState({
    logo: "",
    about: "",
    quickLinks: [],
    destinations: [],
    copyright: "",
    visible: true,
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setCompany(data.data.company || {});
      setWhyChoose(data.data.whyChoose || { features: [] });
      setContact(data.data.contact || {});
      setFooter(data.data.footer || { quickLinks: [], destinations: [] });
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      const res = await fetch("/api/config");
      const configData = await res.json();
      const config = configData.data;

      config.company = company;
      config.whyChoose = whyChoose;
      config.contact = contact;
      config.footer = footer;

      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: config }),
      });

      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    }
  };

  const updateFeature = (index, field, value) => {
    const updatedFeatures = [...whyChoose.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setWhyChoose({ ...whyChoose, features: updatedFeatures });
  };

  const handleLogoUpload = async (file, type) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "logo");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        if (type === 'footer') {
          setFooter({ ...footer, logo: data.url });
        } else if (type === 'header') {
          setCompany({ ...company, logo: data.url });
        }
        alert("Logo uploaded successfully!");
      } else {
        alert("Failed to upload logo");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">General Settings</h1>
        <p className="text-gray-600 mt-1">Manage site-wide settings and information</p>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Company Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Header Logo</label>
            {company.logo && (
              <div className="mb-3 p-4 bg-gray-50 rounded-lg">
                <Image
                  src={company.logo}
                  alt="Header Logo Preview"
                  width={200}
                  height={60}
                  className="h-16 w-auto object-contain"
                />
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={company.logo}
                onChange={(e) => setCompany({ ...company, logo: e.target.value })}
                className="flex-1 border rounded px-3 py-2"
                placeholder="/logo/cttlogo-bg.png"
              />
              <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition flex items-center">
                {uploading ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleLogoUpload(e.target.files[0], 'header');
                    }
                  }}
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload a logo or enter the path manually</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Primary Phone</label>
              <input
                type="tel"
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Secondary Phone</label>
            <input
              type="tel"
              value={company.secondaryPhone}
              onChange={(e) => setCompany({ ...company, secondaryPhone: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={company.address}
              onChange={(e) => setCompany({ ...company, address: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows="3"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Why Choose Us Section</h2>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={whyChoose.title}
              onChange={(e) => setWhyChoose({ ...whyChoose, title: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              type="text"
              value={whyChoose.subtitle}
              onChange={(e) => setWhyChoose({ ...whyChoose, subtitle: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={whyChoose.visible}
              onChange={(e) => setWhyChoose({ ...whyChoose, visible: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium">Show this section on site</label>
          </div>
        </div>

        <h3 className="font-semibold mb-3">Features</h3>
        <div className="space-y-3">
          {whyChoose.features.map((feature, index) => (
            <div key={feature.id} className="grid grid-cols-12 gap-3 p-3 bg-gray-50 rounded">
              <div className="col-span-1">
                <input
                  type="text"
                  value={feature.icon}
                  onChange={(e) => updateFeature(index, "icon", e.target.value)}
                  className="w-full border rounded px-2 py-2 text-center"
                  placeholder="🎯"
                />
              </div>
              <div className="col-span-4">
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(index, "title", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Feature title"
                />
              </div>
              <div className="col-span-7">
                <input
                  type="text"
                  value={feature.description}
                  onChange={(e) => updateFeature(index, "description", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Feature description"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Contact Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={contact.title}
              onChange={(e) => setContact({ ...contact, title: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              type="text"
              value={contact.subtitle}
              onChange={(e) => setContact({ ...contact, subtitle: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={contact.visible}
              onChange={(e) => setContact({ ...contact, visible: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium">Show contact form on site</label>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Footer Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Footer Logo</label>
            {footer.logo && (
              <div className="mb-3 p-4 bg-gray-50 rounded-lg">
                <Image
                  src={footer.logo}
                  alt="Footer Logo Preview"
                  width={200}
                  height={60}
                  className="h-16 w-auto object-contain"
                />
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={footer.logo}
                onChange={(e) => setFooter({ ...footer, logo: e.target.value })}
                className="flex-1 border rounded px-3 py-2"
                placeholder="/logo/cttlogo-bg.png"
              />
              <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition flex items-center">
                {uploading ? "Uploading..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleLogoUpload(e.target.files[0], 'footer');
                    }
                  }}
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload a logo or enter the path manually</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">About Text</label>
            <textarea
              value={footer.about}
              onChange={(e) => setFooter({ ...footer, about: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows="2"
              placeholder="Your trusted travel partner..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Copyright Text</label>
            <input
              type="text"
              value={footer.copyright}
              onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Charika Tours and Travels. All rights reserved."
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={footer.visible}
              onChange={(e) => setFooter({ ...footer, visible: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium">Show footer on site</label>
          </div>
        </div>
      </div>

      <button
        onClick={saveSettings}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Save All Settings
      </button>
    </div>
  );
}
