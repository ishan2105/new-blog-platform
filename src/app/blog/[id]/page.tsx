'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Comment from '@/components/Comment'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: {
    id: string
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    email: string
  }
  createdAt: string
}

export default function PostDetailPage() {
  const params = useParams()
  const postId = params.id as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [commentContent, setCommentContent] = useState('')
  const [submittingComment, setSubmittingComment] = useState(false)
  const [currentUserId, setCurrentUserId] = useState('')

  useEffect(() => {
    fetchPost()
    // In a real app, you'd get this from authentication
    setCurrentUserId('test-user-1')
  }, [postId])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/posts/${postId}`)
      if (res.ok) {
        const data = await res.json()
        setPost(data)
      }
    } catch (error) {
      console.error('Failed to fetch post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim()) return

    setSubmittingComment(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: commentContent,
          postId,
          authorId: currentUserId,
        }),
      })
      if (res.ok) {
        const newComment = await res.json()
        setPost(
          post
            ? {
                ...post,
                comments: [newComment, ...post.comments],
              }
            : null
        )
        setCommentContent('')
      }
    } catch (error) {
      console.error('Failed to add comment:', error)
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleDeleteComment = (commentId: string) => {
    if (post) {
      setPost({
        ...post,
        comments: post.comments.filter((c) => c.id !== commentId),
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin text-4xl">⏳</div>
            <p className="text-gray-600 mt-4">Loading post...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Post not found.</p>
            <Link href="/blog" className="text-blue-600 font-bold hover:text-blue-800">
              Back to all posts
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1">
        <Link href="/blog" className="text-blue-600 font-bold hover:text-blue-800 mb-6 inline-block">
          ← Back to all posts
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <header className="mb-8 border-b pb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.author.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {post.updatedAt !== post.createdAt && (
                  <p className="text-xs text-gray-500">
                    Updated:{' '}
                    {new Date(post.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-8">Comments ({post.comments.length})</h2>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8 pb-8 border-b">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              type="submit"
              disabled={submittingComment || !commentContent.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submittingComment ? 'Posting...' : 'Post Comment'}
            </button>
          </form>

          {/* Comments List */}
          {post.comments.length > 0 ? (
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  content={comment.content}
                  author={comment.author}
                  createdAt={comment.createdAt}
                  canEdit={comment.author.id === currentUserId}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No comments yet. Be the first to comment!</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
