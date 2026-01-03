'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth'

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
    content: string
    author: { name: string }
  }>
}

export default function FeedPage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [feedLoading, setFeedLoading] = useState(true)
  const [newComment, setNewComment] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
      return
    }

    if (user) {
      fetchPosts()
    }
  }, [user, isLoading, router])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      if (res.ok) {
        const data = await res.json()
        setPosts(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setFeedLoading(false)
    }
  }

  const handleAddComment = async (postId: string, content: string) => {
    if (!content.trim()) return

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          postId,
          authorId: user?.id,
        }),
      })

      if (res.ok) {
        setNewComment({ ...newComment, [postId]: '' })
        fetchPosts()
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (isLoading || feedLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">📷</div>
          <p className="text-gray-600 text-lg">Loading your feed...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📷</div>
            <h1 className="text-2xl font-bold text-blue-600">BlogHub</h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-semibold">{user?.name}</span>
            <Link
              href="/create"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition"
            >
              Create Post
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No posts yet</h2>
            <p className="text-gray-600 mb-6">Be the first to share your story!</p>
            <Link
              href="/create"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full hover:shadow-lg transition"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
                {/* Post Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{post.author.name}</h3>
                    <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Link
                    href={`/profile/${post.author.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    View Profile →
                  </Link>
                </div>

                {/* Post Content */}
                <div className="px-6 py-6">
                  <Link href={`/post/${post.id}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-700 leading-relaxed mb-4">{post.excerpt}</p>
                  <Link
                    href={`/post/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold inline-block"
                  >
                    Read More →
                  </Link>
                </div>

                {/* Comments Section */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  {post.comments.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 font-semibold mb-3">{post.comments.length} Comments</p>
                      <div className="space-y-3">
                        {post.comments.slice(0, 2).map((comment) => (
                          <div key={comment.id} className="bg-white p-3 rounded-lg">
                            <p className="font-semibold text-sm text-gray-900">{comment.author.name}</p>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                        ))}
                        {post.comments.length > 2 && (
                          <Link
                            href={`/post/${post.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-semibold inline-block"
                          >
                            View all {post.comments.length} comments →
                          </Link>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment[post.id] || ''}
                      onChange={(e) =>
                        setNewComment({ ...newComment, [post.id]: e.target.value })
                      }
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(post.id, newComment[post.id] || '')
                        }
                      }}
                      className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none text-sm"
                    />
                    <button
                      onClick={() => handleAddComment(post.id, newComment[post.id] || '')}
                      className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-semibold text-sm"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
