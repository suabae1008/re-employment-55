
import React from 'react';
import { ChevronLeft, CheckCircle2, XCircle, User, AlertCircle } from 'lucide-react';
import { MatchAnalysis } from '../services/matchingService';
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import MatchScoreGauge from './MatchScoreGauge';

interface MatchingAnalysisProps {
  analysis: MatchAnalysis;
  onBack: () => void;
}

const MatchingAnalysis: React.FC<MatchingAnalysisProps> = ({ analysis, onBack }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="mr-2">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold">공고 맞춤형 분석</h2>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-600 mb-2">나와 잘 맞는 공고인지 알아보세요</p>
        <div className="mb-10">
          <MatchScoreGauge score={analysis.totalScore} />
        </div>
      </div>

      <div className="space-y-4">
        <Collapsible>
          <Card>
            <CollapsibleTrigger className="w-full text-left p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  자격사항 {analysis.requiredQualifications.filter(q => q.isMatched).length}개 중 {analysis.requiredQualifications.length}개를 만족했어요
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid gap-3 py-4">
                  {analysis.requiredQualifications.map((qual) => (
                    <div key={qual.id} className={`flex items-center justify-between p-3 rounded-lg border ${qual.isMatched ? 'border-green-200' : 'border-red-200'}`}>
                      <span className="text-sm mr-2">{qual.name}</span>
                      {qual.isMatched ? (
                        <CheckCircle2 size={20} className="text-green-500" />
                      ) : (
                        <XCircle size={20} className="text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible>
          <Card>
            <CollapsibleTrigger className="w-full text-left p-4">
              <div className="flex items-center gap-2">
                <User className="text-blue-500" />
                <span className="font-medium">유사한 경험이 있어요</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="text-sm text-gray-600 space-y-2">
                  {analysis.experiences.map((exp) => (
                    <p key={exp.id}>✓ {exp.title} ({exp.duration}개월)</p>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible>
          <Card>
            <CollapsibleTrigger className="w-full text-left p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500" />
                <span className="font-medium">
                  우대사항 {analysis.preferredQualifications.filter(q => q.isMatched).length}개 중 {analysis.preferredQualifications.length}개를 만족했어요
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="text-sm text-gray-600 space-y-2">
                  {analysis.preferredQualifications.map((qual) => (
                    <p key={qual.id}>
                      {qual.isMatched ? "✓" : "✗"} {qual.name}
                    </p>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Card className="border-none bg-gray-100 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <AlertCircle size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-700">자격 사항 관련 경험 1년을 쌓아요</p>
              <p className="text-xs text-gray-500 mt-1">관련 경험이 더 많을수록 채용 확률이 커집니다</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MatchingAnalysis;
