import './globals.css'
import Navbar from "@/components/Navbar"
import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export const metadata = { title: 'ColorBurst Blog', description: 'Custom Google OAuth Blog' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('cb_session')?.value
  let user: any = null
  if (token) try { user = jwt.decode(token) } catch {}
  return (
    <html lang="en">
      <body>
        <nav className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">ColorBurst</Link>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/dashboard" className="btn-ghost">Dashboard</Link>
              {user ? (
                <>
                  {user?.avatarUrl && <Image src={user.avatarUrl} alt="me" width={28} height={28} className="rounded-full" />}
                  <span className="text-sm text-white/80">{user?.name}</span>
                  <a className="btn-primary" href="/api/auth/logout">Logout</a>
                </>
              ) : (
                <a className="btn-primary" href="/api/auth/login">Login with Google</a>
              )}
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto p-4">{children}</main>
        <footer className="text-center text-white/50 py-8">© ColorBurst • Built with Next.js + Prisma</footer>
      </body>
    </html>
  )
}
