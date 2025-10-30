import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Toast({ type = 'success', message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500)
    return () => clearTimeout(t)
  }, [onClose])

  const bg = type === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-neuSm ${bg}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </motion.div>
  )
}
