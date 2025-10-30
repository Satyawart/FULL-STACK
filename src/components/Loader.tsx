import { Loader2 } from 'lucide-react';

/**
 * Loading spinner component
 */
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground font-medium">Loading your library...</p>
    </div>
  );
};

export default Loader;
