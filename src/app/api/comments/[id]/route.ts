import { NextRequest } from 'next/server'
import { updateComment, deleteComment } from '@/controllers/comment.controller'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return await updateComment(id, request)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return await deleteComment(id)
}
