
import React from "react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MatchScoreGauge from "../MatchScoreGauge";

interface MatchingScoreSectionProps {
  score: number;
}

const MatchingScoreSection: React.FC<MatchingScoreSectionProps> = ({ score }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <MatchScoreGauge score={score} />
        
        <div className="flex items-center gap-2 mt-2">
          <h2 className="text-lg font-bold">매치점수 {score.toFixed(0)}점</h2>
          <Dialog>
            <DialogTrigger>
              <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center mb-4">
                  매칭 점수는 이렇게 계산되었어요
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>자격 사항</span>
                  <span className="text-blue-500 font-medium">최대 70점</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>우대 사항</span>
                  <span className="text-blue-500 font-medium">최대 30점</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MatchingScoreSection;
