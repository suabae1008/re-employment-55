
import React from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchingScoreCardProps {
  matchScore: number;
  onShowAnalysis: () => void;
}

const MatchingScoreCard: React.FC<MatchingScoreCardProps> = ({
  onShowAnalysis,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
      <div className="flex items-center justify-center mb-4">
        <h3 className="text-lg font-semibold mr-2">나와 적합한 공고인지 알아봤어요</h3>
        <Info className="text-orange-500 w-5 h-5" />
      </div>

      <Button
        variant="outline"
        className="w-full mt-4 border-dashed border-gray-300"
        onClick={onShowAnalysis}
      >
        분석 자세히 보기
      </Button>
    </div>
  );
};

export default MatchingScoreCard;
