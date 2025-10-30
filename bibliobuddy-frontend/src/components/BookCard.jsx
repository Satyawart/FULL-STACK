import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BookCard({ book, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ title: book.title, author: book.author, price: book.price })
  const [submitting, setSubmitting] = useState(false)

  const handleEdit = () => {
    setForm({ title: book.title, author: book.author, price: book.price })
    setEditing(true)
  }

  const handleSave = async () => {
    if (!form.title || !form.author || !form.price || Number(form.price) <= 0) {
      alert('All fields required and price must be positive')
      return
    }
    setSubmitting(true)
    await onUpdate(book.book_id, { ...form, price: Number(form.price) })
    setSubmitting(false)
    setEditing(false)
  }

  const handleDelete = () => {
    if (confirm(`Delete "${book.title}"?`)) {
      onDelete(book.book_id)
    }
  }

  return (
    <>
      <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2 }} className="card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-poppins text-lg">{book.title}</h3>
            <p className="text-sm text-black">by {book.author}</p>
            <p className="mt-2 font-medium">₹ {book.price}</p>
            <p className="text-xs text-black mt-1">ID: {book.book_id}</p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary text-sm px-3 py-1" onClick={handleEdit} title="Edit">Edit</button>
            <button className="btn btn-primary text-sm px-3 py-1" onClick={handleDelete} title="Delete">Delete</button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={() => setEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-poppins text-xl mb-4">Edit Book</h3>
              <div className="space-y-3">
                <div>
                  <label className="label">Title</label>
                  <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                  <label className="label">Author</label>
                  <input className="input" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                </div>
                <div>
                  <label className="label">Price</label>
                  <input className="input" type="number" min="0.01" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="flex gap-2 justify-end">
                  <button className="btn btn-primary" onClick={() => setEditing(false)} disabled={submitting}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSave} disabled={submitting}>{submitting ? 'Saving…' : 'Save'}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
