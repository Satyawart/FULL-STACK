import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';

interface AddBookFormProps {
  onSubmit: (book: { title: string; author: string; price: number }) => Promise<void>;
  isSubmitting: boolean;
}

/**
 * Form component for adding new books with validation
 */
const AddBookForm = ({ onSubmit, isSubmitting }: AddBookFormProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    if (!author.trim()) {
      newErrors.author = 'Author is required';
    } else if (author.length > 100) {
      newErrors.author = 'Author must be 100 characters or less';
    }

    if (!price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(price) < 0) {
      newErrors.price = 'Price must be 0 or greater';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onSubmit({
      title: title.trim(),
      author: author.trim(),
      price: parseFloat(price),
    });

    // Reset form on success
    setTitle('');
    setAuthor('');
    setPrice('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-primary" />
        Add a New Book
      </h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-foreground font-medium">
            Book Title *
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            maxLength={200}
            className={`mt-1 ${errors.title ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-sm text-destructive mt-1">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="author" className="text-foreground font-medium">
            Author *
          </Label>
          <Input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            maxLength={100}
            className={`mt-1 ${errors.author ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            aria-invalid={!!errors.author}
            aria-describedby={errors.author ? 'author-error' : undefined}
          />
          {errors.author && (
            <p id="author-error" className="text-sm text-destructive mt-1">
              {errors.author}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="price" className="text-foreground font-medium">
            Price ($) *
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className={`mt-1 ${errors.price ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'price-error' : undefined}
          />
          {errors.price && (
            <p id="price-error" className="text-sm text-destructive mt-1">
              {errors.price}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-soft hover:shadow-medium transition-all"
        >
          {isSubmitting ? 'Adding Book...' : 'Add to Library'}
        </Button>
      </div>
    </form>
  );
};

export default AddBookForm;
