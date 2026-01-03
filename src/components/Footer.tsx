'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 mt-24 py-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-white font-serif italic text-lg mb-6">Pages</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="hover:text-white transition">
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif italic text-lg mb-6">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/feed" className="hover:text-white transition">
                  All
                </Link>
              </li>
              <li>
                <Link href="/feed?category=advertising" className="hover:text-white transition">
                  Advertising
                </Link>
              </li>
              <li>
                <Link href="/feed?category=branding" className="hover:text-white transition">
                  Branding
                </Link>
              </li>
              <li>
                <Link href="/feed?category=creativity" className="hover:text-white transition">
                  Creativity
                </Link>
              </li>
              <li>
                <Link href="/feed?category=marketing" className="hover:text-white transition">
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif italic text-lg mb-6">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://twitter.com" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:contact@example.com" className="hover:text-white transition">
                  Email me
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif italic text-lg mb-6">Admin</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-white transition">
                  Style guide
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-white transition">
                  Licenses
                </Link>
              </li>
              <li>
                <Link href="/password" className="hover:text-white transition">
                  Password
                </Link>
              </li>
              <li>
                <Link href="/404" className="hover:text-white transition">
                  404
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-6 text-center text-sm">
          <p>Built by Ishan Gupta • © 2026 • Powered by Next.js</p>
        </div>
      </div>
    </footer>
  )
}
