import { getSession } from '@/lib/session'
export async function GET() {
  const s = getSession()
  return Response.json(s || { user: null })
}
