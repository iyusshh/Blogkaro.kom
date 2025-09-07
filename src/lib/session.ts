import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const COOKIE = 'cb_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type Session = { userId: string, email: string, name: string, avatarUrl?: string }

export function setSession(s: Session) {
  const token = jwt.sign(s, process.env.JWT_SECRET!, { expiresIn: MAX_AGE })
  cookies().set(COOKIE, token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: MAX_AGE, path: '/' })
}

export function clearSession() {
  cookies().delete(COOKIE)
}

export function getSession(): Session | null {
  const c = cookies().get(COOKIE)?.value
  if (!c) return null
  try { return jwt.verify(c, process.env.JWT_SECRET!) as Session }
  catch { return null }
}
