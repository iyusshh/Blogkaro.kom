import { authUrl } from '@/lib/google'

export async function GET() {
  return Response.redirect(authUrl(), 302)
}
