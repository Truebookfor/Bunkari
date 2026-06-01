import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviews,
  size = "sm",
  showCount = true,
}: {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
  showCount?: boolean;
}) {
  const px = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${px} ${
              i <= Math.round(rating)
                ? "fill-mustard text-mustard"
                : "fill-cocoa/10 text-cocoa/10"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-cocoa/70">
        {rating.toFixed(1)}
        {showCount && reviews !== undefined && (
          <span className="text-cocoa/40"> ({reviews})</span>
        )}
      </span>
    </div>
  );
}
