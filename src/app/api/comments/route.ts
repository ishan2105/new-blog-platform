import { NextRequest } from 'next/server'
import { createComment } from '@/controllers/comment.controller'

export async function POST(request: NextRequest) {
  return await createComment(request)
}
