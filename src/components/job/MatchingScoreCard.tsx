
import React from "react";
import { BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import MatchScoreGauge from "../MatchScoreGauge";

interface MatchingScoreCardProps {
  matchScore: number;
  onShowAnalysis: () => void;
}

const MatchingScoreCard: React.FC<MatchingScoreCardProps> = ({
  matchScore,
  onShowAnalysis,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
      <div className="text-center mb-2">
        <div className="mb-3 flex items-center justify-center">
          <h3 className="text-lg font-semibold">나와 적합한 공고인지 알아봤어요</h3>
          <div className="text-orange-500 ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
        </div>
        <div className="mb-4">
          <MatchScoreGauge score={matchScore} />
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full mt-4 border-dashed border-gray-300"
        onClick={onShowAnalysis}
      >
        <BarChart2 size={16} className="mr-2" />
        분석 자세히 보기
      </Button>
    </div>
  );
};

export default MatchingScoreCard;
