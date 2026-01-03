'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationCategories = [
    { label: 'All', href: '/feed' },
    { label: 'Advertising', href: '/feed?category=advertising' },
    { label: 'Branding', href: '/feed?category=branding' },
    { label: 'Creativity', href: '/feed?category=creativity' },
    { label: 'Marketing', href: '/feed?category=marketing' },
  ]

  return (
    <header className="bg-black text-white">
      <nav className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-serif italic hover:text-gray-300 transition">
            Draft
          </Link>
          
          <div className="hidden md:flex gap-8">
            {navigationCategories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition font-light"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/about" className="text-gray-300 hover:text-white transition font-light">
              About
            </Link>
          </div>

          <div className="hidden md:block">
            <Link
              href="/create"
              className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Subscribe
            </Link>
          </div>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-6 flex flex-col gap-4 pb-4">
            {navigationCategories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition font-light"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/about" className="text-gray-300 hover:text-white transition font-light">
              About
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
