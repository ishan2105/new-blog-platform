'use client'

import { useState } from 'react'

interface BlogPostCardProps {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    email: string
  }
  createdAt: string
  commentCount?: number
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  showActions?: boolean
}

export default function BlogPostCard({
  id,
  title,
  excerpt,
  author,
  createdAt,
  commentCount = 0,
  onDelete,
  onEdit,
  showActions = false,
}: BlogPostCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          onDelete?.(id)
        }
      } catch (error) {
        console.error('Error deleting post:', error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600">
          {title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {author.name.charAt(0).toUpperCase()}
            </span>
            <span className="font-medium">{author.name}</span>
          </div>
          <span>💬 {commentCount}</span>
        </div>

        <div className="text-xs text-gray-400 mb-4">
          {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        <div className="flex gap-2">
          <a
            href={`/blog/${id}`}
            className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
          >
            Read More
          </a>
          {showActions && (
            <>
              <button
                onClick={() => onEdit?.(id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
