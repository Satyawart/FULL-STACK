# BiblioBuddy – Your Friendly Book Keeper

- **Framework**: React + Vite
- **Styling**: Tailwind CSS (soft blue-white, neumorphic)
- **Motion**: Framer Motion
- **HTTP**: Axios (baseURL http://127.0.0.1:5000)

## Running

1. Install deps
```
npm install
```
2. Start dev server
```
npm run dev
```
3. Backend endpoints expected:
- `GET /books` → return an array of books: `{ book_id, title, author, price }`
- `POST /books` → accept JSON body and return created book

## Notes
- Edit/Delete buttons are present with animations. To enable, add `PUT /books/:id` and `DELETE /books/:id` endpoints and wire them in `src/components/BookCard.jsx`.
