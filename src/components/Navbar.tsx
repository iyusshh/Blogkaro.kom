import { cookies } from "next/headers"
import { LogoutButton } from "./LogoutButton"

export default function Navbar() {
  const cookieStore = cookies()
  const session = cookieStore.get("cb_session") // session cookie we set at login

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
      {/* Left side: Brand */}
      <h1 className="text-2xl font-bold">ColorBurst</h1>

      {/* Right side: Login / Logout */}
      <div>
        {session ? (
          <LogoutButton />
        ) : (
          <a
            href="/api/auth/login"
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
          >
            Login
          </a>
        )}
      </div>
    </nav>
  )
}
