'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
  }
  comments: Array<{
    id: string
  }>
}

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [postsLoading, setPostsLoading] = useState(true)

  useEffect(() => {
    fetchRecentPosts()
  }, [])

  const fetchRecentPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      if (res.ok) {
        const data = await res.json()
        setRecentPosts(Array.isArray(data) ? data.slice(0, 3) : [])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setPostsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-900">
        <nav className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-serif italic">Draft</div>
            <div className="hidden md:flex gap-8">
              <a href="#" className="text-gray-300 hover:text-white">All</a>
              <a href="#" className="text-gray-300 hover:text-white">Advertising</a>
              <a href="#" className="text-gray-300 hover:text-white">Branding</a>
              <a href="#" className="text-gray-300 hover:text-white">About</a>
            </div>
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium">
              Subscribe
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-black py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-400 text-sm uppercase mb-4">Welcome to our space</p>
          <h1 className="text-6xl font-serif italic mb-6">My space to share</h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-8">
            Discover inspiring stories, insights, and perspectives from our community.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-medium">
            Subscribe
          </button>
        </div>
      </section>

      {/* Articles Section */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif italic mb-16">Designers who changed the web</h2>
          
          {postsLoading ? (
            <p className="text-gray-400">Loading articles...</p>
          ) : recentPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-12">
              {recentPosts.map((post) => (
                <div key={post.id} className="bg-gray-900 rounded-lg p-8 hover:bg-gray-800 transition">
                  <h3 className="text-xl font-serif italic mb-3">{post.title}</h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{post.author.name}</span>
                    <span>{post.comments.length} comments</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No articles yet</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-8">
            <div>
              <h3 className="text-white font-italic mb-4">Pages</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">All</a></li>
                <li><a href="#" className="hover:text-white">Advertising</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Email</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-4">Admin</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Settings</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 text-center text-gray-400">
            <p>© 2026 Built by Ishan Gupta</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
