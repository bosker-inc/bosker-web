import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  duration?: number;
}

const typeStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
};

const typeIcons = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

/**
 * Toast notification component
 * Use with a toast manager/context for production
 * This is a presentational component
 */
export function Toast({
  message,
  type = 'info',
  icon,
  dismissible = true,
  onDismiss,
}: ToastProps) {
  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 max-w-sm px-6 py-4 rounded-lg shadow-lg',
        'flex items-center gap-3 animate-slide-up',
        typeStyles[type],
        'z-50'
      )}
      role="alert"
      aria-live="assertive"
    >
      {icon ? (
        <span className="text-lg flex-shrink-0">{icon}</span>
      ) : (
        <span className="text-lg font-bold flex-shrink-0">
          {typeIcons[type]}
        </span>
      )}

      <span className="flex-1">{message}</span>

      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-4 hover:opacity-80 transition-opacity"
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
}

/**
 * Example usage:
 *
 * // In a client component
 * const [toast, setToast] = useState<ToastProps | null>(null);
 *
 * return (
 *   <>
 *     {toast && (
 *       <Toast
 *         {...toast}
 *         onDismiss={() => setToast(null)}
 *       />
 *     )}
 *   </>
 * );
 */
