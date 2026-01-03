import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const database = new PrismaClient()

export async function getPostComments(postId: string) {
  try {
    const allComments = await database.comment.findMany({
      where: { postId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(allComments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function createComment(request: NextRequest) {
  try {
    const { content, authorId, postId } = await request.json()

    if (!content || !authorId || !postId) {
      return NextResponse.json(
        { error: 'Content, authorId, and postId are required' },
        { status: 400 }
      )
    }

    const targetPost = await database.blogPost.findUnique({
      where: { id: postId },
    })

    if (!targetPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const newComment = await database.comment.create({
      data: {
        content,
        author: {
          connect: { id: authorId },
        },
        post: {
          connect: { id: postId },
        },
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}

export async function updateComment(commentId: string, request: NextRequest) {
  try {
    const { content } = await request.json()

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    const updatedComment = await database.comment.update({
      where: { id: commentId },
      data: { content },
      include: {
        author: true,
      },
    })

    return NextResponse.json(updatedComment)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 })
  }
}

export async function deleteComment(commentId: string) {
  try {
    const deletedComment = await database.comment.delete({
      where: { id: commentId },
    })

    return NextResponse.json(deletedComment)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
  }
}
