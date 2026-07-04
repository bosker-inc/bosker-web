import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  maxRating?: number;
  showNumber?: boolean;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function Rating({
  rating,
  maxRating = 5,
  showNumber = true,
  size = 'md',
  interactive = false,
  onRatingChange,
}: RatingProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: maxRating }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={cn(
              sizes[size],
              interactive && 'cursor-pointer hover:opacity-70'
            )}
            disabled={!interactive}
          >
            {i < Math.floor(rating) ? (
              <span>⭐</span>
            ) : i < rating ? (
              <span>✨</span>
            ) : (
              <span>☆</span>
            )}
          </button>
        ))}
      </div>
      {showNumber && (
        <span className="text-muted text-sm font-semibold">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
