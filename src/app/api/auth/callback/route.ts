import { google } from '@/lib/google'
import { prisma } from '@/lib/db'
import { setSession } from '@/lib/session'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  if (!code) return new Response('Missing code', { status: 400 })

  // Exchange code for tokens
  const tokenRes = await fetch(google.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code'
    })
  })
  if (!tokenRes.ok) return new Response('Token exchange failed', { status: 401 })
  const tokens = await tokenRes.json() as any

  // Fetch user profile
  const uRes = await fetch(google.userInfo, { headers: { Authorization: `Bearer ${tokens.access_token}` } })
  if (!uRes.ok) return new Response('Failed userinfo', { status: 401 })
  const u = await uRes.json() as any

  // Upsert user
  const user = await prisma.user.upsert({
    where: { email: u.email },
    update: { name: u.name, avatarUrl: u.picture },
    create: { email: u.email, name: u.name, avatarUrl: u.picture }
  })

  setSession({ userId: user.id, email: user.email, name: user.name, avatarUrl: user.avatarUrl || undefined })

  return Response.redirect(new URL('/', url).toString(), 302)
}
