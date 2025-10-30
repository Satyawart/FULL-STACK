import { Book } from '@/utils/api';
import { BookOpen, User, DollarSign } from 'lucide-react';

interface BookCardProps {
  book: Book;
  index: number;
}

/**
 * Individual book card component with animation
 */
const BookCard = ({ book, index }: BookCardProps) => {
  return (
    <div 
      className="bg-card border border-border rounded-lg p-5 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
            {book.title}
          </h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="truncate">{book.author}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-accent-foreground">
              <DollarSign className="w-4 h-4" />
              <span>${book.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
