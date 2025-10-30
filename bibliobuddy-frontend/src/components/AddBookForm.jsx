import { useState } from 'react'

export default function AddBookForm({ onAdd }) {
  const [form, setForm] = useState({ book_id: '', title: '', author: '', price: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.book_id) e.book_id = 'Required'
    if (!form.title) e.title = 'Required'
    if (!form.author) e.author = 'Required'
    if (form.price === '') e.price = 'Required'
    else if (Number.isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Must be a positive number'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        // If book_id is numeric, send as number; else send as string
        book_id: /^\d+$/.test(String(form.book_id)) ? Number(form.book_id) : form.book_id,
      }
      await onAdd(payload)
      setForm({ book_id: '', title: '', author: '', price: '' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label" htmlFor="book_id">Book ID</label>
        <input id="book_id" className="input" placeholder="e.g. 101" value={form.book_id} onChange={e => handleChange('book_id', e.target.value)} />
        {errors.book_id && <p className="text-red-600 text-sm mt-1">{errors.book_id}</p>}
      </div>
      <div>
        <label className="label" htmlFor="title">Title</label>
        <input id="title" className="input" placeholder="e.g. The Pragmatic Programmer" value={form.title} onChange={e => handleChange('title', e.target.value)} />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </div>
      <div>
        <label className="label" htmlFor="author">Author</label>
        <input id="author" className="input" placeholder="e.g. Andrew Hunt" value={form.author} onChange={e => handleChange('author', e.target.value)} />
        {errors.author && <p className="text-red-600 text-sm mt-1">{errors.author}</p>}
      </div>
      <div>
        <label className="label" htmlFor="price">Price</label>
        <input id="price" type="number" min="0.01" step="0.01" className="input" placeholder="e.g. 499" value={form.price} onChange={e => handleChange('price', e.target.value)} />
        {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
      </div>
      <div className="flex justify-end">
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add Book'}
        </button>
      </div>
    </form>
  )
}
