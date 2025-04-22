
import React from "react";
import { Button } from "@/components/ui/button";
import MatchingAnalysis from "../MatchingAnalysis";
import MatchingScoreSection from "../matching/MatchingScoreSection";
import { MatchAnalysis } from "../../services/matchingService";

interface JobAnalysisTabProps {
  hasCompletedQuestionnaire: boolean;
  matchAnalysis: MatchAnalysis;
  onStartAnalysis: () => void;
  onBack: () => void;
}

const JobAnalysisTab: React.FC<JobAnalysisTabProps> = ({
  hasCompletedQuestionnaire,
  matchAnalysis,
  onStartAnalysis,
  onBack,
}) => {
  if (hasCompletedQuestionnaire) {
    return <MatchingAnalysis analysis={matchAnalysis} onBack={onBack} />;
  }

  return (
    <div className="text-center py-12">
      <div className="blur-sm mb-6">
        <MatchingScoreSection score={0} />
      </div>
      <Button
        onClick={onStartAnalysis}
        className="text-blue-500 border-blue-500 hover:bg-blue-50"
        variant="outline"
      >
        나와 적합한 공고인지 알아봐요
      </Button>
    </div>
  );
};

export default JobAnalysisTab;
