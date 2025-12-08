import prisma from '../prisma/client'

export interface IUser {
  id: string
  name: string
  email: string
}

// Create user
export async function createUser(name: string, email: string, password?: string): Promise<IUser> {
  return await prisma.user.create({
    data: { name, email },
    select: { id: true, name: true, email: true },
  })
}

// Get all users
export async function getAllUsers(): Promise<IUser[]> {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true },
  })
}

// Get user by ID
export async function getUserById(id: string): Promise<IUser | null> {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  })
}

// Update user
export async function updateUser(id: string, name?: string, email?: string): Promise<IUser> {
  return await prisma.user.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
    },
    select: { id: true, name: true, email: true },
  })
}

// Delete user
export async function deleteUser(id: string): Promise<IUser> {
  return await prisma.user.delete({
    where: { id },
    select: { id: true, name: true, email: true },
  })
}
