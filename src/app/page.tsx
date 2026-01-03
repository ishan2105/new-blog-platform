'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  avatar?: string
}

interface Post {
  id: string
  title: string
  caption?: string
  content: string
  image?: string
  author: User
  createdAt: string
  _count?: {
    likes: number
    comments: number
  }
  likes?: Array<{ userId: string }>
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchUserAndPosts()
  }, [])

  const fetchUserAndPosts = async () => {
    try {
      const userRes = await fetch('/api/auth/me')
      if (userRes.ok) {
        const userData = await userRes.json()
        setUser(userData)
      }

      const postsRes = await fetch('/api/posts')
      if (postsRes.ok) {
        const data = await postsRes.json()
        setPosts(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== postId))
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Instagram-style Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold italic text-gray-900">
            BlogHub
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/feed" className="text-gray-700 hover:text-black font-semibold">
              Feed
            </Link>
            <Link href="/create" className="text-gray-700 hover:text-black font-semibold">
              Create
            </Link>
            {user ? (
              <>
                <Link href={`/profile/${user.id}`} className="text-gray-700 hover:text-black font-semibold">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-black font-semibold">
                  Login
                </Link>
                <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        {!user && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to BlogHub</h1>
            <p className="text-gray-600 text-lg mb-6">Share your stories, thoughts, and inspiration with the world</p>
            <div className="flex gap-4 justify-center">
              <Link href="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
                Login
              </Link>
              <Link href="/register" className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold">
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* Feed Section */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 mt-4">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No posts yet. Start creating!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Post Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      {post.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{post.author.name}</p>
                    </div>
                  </div>
                  {user?.id === post.author.id && (
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-500 hover:text-red-700 font-semibold text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>

                {/* Post Content */}
                <div className="p-4">
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-96 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
                  {post.caption && (
                    <p className="text-gray-700 mb-3">{post.caption}</p>
                  )}
                  <p className="text-gray-600 text-sm mb-4">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Post Footer */}
                <div className="px-4 py-3 border-t border-gray-200 flex gap-6">
                  <button className="text-gray-600 hover:text-red-500 font-semibold flex items-center gap-2">
                    ❤️ Like ({post._count?.likes || 0})
                  </button>
                  <Link href={`/post/${post.id}`} className="text-gray-600 hover:text-blue-500 font-semibold flex items-center gap-2">
                    💬 Comments ({post._count?.comments || 0})
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
