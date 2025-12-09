import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | null = null

function getPrisma() {
  if (!prisma) {
    try {
      prisma = new PrismaClient()
      console.log('Prisma client initialized successfully')
    } catch (error) {
      console.error('Prisma initialization error:', error)
      throw error
    }
  }
  return prisma
}

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

export async function getAllUsers() {
  try {
    const prismaInstance = getPrisma()
    const usersList: unknown = await prismaInstance.user.findMany({
      select: { id: true, name: true, email: true },
    })
    return NextResponse.json(usersList)
  } catch (error: unknown) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function getUserById(id: string) {
  try {
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const prismaInstance = getPrisma()
    const user = await prismaInstance.user.findUnique({
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
  } catch (error: unknown) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function createUser(req: NextRequest) {
  try {
    const requestBody = await req.json()
    const { name, email } = requestBody

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const dataValidation = validateUserData(name, email)
    if (!dataValidation.valid) {
      return NextResponse.json(
        { error: dataValidation.error },
        { status: 400 }
      )
    }

    const prismaInstance = getPrisma()
    const existingUserData = await prismaInstance.user.findFirst({
      where: { email: email.toLowerCase() },
    })

    if (existingUserData) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    const newUser = await prismaInstance.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
      },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

export async function updateUser(req: NextRequest, id: string) {
  try {
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const requestBody = await req.json()
    const { name, email } = requestBody

    if (!name && !email) {
      return NextResponse.json(
        { error: 'At least one field (name or email) must be provided' },
        { status: 400 }
      )
    }

    const dataValidation = validateUserData(name, email)
    if (!dataValidation.valid) {
      return NextResponse.json(
        { error: dataValidation.error },
        { status: 400 }
      )
    }

    if (email) {
      const normalizedEmail = email.toLowerCase()
      const prismaInstance = getPrisma()
      const duplicateEmailUser = await prismaInstance.user.findFirst({
        where: {
          email: normalizedEmail,
          NOT: { id },
        },
      })

      if (duplicateEmailUser) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        )
      }
    }

    const dataToUpdate: Record<string, string> = {}
    if (name) dataToUpdate.name = name.trim()
    if (email) dataToUpdate.email = email.toLowerCase()

    const prismaInstance = getPrisma()
    const updatedUser = await prismaInstance.user.update({
      where: { id },
      data: dataToUpdate,
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(updatedUser)
  } catch (error: unknown) {
    if (error instanceof Object && 'code' in error && error.code === 'P2025') {
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

export async function deleteUser(req: NextRequest, id: string) {
  try {
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const prismaInstance = getPrisma()
    const deletedUserData = await prismaInstance.user.delete({
      where: { id },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(
      { message: 'User deleted successfully', user: deletedUserData },
      { status: 200 }
    )
  } catch (error: unknown) {
    if (error instanceof Object && 'code' in error && error.code === 'P2025') {
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

