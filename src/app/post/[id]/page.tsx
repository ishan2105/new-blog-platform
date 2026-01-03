'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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

export default function PostPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const postId = params.id as string

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPost()
  }, [postId])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${postId}`)
      if (res.ok) {
        const data = await res.json()
        setPost(data)
      } else {
        setError('Post not found')
      }
    } catch (err) {
      setError('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    if (!user) {
      router.push('/login')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          postId,
          authorId: user.id,
        }),
      })

      if (res.ok) {
        setNewComment('')
        fetchPost()
      } else {
        setError('Failed to add comment')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">📷</div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
          <Link href="/feed" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to Feed
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="text-3xl">📷</div>
            <h1 className="text-2xl font-bold text-blue-600">BlogHub</h1>
          </Link>
          <Link
            href="/feed"
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition"
          >
            ← Back to Feed
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Post */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          {/* Post Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                <h3 className="font-bold text-lg text-gray-900 mt-1">{post.author.name}</h3>
              </div>
              <Link
                href={`/profile/${post.author.id}`}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Profile →
              </Link>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-8 py-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-8 whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
            </h2>
          </div>

          {/* Add Comment Form */}
          {user ? (
            <div className="px-8 py-6 border-b border-gray-200">
              <form onSubmit={handleAddComment} className="space-y-4">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Add your comment</label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="What do you think?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition resize-none"
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            </div>
          ) : (
            <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
              <p className="text-gray-600 mb-4">
                <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                  Log in
                </Link>
                {' '}to comment on this post
              </p>
            </div>
          )}

          {/* Comments List */}
          {post.comments.length > 0 ? (
            <div className="space-y-0 divide-y divide-gray-200">
              {post.comments.map((comment) => (
                <div key={comment.id} className="px-8 py-6 hover:bg-gray-50 transition">
                  <p className="font-bold text-gray-900">{comment.author.name}</p>
                  <p className="text-gray-700 mt-2">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-8 py-12 text-center bg-gray-50">
              <p className="text-gray-500">No comments yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
