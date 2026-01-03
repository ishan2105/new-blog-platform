'use client'

import Link from 'next/link'
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
    <article className="bg-gray-900 rounded-lg hover:bg-gray-800 transition duration-300 border border-gray-800">
      <Link href={`/post/${id}`}>
        <div className="p-8 cursor-pointer">
          <h2 className="text-xl font-serif italic text-white mb-3 group-hover:text-gray-300 transition line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">{excerpt}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-light">{author.name}</span>
            <span className="font-light">{commentCount} comments</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
