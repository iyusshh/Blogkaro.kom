'use client'
import { useState } from 'react'

export default function CommentBox({ postId }:{ postId: string }) {
  const [text, setText] = useState('')
  async function add(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    const r = await fetch(`/api/posts/${postId}/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ body: text }) })
    if (r.ok) { setText(''); location.reload() } else alert('Failed to comment')
  }
  return (
    <form onSubmit={add} className="flex gap-2">
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Add a comment..." />
      <button className="btn-primary" type="submit">Comment</button>
    </form>
  )
}
