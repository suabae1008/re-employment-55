
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobInfo from "./JobInfo";
import JobDescription from "./JobDescription";
import JobAnalysisTab from "./JobAnalysisTab";
import { Job } from "../../components/JobList";
import { MatchAnalysis } from "../../services/matchingService";

interface JobTabsProps {
  job: Job;
  fromFavorites: boolean;
  activeTab: string;
  hasCompletedQuestionnaire: boolean;
  isAnalysisReady: boolean;
  matchAnalysis: MatchAnalysis;
  onTabChange: (value: string) => void;
  onStartAnalysis: () => void;
}

const JobTabs: React.FC<JobTabsProps> = ({
  job,
  fromFavorites,
  activeTab,
  hasCompletedQuestionnaire,
  isAnalysisReady,
  matchAnalysis,
  onTabChange,
  onStartAnalysis,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="w-full">
        <TabsTrigger value="info" className="flex-1">
          공고 정보
        </TabsTrigger>
        {fromFavorites && (
          <TabsTrigger value="analysis" className="flex-1">
            맞춤형 분석
          </TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="info" className="space-y-4">
        <JobInfo job={job} />
        <JobDescription job={job} />
      </TabsContent>

      {fromFavorites && (
        <TabsContent value="analysis">
          <JobAnalysisTab
            hasCompletedQuestionnaire={hasCompletedQuestionnaire}
            isAnalysisReady={isAnalysisReady}
            matchAnalysis={matchAnalysis}
            onStartAnalysis={onStartAnalysis}
            onBack={() => onTabChange("info")}
          />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default JobTabs;

