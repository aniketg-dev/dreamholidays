"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState({ title: "", subtitle: "", reviews: [], visible: true });
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setTestimonials(data.data.testimonials || { title: "", subtitle: "", reviews: [], visible: true });
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveTestimonials = async (updated) => {
    try {
      const res = await fetch("/api/config");
      const configData = await res.json();
      const config = configData.data;

      config.testimonials = updated;

      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: config }),
      });

      setTestimonials(updated);
      alert("Testimonials updated successfully!");
    } catch (error) {
      console.error("Error saving testimonials:", error);
      alert("Failed to save testimonials");
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", "testimonials");

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

  const addNewReview = () => {
    const newReview = {
      id: Math.max(...testimonials.reviews.map((r) => r.id), 0) + 1,
      name: "Customer Name",
      location: "City, Country",
      rating: 5,
      comment: "Great experience!",
      image: "/testimonials/test1.jpeg",
    };
    setEditingReview(newReview);
  };

  const saveReview = async (review) => {
    const existingIndex = testimonials.reviews.findIndex((r) => r.id === review.id);
    let updatedReviews;

    if (existingIndex >= 0) {
      updatedReviews = [...testimonials.reviews];
      updatedReviews[existingIndex] = review;
    } else {
      updatedReviews = [...testimonials.reviews, review];
    }

    await saveTestimonials({ ...testimonials, reviews: updatedReviews });
    setEditingReview(null);
  };

  const deleteReview = async (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      const updatedReviews = testimonials.reviews.filter((r) => r.id !== id);
      await saveTestimonials({ ...testimonials, reviews: updatedReviews });
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
        <p className="text-gray-600 mt-1">Manage customer reviews</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Section Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={testimonials.title}
              onChange={(e) => setTestimonials({ ...testimonials, title: e.target.value })}
              onBlur={() => saveTestimonials(testimonials)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              type="text"
              value={testimonials.subtitle}
              onChange={(e) => setTestimonials({ ...testimonials, subtitle: e.target.value })}
              onBlur={() => saveTestimonials(testimonials)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={testimonials.visible}
              onChange={(e) => {
                const updated = { ...testimonials, visible: e.target.checked };
                setTestimonials(updated);
                saveTestimonials(updated);
              }}
              className="mr-2"
            />
            <label className="text-sm font-medium">Show testimonials on site</label>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Reviews</h2>
        <button
          onClick={addNewReview}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          + Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image src={review.image} alt={review.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold">{review.name}</h3>
                <p className="text-sm text-gray-600">{review.location}</p>
                <div className="text-yellow-500">{"⭐".repeat(review.rating)}</div>
              </div>
            </div>
            <p className="text-gray-700 mb-4 text-sm">{review.comment}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingReview(review)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteReview(review.id)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">
              {testimonials.reviews.find((r) => r.id === editingReview.id) ? "Edit" : "Add"} Review
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveReview(editingReview);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={editingReview.name}
                    onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={editingReview.location}
                    onChange={(e) => setEditingReview({ ...editingReview, location: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <select
                  value={editingReview.rating}
                  onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                  className="w-full border rounded px-3 py-2"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {"⭐".repeat(r)} ({r} stars)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Comment</label>
                <textarea
                  value={editingReview.comment}
                  onChange={(e) => setEditingReview({ ...editingReview, comment: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Profile Image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingReview.image}
                    onChange={(e) => setEditingReview({ ...editingReview, image: e.target.value })}
                    className="flex-1 border rounded px-3 py-2"
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
                            setEditingReview({ ...editingReview, image: url });
                          }
                        }
                      }}
                    />
                  </label>
                </div>
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Review
                </button>
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
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
