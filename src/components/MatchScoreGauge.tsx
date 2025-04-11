
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface MatchScoreGaugeProps {
  score: number;
}

const MatchScoreGauge: React.FC<MatchScoreGaugeProps> = ({ score }) => {
  // Determine color based on score
  const getColorClass = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-52 h-26 mb-2">
        {/* Semi-circular gauge visualization */}
        <div className="absolute w-full">
          <div className="flex justify-between w-full px-1 text-xs text-gray-500">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getColorClass(score)} transition-all duration-500`} 
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
        
        {/* Score indicator */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-3xl font-bold">{score}점</div>
          <div className="w-4 h-4 transform rotate-45 border-t-2 border-r-2 border-gray-400 mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default MatchScoreGauge;
