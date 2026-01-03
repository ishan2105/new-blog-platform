'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
}

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: User
  createdAt: string
  comments: Array<{ id: string }>
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [activeTab, setActiveTab] = useState<'users' | 'posts' | 'create'>('users')
  const [loading, setLoading] = useState(true)

  // User form state
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  // Post form state
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postExcerpt, setPostExcerpt] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [usersRes, postsRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/posts'),
      ])

      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(Array.isArray(usersData) ? usersData : [])
        if (Array.isArray(usersData) && usersData.length > 0) {
          setSelectedAuthor(usersData[0].id)
        }
      }

      if (postsRes.ok) {
        const postsData = await postsRes.json()
        setPosts(Array.isArray(postsData) ? postsData : [])
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  // User handlers
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName.trim() || !userEmail.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, email: userEmail }),
      })

      if (res.ok) {
        const newUser = await res.json()
        setUsers([...users, newUser])
        setUserName('')
        setUserEmail('')
      }
    } catch (error) {
      console.error('Error creating user:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure?')) {
      try {
        const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' })
        if (res.ok) {
          setUsers(users.filter((u) => u.id !== userId))
        }
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  // Post handlers
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postTitle.trim() || !postContent.trim() || !selectedAuthor) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
          excerpt: postExcerpt || postContent.substring(0, 150),
          authorId: selectedAuthor,
        }),
      })

      if (res.ok) {
        const newPost = await res.json()
        setPosts([newPost, ...posts])
        setPostTitle('')
        setPostContent('')
        setPostExcerpt('')
        setActiveTab('posts')
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
        if (res.ok) {
          setPosts(posts.filter((p) => p.id !== postId))
        }
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 w-full flex-1">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-bold border-b-2 transition ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 font-bold border-b-2 transition ${
              activeTab === 'posts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            All Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 font-bold border-b-2 transition ${
              activeTab === 'create'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Create Post
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Add New User</h2>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {submitting ? 'Adding...' : 'Add User'}
                  </button>
                </form>
              </div>
            </div>

            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Users</h2>
              {loading ? (
                <p className="text-gray-600">Loading...</p>
              ) : users.length > 0 ? (
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 bg-white p-6 rounded-lg">No users yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div>
            <h2 className="text-xl font-bold mb-4">All Posts</h2>
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : posts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">By {post.author.name}</p>
                    <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/blog/${post.id}`}
                        className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 bg-white p-6 rounded-lg">No posts yet.</p>
            )}
          </div>
        )}

        {/* Create Post Tab */}
        {activeTab === 'create' && (
          <div className="max-w-2xl">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
              {users.length === 0 ? (
                <p className="text-red-600 mb-4">Please add at least one user before creating a post.</p>
              ) : (
                <form onSubmit={handleAddPost} className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-2">Author</label>
                    <select
                      value={selectedAuthor}
                      onChange={(e) => setSelectedAuthor(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Post title"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Content</label>
                    <textarea
                      placeholder="Write your post content..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Excerpt (optional)</label>
                    <input
                      type="text"
                      placeholder="Short summary of your post"
                      value={postExcerpt}
                      onChange={(e) => setPostExcerpt(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {submitting ? 'Publishing...' : 'Publish Post'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
