import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const database = new PrismaClient()

export async function getAllPosts() {
  try {
    const allBlogPosts = await database.blogPost.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        comments: {
          include: {
            author: true,
          },
        },
        likes: true,
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
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
    const { title, caption, content, image, authorId } = await request.json()

    // Get user from session/auth
    let userId = authorId
    if (!userId) {
      const authHeader = request.headers.get('authorization')
      if (!authHeader) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      // In production, verify JWT token here
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const newBlogPost = await database.blogPost.create({
      data: {
        title,
        caption: caption || null,
        content,
        image: image || null,
        excerpt: caption || content.substring(0, 150),
        author: {
          connect: { id: userId },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true
          }
        },
        comments: true,
        likes: true,
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
    })

    return NextResponse.json(newBlogPost, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

export async function getPostById(postId: string) {
  try {
    const foundBlogPost = await database.blogPost.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true
          }
        },
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: true,
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
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
    const { title, content, caption, image } = await request.json()

    const updatedBlogPost = await database.blogPost.update({
      where: { id: postId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(caption !== undefined && { caption }),
        ...(image !== undefined && { image }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true
          }
        },
        comments: true,
        likes: true,
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

    return NextResponse.json({ success: true, message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
