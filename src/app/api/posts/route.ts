import { NextRequest } from 'next/server'
import { getAllPosts, createPost } from '@/controllers/post.controller'

export async function GET() {
  return await getAllPosts()
}

export async function POST(request: NextRequest) {
  return await createPost(request)
}
