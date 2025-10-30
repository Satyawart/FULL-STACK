import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AddBookForm from './components/AddBookForm.jsx'
import BookList from './components/BookList.jsx'
import SearchBar from './components/SearchBar.jsx'
import Toast from './components/Toast.jsx'
import api from './lib/api.js'

export default function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)
  const [query, setQuery] = useState('')

  const loadBooks = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get('/books')
      const data = Array.isArray(res.data) ? res.data : (res.data?.books || [])
      setBooks(data)
    } catch (e) {
      setError(e.prettyMessage || 'Connection Error: Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadBooks() }, [])

  const handleAdd = async (payload) => {
    try {
      const res = await api.post('/books', payload)
      setBooks((prev) => [res.data, ...prev])
      setToast({ type: 'success', message: 'Book added successfully' })
    } catch (e) {
      setToast({ type: 'error', message: e.prettyMessage || 'Failed to add book' })
    }
  }

  const handleUpdate = async (bookId, payload) => {
    try {
      const res = await api.put(`/books/${bookId}`, payload)
      setBooks((prev) => prev.map(b => b.book_id === bookId ? res.data : b))
      setToast({ type: 'success', message: 'Book updated successfully' })
    } catch (e) {
      setToast({ type: 'error', message: e.prettyMessage || 'Failed to update book' })
    }
  }

  const handleDelete = async (bookId) => {
    try {
      await api.delete(`/books/${bookId}`)
      setBooks((prev) => prev.filter(b => b.book_id !== bookId))
      setToast({ type: 'success', message: 'Book deleted successfully' })
    } catch (e) {
      setToast({ type: 'error', message: e.prettyMessage || 'Failed to delete book' })
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return books
    return books.filter(b => (
      String(b.book_id).toLowerCase().includes(q) ||
      (b.title || '').toLowerCase().includes(q) ||
      (b.author || '').toLowerCase().includes(q)
    ))
  }, [books, query])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-10 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.section className="md:col-span-1 card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-poppins text-xl md:text-2xl mb-4">Add New Book</h2>
            <AddBookForm onAdd={handleAdd} />
          </motion.section>

          <section className="md:col-span-2 flex flex-col gap-4">
            <div className="card">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="font-poppins text-xl md:text-2xl">Your Library</h2>
                <SearchBar value={query} onChange={setQuery} />
              </div>
            </div>

            <BookList 
              books={filtered}
              loading={loading}
              error={error}
              onRetry={loadBooks}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </main>

      <Footer />

      <AnimatePresence>{toast && (
        <Toast {...toast} onClose={() => setToast(null)} />
      )}</AnimatePresence>
    </div>
  )
}
