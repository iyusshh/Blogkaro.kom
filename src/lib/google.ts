export const google = {
  authBase: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  userInfo: 'https://www.googleapis.com/oauth2/v2/userinfo',
  scope: 'openid email profile'
}

export function authUrl() {
  const p = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: 'code',
    scope: google.scope,
    access_type: 'offline',
    prompt: 'consent'
  })
  return `${google.authBase}?${p.toString()}`
}
