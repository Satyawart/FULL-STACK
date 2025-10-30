import { useState } from 'react';
import Header from '@/components/Header';
import BookList from '@/components/BookList';
import AddBookForm from '@/components/AddBookForm';
import Loader from '@/components/Loader';
import ErrorBanner from '@/components/ErrorBanner';
import { useBooks } from '@/hooks/useBooks';
import { toast } from 'sonner';

/**
 * Main page component for BiblioBuddy
 */
const Index = () => {
  const { books, isLoading, error, loadBooks, createBook } = useBooks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddBook = async (bookData: { title: string; author: string; price: number }) => {
    setIsSubmitting(true);
    const result = await createBook(bookData);
    setIsSubmitting(false);

    if (result.success) {
      toast.success('Nice! Book added to your shelf 📚', {
        description: `"${bookData.title}" by ${bookData.author}`,
      });
    } else {
      toast.error('Oops! Couldn\'t add the book', {
        description: 'Please try again in a moment.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Add Book Form */}
          <div className="animate-fade-in">
            <AddBookForm onSubmit={handleAddBook} isSubmitting={isSubmitting} />
          </div>

          {/* Books Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Your Library
              {!isLoading && books.length > 0 && (
                <span className="text-base font-normal text-muted-foreground ml-2">
                  ({books.length} {books.length === 1 ? 'book' : 'books'})
                </span>
              )}
            </h2>

            {/* Error State */}
            {error && <ErrorBanner message={error} onRetry={loadBooks} />}

            {/* Loading State */}
            {isLoading && !error && <Loader />}

            {/* Books List */}
            {!isLoading && !error && <BookList books={books} />}
          </div>
        </div>
      </main>

      <footer className="text-center py-8 text-sm text-muted-foreground">
        <p>Made with ❤️ by BiblioBuddy</p>
      </footer>
    </div>
  );
};

export default Index;
