import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

let prismaInstance: PrismaClient | null = null

function initializePrismaClient() {
  if (!prismaInstance) {
    try {
      prismaInstance = new PrismaClient()
    } catch (error) {
      throw error
    }
  }
  return prismaInstance
}

function isValidEmailAddress(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

function checkUserDataValidity(name?: string, email?: string): { valid: boolean; error?: string } {
  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    return { valid: false, error: 'Name must be a non-empty string' }
  }
  if (email !== undefined && !isValidEmailAddress(email)) {
    return { valid: false, error: 'Invalid email format' }
  }
  return { valid: true }
}

export async function getAllUsers() {
  try {
    const database = initializePrismaClient()
    const allUsers = await database.user.findMany({
      select: { id: true, name: true, email: true },
    })
    return NextResponse.json(allUsers)
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function getUserById(userId: string) {
  try {
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const database = initializePrismaClient()
    const foundUser = await database.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    })

    if (!foundUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(foundUser)
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function createUser(request: NextRequest) {
  try {
    const requestData = await request.json()
    const { name, email } = requestData

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const validation = checkUserDataValidity(name, email)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const database = initializePrismaClient()
    const existingUser = await database.user.findFirst({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    const createdUser = await database.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: 'default_password_123',
      },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(createdUser, { status: 201 })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

export async function updateUser(request: NextRequest, userId: string) {
  try {
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const requestData = await request.json()
    const { name, email } = requestData

    if (!name && !email) {
      return NextResponse.json(
        { error: 'At least one field (name or email) must be provided' },
        { status: 400 }
      )
    }

    const validation = checkUserDataValidity(name, email)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    if (email) {
      const normalizedEmailAddress = email.toLowerCase()
      const database = initializePrismaClient()
      const userWithSameEmail = await database.user.findFirst({
        where: {
          email: normalizedEmailAddress,
          NOT: { id: userId },
        },
      })

      if (userWithSameEmail) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, string> = {}
    if (name) updateData.name = name.trim()
    if (email) updateData.email = email.toLowerCase()

    const database = initializePrismaClient()
    const modifiedUser = await database.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(modifiedUser)
  } catch (error: unknown) {
    if (error instanceof Object && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

export async function deleteUser(request: NextRequest, userId: string) {
  try {
    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const database = initializePrismaClient()
    const removedUser = await database.user.delete({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json(
      { message: 'User deleted successfully', user: removedUser },
      { status: 200 }
    )
  } catch (error: unknown) {
    if (error instanceof Object && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}

