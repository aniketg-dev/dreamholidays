"use client";

import { useState, useEffect } from "react";

export default function SocialMediaManagement() {
  const [social, setSocial] = useState({
    title: "",
    subtitle: "",
    platforms: [],
    posts: { instagram: [], facebook: [], twitter: [] },
    visible: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSocial();
  }, []);

  const fetchSocial = async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setSocial(data.data.social || {
        title: "",
        subtitle: "",
        platforms: [],
        posts: { instagram: [], facebook: [], twitter: [] },
        visible: true,
      });
    } catch (error) {
      console.error("Error fetching social:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSocial = async () => {
    try {
      const res = await fetch("/api/config");
      const configData = await res.json();
      const config = configData.data;

      config.social = social;

      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: config }),
      });

      alert("Social media settings updated successfully!");
    } catch (error) {
      console.error("Error saving social:", error);
      alert("Failed to save social media settings");
    }
  };

  const updatePlatform = (index, field, value) => {
    const updatedPlatforms = [...social.platforms];
    updatedPlatforms[index] = { ...updatedPlatforms[index], [field]: value };
    setSocial({ ...social, platforms: updatedPlatforms });
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Social Media</h1>
        <p className="text-gray-600 mt-1">Manage social media links and settings</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Section Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={social.title}
              onChange={(e) => setSocial({ ...social, title: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              type="text"
              value={social.subtitle}
              onChange={(e) => setSocial({ ...social, subtitle: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={social.visible}
              onChange={(e) => setSocial({ ...social, visible: e.target.checked })}
              className="mr-2"
            />
            <label className="text-sm font-medium">Show social media section on site</label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Social Media Links</h2>
        <div className="space-y-4">
          {social.platforms.map((platform, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-1">Platform</label>
                <input
                  type="text"
                  value={platform.name}
                  onChange={(e) => updatePlatform(index, "name", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon</label>
                <input
                  type="text"
                  value={platform.icon}
                  onChange={(e) => updatePlatform(index, "icon", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="url"
                  value={platform.url}
                  onChange={(e) => updatePlatform(index, "url", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="https://..."
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={saveSocial}
          className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          📱 <strong>Note:</strong> Social media posts are managed separately. Update the URLs to link to your actual social media profiles.
        </p>
      </div>
    </div>
  );
}
