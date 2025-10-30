export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full sm:w-64">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
        placeholder="Search by ID, title, or author"
        aria-label="Search books"
      />
    </div>
  )
}
