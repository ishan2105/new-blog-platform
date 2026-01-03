'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth'
import HeroSection from '@/components/HeroSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  author: {
    id: string
    name: string
  }
  createdAt: string
  comments: Array<{
    id: string
  }>
}

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
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
      <Header />
      
      <HeroSection
        subtitle="Welcome to our space"
        title="My space to share"
        description="Discover inspiring stories, insights, and perspectives from our community. Read articles about advertising, branding, creativity, and marketing that will transform the way you think."
        ctaText="Subscribe"
        ctaLink="/subscribe"
      />

      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-serif italic mb-16">Designers who changed the web</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {postsLoading ? (
              <div className="text-center col-span-3 py-12">
                <p className="text-gray-400">Loading articles...</p>
              </div>
            ) : recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                  className="group cursor-pointer"
                >
                  <div className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition duration-300">
                    <div className="p-8">
                      <h3 className="text-xl font-serif italic mb-3 group-hover:text-gray-300 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{post.author.name}</span>
                        <span>{post.comments.length} comments</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-400 mb-6">No articles yet. Be the first to write one!</p>
                <Link
                  href="/create"
                  className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition"
                >
                  Write Article
                </Link>
              </div>
            )}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/feed"
              className="text-gray-400 hover:text-white transition font-light border-b border-gray-600 hover:border-white"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
