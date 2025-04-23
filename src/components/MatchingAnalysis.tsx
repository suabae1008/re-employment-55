
import React from "react";
import { ChevronLeft } from "lucide-react";
import { MatchAnalysis } from "../services/matchingService";
import MatchingScoreSection from "./matching/MatchingScoreSection";
import QualificationsSection from "./matching/QualificationsSection";
import ImprovementSection from "./matching/ImprovementSection";

interface MatchingAnalysisProps {
  analysis: MatchAnalysis;
  onBack: () => void;
}

const MatchingAnalysis: React.FC<MatchingAnalysisProps> = ({
  analysis,
  onBack,
}) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">맞춤형 공고 분석</h2>
      </div>

      <div className="space-y-6">
        <MatchingScoreSection score={analysis.totalScore} />

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">이렇게 점수를 올려요</h3>
          
          <QualificationsSection
            title="자격 사항"
            qualifications={analysis.requiredQualifications}
          />

          <QualificationsSection
            title="우대 사항"
            qualifications={analysis.preferredQualifications}
          />
        </div>

        <ImprovementSection
          requiredQualifications={analysis.requiredQualifications}
          preferredQualifications={analysis.preferredQualifications}
        />
      </div>
    </div>
  );
};

export default MatchingAnalysis;
