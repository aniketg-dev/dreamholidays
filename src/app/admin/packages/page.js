"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PackagesManagement() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setPackages(data.data.packages || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const savePackages = async (updatedPackages) => {
    try {
      // Update only the packages section in the config
      const response = await fetch("/api/config", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: "packages",
          data: updatedPackages,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save packages");
      }

      // Re-fetch from server to be sure we have the latest version
      await fetchPackages();

      alert("Packages updated successfully!");
    } catch (error) {
      console.error("Error saving packages:", error);
      alert("Failed to save packages: " + error.message);
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "packages");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        return data.url;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
    return null;
  };

  const addNewPackage = () => {
    const newPackage = {
      id: Math.max(...packages.map((p) => p.id), 0) + 1,
      name: "New Package",
      location: "Location",
      price: 49900,
      originalPrice: 59900,
      duration: "7 Days / 6 Nights",
      rating: 4.5,
      reviews: 0,
      maxPeople: 8,
      image: "/gallery/image1.jpeg",
      images: ["/gallery/image1.jpeg"],
      description: "Package description",
      highlights: ["Highlight 1", "Highlight 2"],
      itinerary: [],
      included: ["Item 1"],
      notIncluded: ["Item 1"],
      featured: false,
      category: "Luxury",
      status: "active",
    };
    setEditingPackage(newPackage);
  };

  const savePackage = async (pkg) => {
    const existingIndex = packages.findIndex((p) => p.id === pkg.id);
    let updatedPackages;

    if (existingIndex >= 0) {
      updatedPackages = [...packages];
      updatedPackages[existingIndex] = pkg;
    } else {
      updatedPackages = [...packages, pkg];
    }

    await savePackages(updatedPackages);
    setEditingPackage(null);
  };

  const deletePackage = async (id) => {
    if (confirm("Are you sure you want to delete this package?")) {
      const updatedPackages = packages.filter((p) => p.id !== id);
      await savePackages(updatedPackages);
    }
  };

  const toggleFeatured = async (id) => {
    const updatedPackages = packages.map((pkg) =>
      pkg.id === id ? { ...pkg, featured: !pkg.featured } : pkg
    );
    await savePackages(updatedPackages);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Travel Packages</h1>
          <p className="text-gray-600 mt-1">Manage your travel packages</p>
        </div>
        <button
          onClick={addNewPackage}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          + Add New Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
              {pkg.featured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded text-sm font-medium">
                  ⭐ Featured
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
              <p className="text-sm text-gray-600 mb-2">📍 {pkg.location}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-blue-600">₹{pkg.price.toLocaleString('en-IN')}</span>
                {pkg.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">⏱️ {pkg.duration}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPackage(pkg)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleFeatured(pkg.id)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition text-sm"
                >
                  ⭐
                </button>
                <button
                  onClick={() => deletePackage(pkg.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8 p-6">
            <h2 className="text-2xl font-bold mb-4">
              {packages.find((p) => p.id === editingPackage.id) ? "Edit" : "Add"} Package
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                savePackage(editingPackage);
              }}
              className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Package Name</label>
                  <input
                    type="text"
                    value={editingPackage.name}
                    onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={editingPackage.location}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, location: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingPackage.price}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, price: Number(e.target.value) })
                    }
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingPackage.originalPrice}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, originalPrice: Number(e.target.value) })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingPackage.duration}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, duration: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                    placeholder="7 Days / 6 Nights"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={editingPackage.description}
                  onChange={(e) =>
                    setEditingPackage({ ...editingPackage, description: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Main Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingPackage.image}
                    onChange={(e) => setEditingPackage({ ...editingPackage, image: e.target.value })}
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="/packages/image.jpg"
                  />
                  <label className="bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files[0]) {
                          const url = await handleImageUpload(e.target.files[0]);
                          if (url) {
                            setEditingPackage({ ...editingPackage, image: url });
                          }
                        }
                      }}
                    />
                  </label>
                </div>
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Highlights (one per line)
                </label>
                <textarea
                  value={editingPackage.highlights?.join("\n") || ""}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      highlights: e.target.value.split("\n").filter((h) => h.trim()),
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  placeholder="Luxury accommodation&#10;Airport transfers&#10;Guided tours"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    value={editingPackage.category}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, category: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Luxury">Luxury</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Budget">Budget</option>
                    <option value="Family">Family</option>
                    <option value="Romantic">Romantic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max People</label>
                  <input
                    type="number"
                    value={editingPackage.maxPeople}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, maxPeople: Number(e.target.value) })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  What&apos;s Included (one per line)
                </label>
                <textarea
                  value={editingPackage.included?.join("\n") || ""}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      included: e.target.value.split("\n").filter((h) => h.trim()),
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  placeholder="Accommodation&#10;Meals&#10;Transportation&#10;Tours"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Not Included (one per line)
                </label>
                <textarea
                  value={editingPackage.notIncluded?.join("\n") || ""}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      notIncluded: e.target.value.split("\n").filter((h) => h.trim()),
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  rows="3"
                  placeholder="International flights&#10;Travel insurance&#10;Personal expenses"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingPackage.featured}
                    onChange={(e) =>
                      setEditingPackage({ ...editingPackage, featured: e.target.checked })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">Featured Package</span>
                </label>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Day-by-Day Itinerary</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const nextDay = (editingPackage.itinerary?.length || 0) + 1;
                      setEditingPackage({
                        ...editingPackage,
                        itinerary: [
                          ...(editingPackage.itinerary || []),
                          {
                            day: nextDay,
                            title: "New Day",
                            description: "Add description",
                          },
                        ],
                      });
                    }}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    + Add Day
                  </button>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {(editingPackage.itinerary || []).map((day, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 bg-gray-50 space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={1}
                          value={day.day}
                          onChange={(e) => {
                            const value = Number(e.target.value) || 1;
                            const updated = [...(editingPackage.itinerary || [])];
                            updated[index] = { ...updated[index], day: value };
                            setEditingPackage({ ...editingPackage, itinerary: updated });
                          }}
                          className="w-20 border rounded px-2 py-1 text-sm"
                          placeholder="Day"
                        />
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => {
                            const updated = [...(editingPackage.itinerary || [])];
                            updated[index] = { ...updated[index], title: e.target.value };
                            setEditingPackage({ ...editingPackage, itinerary: updated });
                          }}
                          className="flex-1 border rounded px-2 py-1 text-sm"
                          placeholder="Title"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editingPackage.itinerary || []).filter(
                              (_, i) => i !== index
                            );
                            setEditingPackage({ ...editingPackage, itinerary: updated });
                          }}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        value={day.description}
                        onChange={(e) => {
                          const updated = [...(editingPackage.itinerary || [])];
                          updated[index] = { ...updated[index], description: e.target.value };
                          setEditingPackage({ ...editingPackage, itinerary: updated });
                        }}
                        className="w-full border rounded px-2 py-1 text-xs"
                        rows={2}
                        placeholder="Description"
                      />
                    </div>
                  ))}
                  {(!editingPackage.itinerary || editingPackage.itinerary.length === 0) && (
                    <p className="text-xs text-gray-500">
                      No itinerary days added yet. Use &quot;+ Add Day&quot; to create one.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4 sticky bottom-0 bg-white">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Package
                </button>
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
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
