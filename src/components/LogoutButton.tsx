"use client"

export function LogoutButton() {
  return (
    <button
      onClick={() => {
        window.location.href = "/api/auth/logout"
      }}
      className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  )
}
