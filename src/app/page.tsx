'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      if (!res.ok) {
        console.error('API error:', res.status, res.statusText)
        return
      }
      const data = await res.json()
      if (Array.isArray(data)) {
        setUsers(data)
      } else {
        console.error('Invalid data format:', data)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingId) {
        const res = await fetch('/api/users/' + editingId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        })
        if (res.ok) {
          setEditingId(null)
          setName('')
          setEmail('')
          setShowForm(false)
          await fetchUsers()
        } else {
          alert('Failed to update user')
          console.error('Update failed:', res.status)
        }
      } else {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email }),
        })
        if (res.ok) {
          setName('')
          setEmail('')
          setShowForm(false)
          await fetchUsers()
        } else {
          alert('Failed to create user')
          console.error('Create failed:', res.status)
        }
      }
    } catch (error) {
      console.error('Failed to save user:', error)
      alert('Error saving user: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user: User) => {
    setEditingId(user.id)
    setName(user.name)
    setEmail(user.email)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch('/api/users/' + id, { method: 'DELETE' })
        if (res.ok) {
          fetchUsers()
        }
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setName('')
    setEmail('')
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-950 bg-opacity-50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">User Manager Pro</h1>
          <div className="flex gap-4">
            <span className="text-slate-300 text-sm py-2">Total Users: <span className="font-bold text-blue-400">{users.length}</span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            User Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">System</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            A modern, full-stack CRUD application for managing users with real-time updates
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
              <div className="text-3xl font-bold mb-2">{users.length}</div>
              <div className="text-blue-100">Total Users</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
              <div className="text-3xl font-bold mb-2">∞</div>
              <div className="text-purple-100">Scalable</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Available</div>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
          >
            {showForm ? 'Hide Form' : 'Get Started'}
          </button>
        </div>
      </section>

      {/* Form Section */}
      {showForm && (
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 backdrop-blur">
              <h3 className="text-2xl font-bold text-white mb-6">
                {editingId ? 'Update User' : 'Create New User'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter user name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 transition"
                  >
                    {loading ? 'Saving...' : editingId ? 'Update User' : 'Create User'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Users List Section */}
      <section className="py-12 px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-8">Users Directory</h3>

          {users.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
              <p className="text-slate-400 text-lg mb-4">No users found</p>
              <p className="text-slate-500 text-sm">Create your first user to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-lg p-6 hover:border-blue-500 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{user.name}</h4>
                      <p className="text-slate-400 text-sm break-words">{user.email}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-600">
                    <button
                      onClick={() => handleEdit(user)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-700 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>Built with Next.js 16 • MongoDB • TypeScript • Tailwind CSS</p>
          <p className="mt-2">© 2025 Ishan Gupta • All Rights Reserved</p>
        </div>
      </footer>
    </div>
  )
}