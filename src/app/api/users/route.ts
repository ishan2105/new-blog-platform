import { NextRequest } from 'next/server'
import {
  getAllUsers,
  createUser,
} from '@/controllers/user.controller'

export async function GET(request: NextRequest) {
  return await getAllUsers(request)
}

export async function POST(request: NextRequest) {
  return await createUser(request)
}
