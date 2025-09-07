import { prisma } from '@/lib/db'

export default async function Comments({ postId }:{ postId:string }) {
  const comments = await prisma.comment.findMany({ where: { postId }, include: { user: true }, orderBy: { createdAt: 'asc' } })
  return (
    <ul className="space-y-3 mt-4">
      {comments.map(c => (
        <li key={c.id} className="bg-white/5 rounded-xl p-3">
          <p className="text-sm text-white/60">{c.user.name} • {new Date(c.createdAt).toLocaleString()}</p>
          <p>{c.body}</p>
        </li>
      ))}
      {comments.length===0 && <p className="text-white/60">No comments yet.</p>}
    </ul>
  )
}
