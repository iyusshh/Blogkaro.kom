import Feed from '@/components/Feed'
import NewPost from '@/components/NewPost'
import { getSession } from '@/lib/session'

export default function Home() {
  const session = getSession()
  return (
    <div className="space-y-6">
      <header className="mt-6">
        <h1 className="text-4xl font-extrabold tracking-tight">A vibrant blog for vibrant minds.</h1>
        <p className="text-white/70 mt-2">Write posts, like, and comment—secured with a hand‑rolled Google OAuth flow.</p>
      </header>
      {session && <NewPost />}
      <Feed />
    </div>
  )
}
