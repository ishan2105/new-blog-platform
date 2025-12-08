import { NextRequest } from 'next/server'
import {
  getUserById,
  updateUser,
  deleteUser,
} from '@/controllers/user.controller'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return await getUserById(id)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return await updateUser(request, id)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return await deleteUser(request, id)
}
