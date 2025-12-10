"use client";

import { useState, useEffect } from "react";

export default function StatsManagement() {
  const [stats, setStats] = useState({
    happyCustomers: 0,
    destinationsServed: 0,
    yearsExperience: 0,
    toursCompleted: 0,
    visible: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setStats(data.data.stats || {
        happyCustomers: 0,
        destinationsServed: 0,
        yearsExperience: 0,
        toursCompleted: 0,
        visible: true,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveStats = async () => {
    try {
      const res = await fetch("/api/config");
      const configData = await res.json();
      const config = configData.data;

      config.stats = stats;

      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: config }),
      });

      alert("Stats updated successfully!");
    } catch (error) {
      console.error("Error saving stats:", error);
      alert("Failed to save stats");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
        <p className="text-gray-600 mt-1">Update company statistics displayed on the site</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveStats();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <label className="block text-sm font-medium text-blue-900 mb-2">
                😊 Happy Customers
              </label>
              <input
                type="number"
                value={stats.happyCustomers}
                onChange={(e) => setStats({ ...stats, happyCustomers: Number(e.target.value) })}
                className="w-full border rounded px-4 py-3 text-2xl font-bold text-blue-600"
                required
              />
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <label className="block text-sm font-medium text-green-900 mb-2">
                🌍 Destinations Served
              </label>
              <input
                type="number"
                value={stats.destinationsServed}
                onChange={(e) => setStats({ ...stats, destinationsServed: Number(e.target.value) })}
                className="w-full border rounded px-4 py-3 text-2xl font-bold text-green-600"
                required
              />
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <label className="block text-sm font-medium text-purple-900 mb-2">
                ⏰ Years of Experience
              </label>
              <input
                type="number"
                value={stats.yearsExperience}
                onChange={(e) => setStats({ ...stats, yearsExperience: Number(e.target.value) })}
                className="w-full border rounded px-4 py-3 text-2xl font-bold text-purple-600"
                required
              />
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <label className="block text-sm font-medium text-orange-900 mb-2">
                ✈️ Tours Completed
              </label>
              <input
                type="number"
                value={stats.toursCompleted}
                onChange={(e) => setStats({ ...stats, toursCompleted: Number(e.target.value) })}
                className="w-full border rounded px-4 py-3 text-2xl font-bold text-orange-600"
                required
              />
            </div>
          </div>

          <div className="flex items-center bg-gray-50 p-4 rounded-lg">
            <input
              type="checkbox"
              checked={stats.visible}
              onChange={(e) => setStats({ ...stats, visible: e.target.checked })}
              className="mr-3 w-5 h-5"
            />
            <label className="text-sm font-medium">Show statistics section on site</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Statistics
          </button>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> These numbers are displayed on your homepage to build trust with visitors. Keep them updated regularly!
        </p>
      </div>
    </div>
  );
}
