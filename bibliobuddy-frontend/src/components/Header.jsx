import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="bg-soft-blue/60 backdrop-blur sticky top-0 z-10">
      <div className="container mx-auto max-w-5xl px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu flex items-center gap-3 px-4 py-3"
        >
          <img src="/logo.svg" alt="BiblioBuddy logo" className="w-8 h-8" />
          <div>
            <h1 className="font-poppins text-2xl md:text-3xl leading-tight">BiblioBuddy</h1>
            <p className="text-sm md:text-base text-black">Your Friendly Book Keeper</p>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
