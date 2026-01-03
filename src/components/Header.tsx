'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-100 transition">
            📝 BlogHub
          </Link>
          
          <div className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-blue-100 transition font-medium">
              Home
            </Link>
            <Link href="/blog" className="hover:text-blue-100 transition font-medium">
              All Posts
            </Link>
            <Link href="/dashboard" className="hover:text-blue-100 transition font-medium">
              Dashboard
            </Link>
            <Link href="/users" className="hover:text-blue-100 transition font-medium">
              Users
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4">
            <Link href="/" className="hover:text-blue-100 transition">
              Home
            </Link>
            <Link href="/blog" className="hover:text-blue-100 transition">
              All Posts
            </Link>
            <Link href="/dashboard" className="hover:text-blue-100 transition">
              Dashboard
            </Link>
            <Link href="/users" className="hover:text-blue-100 transition">
              Users
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
