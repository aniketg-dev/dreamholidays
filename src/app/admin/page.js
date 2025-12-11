import Link from "next/link";

export default function AdminDashboard() {
  const sections = [
    {
      title: "Hero Slides",
      description: "Manage homepage hero carousel slides",
      href: "/admin/hero",
      icon: "🖼️",
      color: "bg-blue-500",
    },
    {
      title: "Packages",
      description: "Add, edit, or remove travel packages",
      href: "/admin/packages",
      icon: "📦",
      color: "bg-green-500",
    },
    {
      title: "Gallery",
      description: "Manage destination gallery images",
      href: "/admin/gallery",
      icon: "🎨",
      color: "bg-purple-500",
    },
    {
      title: "Testimonials",
      description: "Manage customer reviews and testimonials",
      href: "/admin/testimonials",
      icon: "💬",
      color: "bg-yellow-500",
    },
    {
      title: "Stats",
      description: "Update company statistics",
      href: "/admin/stats",
      icon: "📈",
      color: "bg-red-500",
    },
    {
      title: "Social Media",
      description: "Manage social media posts and links",
      href: "/admin/social",
      icon: "📱",
      color: "bg-pink-500",
    },
    {
      title: "Settings",
      description: "General site settings and configuration",
      href: "/admin/settings",
      icon: "⚙️",
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your Charika Tours and Travels website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 border border-gray-200 hover:border-blue-500"
          >
            <div className="flex items-center mb-4">
              <div className={`${section.color} text-white p-3 rounded-lg text-2xl`}>
                {section.icon}
              </div>
              <h2 className="ml-4 text-xl font-semibold text-gray-900">{section.title}</h2>
            </div>
            <p className="text-gray-600">{section.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">📝 Quick Tips</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
          <li>• All changes are saved to <code className="bg-blue-100 px-2 py-1 rounded">site-config.json</code></li>
          <li>• Images are uploaded to their respective folders in <code className="bg-blue-100 px-2 py-1 rounded">/public</code></li>
          <li>• Changes appear immediately on the live site</li>
          <li>• Use the &quot;View Site&quot; link to preview your changes</li>
        </ul>
      </div>
    </div>
  );
}
