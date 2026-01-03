'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <p className="text-sm">Interactive blogging platform with full-stack capabilities.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Features</h3>
            <ul className="text-sm space-y-2">
              <li>Create Blog Posts</li>
              <li>User Management</li>
              <li>Comments System</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Tech Stack</h3>
            <ul className="text-sm space-y-2">
              <li>Next.js 15</li>
              <li>MongoDB</li>
              <li>Prisma ORM</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <p className="text-sm">GitHub: ishan2105</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2026 BlogHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
