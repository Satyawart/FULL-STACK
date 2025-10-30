import { motion } from 'framer-motion'
import BookCard from './BookCard.jsx'

export default function BookList({ books, loading, error, onRetry, onUpdate, onDelete }) {
  if (loading) {
    return (
      <div className="card flex items-center justify-center">
        <div className="animate-pulse text-black">Loading your library…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-black font-medium">{error}</p>
          <button onClick={onRetry} className="btn btn-primary">Retry</button>
        </div>
      </div>
    )
  }

  if (!books || books.length === 0) {
    return (
      <div className="card text-center text-black">No books yet, add one!</div>
    )
  }

  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {books.map((b) => (
        <BookCard key={b.book_id + '-' + b.title} book={b} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </motion.div>
  )
}
