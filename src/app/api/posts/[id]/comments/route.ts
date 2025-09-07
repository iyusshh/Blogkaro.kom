import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const comments = await prisma.comment.findMany({ where: { postId: params.id }, include: { user: true }, orderBy: { createdAt: 'asc' } })
  return Response.json(comments)
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const s = getSession(); if (!s) return new Response('Unauthorized', { status: 401 })
  const { body } = await req.json()
  if (!body) return new Response('Bad request', { status: 400 })
  const comment = await prisma.comment.create({ data: { postId: params.id, userId: s.userId, body } })
  return Response.json(comment, { status: 201 })
}
