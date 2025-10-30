import { useState, useEffect, useCallback } from 'react';
import { fetchBooks, addBook, updateBook, deleteBook, Book, BookInput } from '@/utils/api';

/**
 * Custom hook to manage books data and operations
 */
export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books on mount
  const loadBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to load books. Make sure the backend is running on port 5000.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Add a new book
  const createBook = async (bookData: BookInput) => {
    try {
      const newBook = await addBook(bookData);
      setBooks((prev) => [newBook, ...prev]);
      return { success: true, book: newBook };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Failed to add book' };
    }
  };

  // Update an existing book
  const editBook = async (book_id: string, bookData: BookInput) => {
    try {
      const updatedBook = await updateBook(book_id, bookData);
      setBooks((prev) => prev.map((book) => 
        book.book_id === book_id ? updatedBook : book
      ));
      return { success: true, book: updatedBook };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Failed to update book' };
    }
  };

  // Delete a book
  const removeBook = async (book_id: string) => {
    try {
      await deleteBook(book_id);
      setBooks((prev) => prev.filter((book) => book.book_id !== book_id));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Failed to delete book' };
    }
  };

  return {
    books,
    isLoading,
    error,
    loadBooks,
    createBook,
    editBook,
    removeBook,
  };
};
