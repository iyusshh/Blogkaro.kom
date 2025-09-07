import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const s = getSession()
  if (!s) redirect('/')
  const [posts, likes, comments] = await Promise.all([
    prisma.post.findMany({ where: { authorId: s.userId }, orderBy: { createdAt: 'desc' } }),
    prisma.like.findMany({ where: { userId: s.userId }, include: { post: true }, orderBy: { createdAt: 'desc' } }),
    prisma.comment.findMany({ where: { userId: s.userId }, include: { post: true }, orderBy: { createdAt: 'desc' } }),
  ])
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">
      <section className="card">
        <h2 className="text-xl font-semibold mb-3">My Posts</h2>
        <ul className="space-y-2">
          {posts.map(p => (
            <li key={p.id} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
              <span className="truncate">{p.title}</span>
              <Link href={`/post/${p.id}`} className="btn-ghost">Open</Link>
            </li>
          ))}
          {posts.length===0 && <p className="text-white/50">No posts yet.</p>}
        </ul>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-3">My Likes</h2>
        <ul className="space-y-2">
          {likes.map(l => (
            <li key={l.id} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
              <span className="truncate">{l.post.title}</span>
              <Link href={`/post/${l.postId}`} className="btn-ghost">Open</Link>
            </li>
          ))}
          {likes.length===0 && <p className="text-white/50">No likes yet.</p>}
        </ul>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-3">My Comments</h2>
        <ul className="space-y-2">
          {comments.map(c => (
            <li key={c.id} className="bg-white/5 rounded-lg p-3">
              <p className="text-sm text-white/70 mb-1">On <Link className="underline" href={`/post/${c.postId}`}>{c.post.title}</Link></p>
              <p>{c.body}</p>
            </li>
          ))}
          {comments.length===0 && <p className="text-white/50">No comments yet.</p>}
        </ul>
      </section>
    </div>
  )
}
