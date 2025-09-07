import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import LikeButton from '@/components/LikeButton'
import CommentBox from '@/components/CommentBox'
import Comments from '@/components/Comments'

export default async function PostPage({ params }: { params: { id: string }}) {
  const post = await prisma.post.findUnique({ where: { id: params.id }, include: { author: true, likes: true } })
  if (!post) notFound()
  return (
    <article className="card mt-6 space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-white/70">{post.content}</p>
      <div className="flex items-center justify-between text-sm text-white/60">
        <span>By {post.author.name}</span>
        <span>{new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <LikeButton postId={post.id} initialCount={post.likes.length} />
      <CommentBox postId={post.id} />
      <Comments postId={post.id} />
    </article>
  )
}
