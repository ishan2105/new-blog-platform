'use client'

import { useState } from 'react'

interface CommentProps {
  id: string
  content: string
  author: {
    name: string
    email: string
  }
  createdAt: string
  canEdit?: boolean
  onDelete?: (id: string) => void
  onEdit?: (id: string, content: string) => void
}

export default function CommentComponent({
  id,
  content,
  author,
  createdAt,
  canEdit = false,
  onDelete,
  onEdit,
}: CommentProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('Delete this comment?')) {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/comments/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          onDelete?.(id)
        }
      } catch (error) {
        console.error('Error deleting comment:', error)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedContent }),
      })
      if (response.ok) {
        onEdit?.(id, editedContent)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating comment:', error)
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
            {author.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{author.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="mb-3">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-400 text-white rounded text-sm hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-700 mb-3">{content}</p>
          {canEdit && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-sm text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
