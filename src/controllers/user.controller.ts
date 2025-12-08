import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

// Input validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateUserData(name?: string, email?: string): { valid: boolean; error?: string } {
  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    return { valid: false, error: 'Name must be a non-empty string' }
  }
  if (email !== undefined && !validateEmail(email)) {
    return { valid: false, error: 'Invalid email format' }
  }
  return { valid: true }
}

// Get all users
export async function getAllUsers(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    })
    return NextResponse.json(users)
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// Get user by ID
export async function getUserById(id: string) {
  try {
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error: any) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// Create user
export async function createUser(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const validation = validateUserData(name, email)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
      },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

// Update user
export async function updateUser(req: NextRequest, id: string) {
  try {
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const { name, email } = body

    // At least one field must be provided
    if (!name && !email) {
      return NextResponse.json(
        { error: 'At least one field (name or email) must be provided' },
        { status: 400 }
      )
    }

    const validation = validateUserData(name, email)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Check if new email exists (if email is being updated)
    if (email) {
      const normalizedEmail = email.toLowerCase()
      const existingUser = await prisma.user.findFirst({
        where: {
          email: normalizedEmail,
          NOT: { id },
        },
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: any = {}
    if (name) updateData.name = name.trim()
    if (email) updateData.email = email.toLowerCase()

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// Delete user
export async function deleteUser(req: NextRequest, id: string) {
  try {
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(
      { message: 'User deleted successfully', user: deletedUser },
      { status: 200 }
    )
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
