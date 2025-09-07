'use client'
import { useState } from 'react'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, content }) })
    setBusy(false)
    if (res.ok) { setTitle(''); setContent(''); location.reload() }
    else alert('Failed to create post')
  }

  return (
    <form onSubmit={submit} className="card space-y-3">
      <h3 className="text-xl font-semibold">Create a post</h3>
      <input placeholder="Catchy title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Write something awesome..." rows={5} value={content} onChange={e=>setContent(e.target.value)} />
      <button className="btn-primary" disabled={busy}>{busy? 'Publishing...' : 'Publish'}</button>
    </form>
  )
}
