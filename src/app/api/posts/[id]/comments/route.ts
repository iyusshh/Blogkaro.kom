import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  // Get the current session
  const s = await getSession()
  if (!s || !s.userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Parse the request body
  const { body: text } = await req.json()
  if (!text || typeof text !== 'string') {
    return new Response('Bad request', { status: 400 })
  }

  try {
    // Create the comment in the database
    const comment = await prisma.comment.create({
      data: {
        postId: params.id,
        userId: s.userId,
        text,
      },
    })

    return new Response(JSON.stringify(comment), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error creating comment:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
