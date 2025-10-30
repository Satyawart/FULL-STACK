# BiblioBuddy Backend

Flask REST API for managing books with SQLite database.

## Setup

1. **Install dependencies**
```bash
pip install -r requirements.txt
```

2. **Run the server**
```bash
python app.py
```

Server will start on `http://127.0.0.1:5000`

## API Endpoints

### GET /books
Get all books
```bash
curl http://127.0.0.1:5000/books
```

### POST /books
Add a new book
```bash
curl -X POST http://127.0.0.1:5000/books \
  -H "Content-Type: application/json" \
  -d '{"book_id": "101", "title": "Clean Code", "author": "Robert Martin", "price": 599}'
```

### PUT /books/:book_id
Update a book
```bash
curl -X PUT http://127.0.0.1:5000/books/101 \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean Code Updated", "author": "Robert C. Martin", "price": 699}'
```

### DELETE /books/:book_id
Delete a book
```bash
curl -X DELETE http://127.0.0.1:5000/books/101
```

## Database

- **Type**: SQLite
- **File**: `books.db` (created automatically)
- **Schema**:
  - `book_id` (TEXT, PRIMARY KEY)
  - `title` (TEXT, NOT NULL)
  - `author` (TEXT, NOT NULL)
  - `price` (REAL, NOT NULL)

## Features

- ✅ CORS enabled for frontend
- ✅ Input validation
- ✅ Duplicate book_id prevention
- ✅ Proper HTTP status codes
- ✅ Error handling with JSON responses
- ✅ SQLite persistence
