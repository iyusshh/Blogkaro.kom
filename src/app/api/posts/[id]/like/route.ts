import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const s = getSession(); if (!s) return new Response('Unauthorized', { status: 401 })
  const existing = await prisma.like.findUnique({ where: { userId_postId: { userId: s.userId, postId: params.id } } }).catch(()=>null)
  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } })
  } else {
    await prisma.like.create({ data: { userId: s.userId, postId: params.id } })
  }
  const count = await prisma.like.count({ where: { postId: params.id } })
  return Response.json({ count })
}
