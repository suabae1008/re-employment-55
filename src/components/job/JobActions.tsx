
import React from "react";
import { Briefcase, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JobActionsProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onApplyClick: () => void;
}

const JobActions: React.FC<JobActionsProps> = ({
  isFavorite,
  onToggleFavorite,
  onApplyClick,
}) => {
  return (
    <div className="fixed bottom-[72px] left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleFavorite}
        className={cn(
          "rounded-full transition-colors",
          isFavorite 
            ? "bg-[#FFE376] text-black" 
            : "text-gray-500 hover:bg-[#FFE376] hover:text-black"
        )}
      >
        <Star fill={isFavorite ? "currentColor" : "none"} />
      </Button>
      <Button
        className="flex-1 py-3 text-lg font-medium bg-[#FFE376] hover:bg-[#FFE376] text-black"
        onClick={onApplyClick}
      >
        <Briefcase className="ml-2" />
        지원하기
      </Button>
    </div>
  );
};

export default JobActions;
