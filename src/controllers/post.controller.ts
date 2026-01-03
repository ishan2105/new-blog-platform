import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const database = new PrismaClient()

export async function getAllPosts() {
  try {
    const allBlogPosts = await database.blogPost.findMany({
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(allBlogPosts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function createPost(request: NextRequest) {
  try {
    const { title, content, excerpt, authorId } = await request.json()

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: 'Title, content, and authorId are required' },
        { status: 400 }
      )
    }

    const newBlogPost = await database.blogPost.create({
      data: {
        title,
        content,
        excerpt: excerpt || content.substring(0, 150),
        author: {
          connect: { id: authorId },
        },
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(newBlogPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function getPostById(postId: string) {
  try {
    const foundBlogPost = await database.blogPost.findUnique({
      where: { id: postId },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!foundBlogPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(foundBlogPost)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function updatePost(postId: string, request: NextRequest) {
  try {
    const { title, content, excerpt } = await request.json()

    const updatedBlogPost = await database.blogPost.update({
      where: { id: postId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(excerpt && { excerpt }),
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(updatedBlogPost)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function deletePost(postId: string) {
  try {
    const deletedBlogPost = await database.blogPost.delete({
      where: { id: postId },
    })

    return NextResponse.json(deletedBlogPost)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
