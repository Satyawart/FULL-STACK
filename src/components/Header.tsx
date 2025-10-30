import { BookOpen } from 'lucide-react';

/**
 * Header component with app branding and mascot
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-soft animate-fade-in">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <BookOpen className="w-8 h-8 text-primary" />
            <span className="absolute -top-1 -right-1 text-2xl">📚</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              BiblioBuddy
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Your friendly book keeper
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
