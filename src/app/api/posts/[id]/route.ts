import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id }, include: { author: true } })
  if (!post) return new Response('Not found', { status: 404 })
  return Response.json(post)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const s = getSession(); if (!s) return new Response('Unauthorized', { status: 401 })
  const body = await req.json()
  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return new Response('Not found', { status: 404 })
  if (post.authorId !== s.userId) return new Response('Forbidden', { status: 403 })
  const updated = await prisma.post.update({ where: { id: params.id }, data: { title: body.title ?? post.title, content: body.content ?? post.content } })
  return Response.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const s = getSession(); if (!s) return new Response('Unauthorized', { status: 401 })
  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) return new Response('Not found', { status: 404 })
  if (post.authorId !== s.userId) return new Response('Forbidden', { status: 403 })
  await prisma.post.delete({ where: { id: params.id } })
  return new Response(null, { status: 204 })
}
