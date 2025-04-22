
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";

interface JobCardProps {
  id: string | number;
  title: string;
  company: string;
  highlight?: string;
  deadline?: string;
  isFavorite?: boolean;
  onClick?: () => void;
  onFavoriteClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  highlight,
  deadline,
  isFavorite = false,
  onClick,
  onFavoriteClick
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteClick?.();
  };

  return (
    <article 
      onClick={onClick}
      className="relative bg-white border-2 border-gray-200 rounded-2xl p-5 cursor-pointer hover:shadow transition"
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 hover:scale-110 transition"
      >
        <Star
          size={24}
          className={cn(
            "transition-colors",
            isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          )}
        />
      </button>

      <div className="flex justify-between items-start pr-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 font-medium">
            {company}
          </p>
        </div>
        {highlight && (
          <span 
            className={cn(
              "text-base font-bold",
              highlight.includes("D-") ? "text-[#ea384c]" : "text-[#0EA5E9]"
            )}
          >
            {highlight}
          </span>
        )}
      </div>

      {deadline && (
        <div className="mt-2 text-sm text-gray-400">
          마감일: {deadline}
        </div>
      )}
    </article>
  );
};

export default JobCard;
