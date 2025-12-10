"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function GalleryManagement() {
  const [gallery, setGallery] = useState({ title: "", subtitle: "", images: [], visible: true });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setGallery(data.data.gallery || { title: "", subtitle: "", images: [], visible: true });
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveGallery = async (updatedGallery) => {
    try {
      const res = await fetch("/api/config");
      const configData = await res.json();
      const config = configData.data;

      config.gallery = updatedGallery;

      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: config }),
      });

      setGallery(updatedGallery);
      alert("Gallery updated successfully!");
    } catch (error) {
      console.error("Error saving gallery:", error);
      alert("Failed to save gallery");
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "gallery");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        const newImage = {
          id: Math.max(...gallery.images.map((img) => img.id), 0) + 1,
          src: data.url,
          alt: `Gallery image ${gallery.images.length + 1}`,
        };
        const updatedGallery = {
          ...gallery,
          images: [...gallery.images, newImage],
        };
        await saveGallery(updatedGallery);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (confirm("Are you sure you want to delete this image?")) {
      const updatedGallery = {
        ...gallery,
        images: gallery.images.filter((img) => img.id !== id),
      };
      await saveGallery(updatedGallery);
    }
  };

  const updateImageAlt = async (id, alt) => {
    const updatedGallery = {
      ...gallery,
      images: gallery.images.map((img) => (img.id === id ? { ...img, alt } : img)),
    };
    await saveGallery(updatedGallery);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <p className="text-gray-600 mt-1">Manage destination gallery images</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Gallery Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={gallery.title}
              onChange={(e) => setGallery({ ...gallery, title: e.target.value })}
              onBlur={() => saveGallery(gallery)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              type="text"
              value={gallery.subtitle}
              onChange={(e) => setGallery({ ...gallery, subtitle: e.target.value })}
              onBlur={() => saveGallery(gallery)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={gallery.visible}
              onChange={(e) => {
                const updated = { ...gallery, visible: e.target.checked };
                setGallery(updated);
                saveGallery(updated);
              }}
              className="mr-2"
            />
            <label className="text-sm font-medium">Show gallery on site</label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gallery Images</h2>
          <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer">
            {uploading ? "Uploading..." : "+ Add Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
              disabled={uploading}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.images.map((img) => (
            <div key={img.id} className="bg-gray-50 rounded-lg overflow-hidden border">
              <div className="relative h-48">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
              <div className="p-3">
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => updateImageAlt(img.id, e.target.value)}
                  placeholder="Image description"
                  className="w-full text-sm border rounded px-2 py-1 mb-2"
                />
                <button
                  onClick={() => deleteImage(img.id)}
                  className="w-full bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
