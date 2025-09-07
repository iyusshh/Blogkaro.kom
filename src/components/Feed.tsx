import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function Feed() {
  const posts = await prisma.post.findMany({ include: { author: true, _count: { select: { likes: true, comments: true } } }, orderBy: { createdAt: 'desc' } })
  return (
    <div className="grid sm:grid-cols-2 gap-5 mt-4">
      {posts.map(p => (
        <Link key={p.id} href={`/post/${p.id}`} className="card block hover:scale-[1.01] transition">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <p className="text-white/70 line-clamp-3 mt-2">{p.content}</p>
          <div className="flex items-center justify-between text-sm text-white/60 mt-3">
            <span>By {p.author.name}</span>
            <span>❤ {p._count.likes} • 💬 {p._count.comments}</span>
          </div>
        </Link>
      ))}
      {posts.length===0 && <p className="text-white/60">No posts yet. Be the first!</p>}
    </div>
  )
}
