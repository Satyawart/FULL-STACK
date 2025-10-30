import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

/**
 * Error banner with retry functionality
 */
const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => {
  return (
    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 animate-fade-in">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-destructive mb-1">
            Connection Error
          </h3>
          <p className="text-sm text-destructive/90 mb-4">
            {message}
          </p>
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;
