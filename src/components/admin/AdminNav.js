"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function AdminNav({ session }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/hero", label: "Hero Slides", icon: "🖼️" },
    { href: "/admin/packages", label: "Packages", icon: "📦" },
    { href: "/admin/gallery", label: "Gallery", icon: "🎨" },
    { href: "/admin/testimonials", label: "Testimonials", icon: "💬" },
    { href: "/admin/stats", label: "Stats", icon: "📈" },
    { href: "/admin/social", label: "Social Media", icon: "📱" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="flex items-center">
              <Image
                src="/logo/dhlogo-bg.png"
                alt="Charika Tours and Travels"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-sm font-semibold text-gray-600">Admin</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              View Site →
            </Link>
            <div className="text-sm text-gray-600">
              {session?.user?.username}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
