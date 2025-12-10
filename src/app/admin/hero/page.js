"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroManagement() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setSlides(data.data.heroSlides || []);
    } catch (error) {
      console.error("Error fetching slides:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSlides = async (updatedSlides) => {
    try {
      // Use PATCH to update only the heroSlides section
      const response = await fetch("/api/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          section: "heroSlides",
          data: updatedSlides 
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setSlides(updatedSlides);
        
        // Refresh the data to ensure we have the latest
        await fetchSlides();
        
        alert("Slides updated successfully!");
      } else {
        throw new Error(result.error || "Failed to save");
      }
    } catch (error) {
      console.error("Error saving slides:", error);
      alert("Failed to save slides: " + error.message);
    }
  };

  const handleImageUpload = async (file, slideId) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "hero");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        // Update the editing slide state immediately
        if (editingSlide && editingSlide.id === slideId) {
          setEditingSlide({ ...editingSlide, backgroundImage: data.url });
        }
        
        const updatedSlides = slides.map((slide) =>
          slide.id === slideId ? { ...slide, backgroundImage: data.url } : slide
        );
        await saveSlides(updatedSlides);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const addNewSlide = () => {
    const newSlide = {
      id: Math.max(...slides.map((s) => s.id), 0) + 1,
      title: "New Slide",
      subtitle: "Subtitle",
      description: "Description",
      backgroundImage: "/hero/destination5.jpg",
      gradient: "from-black/80 to-blue-900/60",
      visible: true,
      order: slides.length + 1,
    };
    setEditingSlide(newSlide);
  };

  const saveSlide = async (slide) => {
    const existingIndex = slides.findIndex((s) => s.id === slide.id);
    let updatedSlides;

    if (existingIndex >= 0) {
      updatedSlides = [...slides];
      updatedSlides[existingIndex] = slide;
    } else {
      updatedSlides = [...slides, slide];
    }

    await saveSlides(updatedSlides);
    setEditingSlide(null);
  };

  const deleteSlide = async (id) => {
    if (confirm("Are you sure you want to delete this slide?")) {
      const updatedSlides = slides.filter((s) => s.id !== id);
      await saveSlides(updatedSlides);
    }
  };

  const toggleVisibility = async (id) => {
    const updatedSlides = slides.map((slide) =>
      slide.id === id ? { ...slide, visible: !slide.visible } : slide
    );
    await saveSlides(updatedSlides);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hero Slides</h1>
          <p className="text-gray-600 mt-1">Manage homepage carousel slides</p>
        </div>
        <button
          onClick={addNewSlide}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          + Add New Slide
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={slide.backgroundImage}
                alt={slide.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => toggleVisibility(slide.id)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    slide.visible ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                  }`}
                >
                  {slide.visible ? "Visible" : "Hidden"}
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{slide.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{slide.subtitle}</p>
              <p className="text-xs text-gray-500 mb-4">{slide.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingSlide(slide)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSlide(slide.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingSlide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">
              {slides.find((s) => s.id === editingSlide.id) ? "Edit" : "Add"} Slide
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveSlide(editingSlide);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingSlide.subtitle}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={editingSlide.description}
                  onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Background Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingSlide.backgroundImage}
                    onChange={(e) =>
                      setEditingSlide({ ...editingSlide, backgroundImage: e.target.value })
                    }
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="/hero/image.jpg"
                  />
                  <label className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          handleImageUpload(e.target.files[0], editingSlide.id);
                        }
                      }}
                    />
                  </label>
                </div>
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gradient</label>
                <select
                  value={editingSlide.gradient}
                  onChange={(e) => setEditingSlide({ ...editingSlide, gradient: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="from-black/80 to-blue-900/60">Blue</option>
                  <option value="from-black/80 to-green-900/60">Green</option>
                  <option value="from-black/80 to-purple-900/60">Purple</option>
                  <option value="from-black/80 to-red-900/60">Red</option>
                  <option value="from-black/80 to-gray-900/60">Gray</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingSlide.visible}
                  onChange={(e) => setEditingSlide({ ...editingSlide, visible: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Visible on site</label>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Slide
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
