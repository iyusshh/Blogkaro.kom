'use client'
import { useState } from 'react'

export default function LikeButton({ postId, initialCount }:{ postId:string, initialCount:number }) {
  const [count, setCount] = useState(initialCount)
  const [busy, setBusy] = useState(false)
  async function toggle() {
    setBusy(true)
    const r = await fetch(`/api/posts/${postId}/like`, { method: 'POST' })
    setBusy(false)
    if (r.ok) setCount(await r.json().then(d=>d.count))
  }
  return <button onClick={toggle} disabled={busy} className="btn-ghost">❤ {count}</button>
}
