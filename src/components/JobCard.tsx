import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { toggleFavoriteJob, isJobFavorite } from '@/services/jobService';

interface JobCardProps {
  id: string | number;
  title: string;
  company: string;
  location?: string;
  category?: string;
  highlight?: string;
  deadline?: string;
  isFavorite?: boolean;
  onClick?: () => void;
  onFavoriteClick?: (id: string | number) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  category,
  highlight,
  deadline,
  isFavorite = false,
  onClick,
  onFavoriteClick
}) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  useEffect(() => {
    setIsFavoriteState(isJobFavorite(id));
  }, [id]);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavoriteJob(id);
    setIsFavoriteState(prev => !prev);
    if (onFavoriteClick) {
      onFavoriteClick(id);
    }
  };

  const getDeadlineText = (deadline: string | undefined) => {
    if (!deadline || deadline === "상시채용") return "";
    try {
      const date = new Date(deadline);
      if (!isNaN(date.getTime())) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekDayNames = ["일", "월", "화", "수", "목", "금", "토"];
        const weekDay = weekDayNames[date.getDay()];
        return `~${month}/${day}(${weekDay})`;
      }
    } catch {
      return "";
    }
    return "";
  };

  return (
    <article 
      onClick={onClick}
      className="relative bg-white border-2 border-gray-200 rounded-2xl p-5 cursor-pointer hover:shadow transition"
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 left-4 hover:scale-110 transition"
      >
        <Star
          size={24}
          className={cn(
            "transition-colors",
            isFavoriteState ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          )}
        />
      </button>

      <div className="flex justify-between items-start pl-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 font-medium">
            {company}
          </p>
          {category && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-2">
              {category}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end">
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
          {deadline && deadline !== "상시채용" && (
            <span className="text-xs text-gray-400 mt-1">
              {getDeadlineText(deadline)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default JobCard;
