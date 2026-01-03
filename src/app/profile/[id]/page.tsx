'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  excerpt: string
  createdAt: string
}

interface UserProfile {
  id: string
  name: string
  email: string
  posts: Post[]
}

export default function ProfilePage() {
  const params = useParams()
  const userId = params.id as string

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [userId])

  const fetchProfile = async () => {
    try {
      // Fetch user's posts
      const postsRes = await fetch(`/api/posts`)
      if (postsRes.ok) {
        const allPosts = await postsRes.json()
        const userPosts = allPosts.filter((post: Post & { author: { id: string } }) => post.author.id === userId)

        // Fetch user details from first post or use a dedicated endpoint
        if (userPosts.length > 0) {
          const user = userPosts[0].author
          setProfile({
            id: userId,
            name: user.name,
            email: 'user@bloghub.com',
            posts: userPosts,
          })
        }
      }
    } catch (err) {
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">📷</div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
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

      {/* Profile Header */}
      {profile && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div className="px-8 pb-8 relative">
              <div className="flex items-end gap-6 -mt-16 mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-6xl font-bold border-4 border-white shadow-lg">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{profile.name}</h1>
                  <p className="text-gray-600 text-lg">{profile.posts.length} Posts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {profile.posts.length === 0 ? 'No posts yet' : `${profile.posts.length} Post${profile.posts.length !== 1 ? 's' : ''}`}
            </h2>

            {profile.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.id}`}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
                  >
                    <div className="px-6 py-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-gray-500 text-lg">This user hasn't posted anything yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
          <Link href="/feed" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to Feed
          </Link>
        </div>
      )}
    </div>
  )
}
