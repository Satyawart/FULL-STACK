from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

DB_PATH = 'books.db'

def init_db():
    """Initialize the database with books table"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS books (
            book_id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            price REAL NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/books', methods=['GET'])
def get_books():
    """Get all books"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM books ORDER BY rowid DESC')
        rows = cursor.fetchall()
        conn.close()
        
        books = [dict(row) for row in rows]
        return jsonify(books), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/books', methods=['POST'])
def add_book():
    """Add a new book"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        book_id = data.get('book_id')
        title = data.get('title')
        author = data.get('author')
        price = data.get('price')
        
        if not all([book_id, title, author, price is not None]):
            return jsonify({'message': 'Missing required fields: book_id, title, author, price'}), 400
        
        # Validate price
        try:
            price = float(price)
            if price <= 0:
                return jsonify({'message': 'Price must be positive'}), 400
        except (ValueError, TypeError):
            return jsonify({'message': 'Invalid price format'}), 400
        
        # Convert book_id to string for consistency
        book_id = str(book_id)
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Check if book_id already exists
        cursor.execute('SELECT book_id FROM books WHERE book_id = ?', (book_id,))
        if cursor.fetchone():
            conn.close()
            return jsonify({'message': f'Book with ID {book_id} already exists'}), 409
        
        # Insert the book
        cursor.execute(
            'INSERT INTO books (book_id, title, author, price) VALUES (?, ?, ?, ?)',
            (book_id, title, author, price)
        )
        conn.commit()
        conn.close()
        
        # Return the created book
        created_book = {
            'book_id': book_id,
            'title': title,
            'author': author,
            'price': price
        }
        return jsonify(created_book), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/books/<book_id>', methods=['PUT'])
def update_book(book_id):
    """Update an existing book"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        title = data.get('title')
        author = data.get('author')
        price = data.get('price')
        
        if not all([title, author, price is not None]):
            return jsonify({'message': 'Missing required fields: title, author, price'}), 400
        
        # Validate price
        try:
            price = float(price)
            if price <= 0:
                return jsonify({'message': 'Price must be positive'}), 400
        except (ValueError, TypeError):
            return jsonify({'message': 'Invalid price format'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Check if book exists
        cursor.execute('SELECT * FROM books WHERE book_id = ?', (book_id,))
        if not cursor.fetchone():
            conn.close()
            return jsonify({'message': f'Book with ID {book_id} not found'}), 404
        
        # Update the book
        cursor.execute(
            'UPDATE books SET title = ?, author = ?, price = ? WHERE book_id = ?',
            (title, author, price, book_id)
        )
        conn.commit()
        conn.close()
        
        # Return updated book
        updated_book = {
            'book_id': book_id,
            'title': title,
            'author': author,
            'price': price
        }
        return jsonify(updated_book), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/books/<book_id>', methods=['DELETE'])
def delete_book(book_id):
    """Delete a book"""
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Check if book exists
        cursor.execute('SELECT * FROM books WHERE book_id = ?', (book_id,))
        book = cursor.fetchone()
        
        if not book:
            conn.close()
            return jsonify({'message': f'Book with ID {book_id} not found'}), 404
        
        # Delete the book
        cursor.execute('DELETE FROM books WHERE book_id = ?', (book_id,))
        conn.commit()
        conn.close()
        
        return jsonify({'message': f'Book {book_id} deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        'message': 'BiblioBuddy Backend API',
        'status': 'running',
        'endpoints': {
            'GET /books': 'Get all books',
            'POST /books': 'Add a new book',
            'PUT /books/<book_id>': 'Update a book',
            'DELETE /books/<book_id>': 'Delete a book'
        }
    }), 200

if __name__ == '__main__':
    # Initialize database on startup
    init_db()
    print('✅ Database initialized')
    print('🚀 Starting BiblioBuddy Backend on http://127.0.0.1:5000')
    app.run(debug=True, host='127.0.0.1', port=5000)
