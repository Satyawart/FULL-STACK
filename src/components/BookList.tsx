import { Book } from '@/utils/api';
import BookCard from './BookCard';
import { BookX } from 'lucide-react';

interface BookListProps {
  books: Book[];
}

/**
 * Displays the list of books or an empty state
 */
const BookList = ({ books }: BookListProps) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-16 px-4 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
          <BookX className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No books yet
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your library is empty! Let's add your first book and start building your collection 📖
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {books.map((book, index) => (
        <BookCard key={book.book_id} book={book} index={index} />
      ))}
    </div>
  );
};

export default BookList;
