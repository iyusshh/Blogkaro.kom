import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function GET() {
  const posts = await prisma.post.findMany({ include: { author: true }, orderBy: { createdAt: 'desc' } })
  return Response.json(posts)
}

export async function POST(req: Request) {
  const s = getSession()
  if (!s) return new Response('Unauthorized', { status: 401 })
  const { title, content } = await req.json()
  if (!title || !content) return new Response('Bad request', { status: 400 })
  const post = await prisma.post.create({ data: { title, content, authorId: s.userId } })
  return Response.json(post, { status: 201 })
}
