// API utility functions for communicating with the Flask backend

const API_BASE_URL = 'http://127.0.0.1:5000';

export interface Book {
  book_id: string;
  title: string;
  author: string;
  price: number;
}

export interface BookInput {
  title: string;
  author: string;
  price: number;
}

/**
 * Fetches all books from the backend
 */
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Handle both array and {books: []} response formats
    return Array.isArray(data) ? data : (data?.books || []);
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

/**
 * Adds a new book to the backend
 */
export const addBook = async (book: BookInput): Promise<Book> => {
  try {
    // Generate a unique book_id
    const book_id = `BK${Date.now()}`;
    
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        book_id,
        ...book,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

/**
 * Updates an existing book
 */
export const updateBook = async (book_id: string, book: BookInput): Promise<Book> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${book_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

/**
 * Deletes a book
 */
export const deleteBook = async (book_id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${book_id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
