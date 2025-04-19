import React, { useState } from 'react';
import { ChevronLeft, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { MatchAnalysis } from '../services/matchingService';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import MatchScoreGauge from './MatchScoreGauge';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MatchingAnalysisProps {
  analysis: MatchAnalysis;
  onBack: () => void;
}

const MatchingAnalysis: React.FC<MatchingAnalysisProps> = ({ analysis, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'required' | 'experience' | 'preferred'>('overview');

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

      {activeTab === 'overview' && (
        <div>
          <Collapsible className="mb-4">
            <Card className="mb-2">
              <CollapsibleTrigger className="w-full text-left p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">지격사항 {analysis.requiredQualifications.filter(q => q.isMatched).length}개 중 {analysis.requiredQualifications.length}개를 만족했어요</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-blue-500"
                    onClick={() => setActiveTab('required')}
                  >
                    자세히 보기
                  </Button>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Collapsible className="mb-4">
            <Card className="mb-2">
              <CollapsibleTrigger className="w-full text-left p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">유사한 경험이 있어요</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-blue-500"
                    onClick={() => setActiveTab('experience')}
                  >
                    자세히 보기
                  </Button>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Collapsible className="mb-4">
            <Card className="mb-2">
              <CollapsibleTrigger className="w-full text-left p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">우대사항 {analysis.preferredQualifications.filter(q => q.isMatched).length}개 중 {analysis.preferredQualifications.length}개를 만족했어요</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-blue-500"
                    onClick={() => setActiveTab('preferred')}
                  >
                    자세히 보기
                  </Button>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          <Card className="border-none bg-gray-100 p-4 rounded-lg mt-4">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-2">
                <AlertCircle size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-700">지격사항 관련 경험 1년을 쌓아요</p>
                <p className="text-xs text-gray-500 mt-1">관련 경험이 더 많을수록 채용 확률이 커집니다</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'required' && (
        <div>
          <div className="flex items-center mb-4">
            <button onClick={() => setActiveTab('overview')} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold">자격 사항</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {analysis.requiredQualifications.map((qual) => (
              <Card key={qual.id} className={`p-3 border ${qual.isMatched ? 'border-green-200' : 'border-red-200'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm mr-2">{qual.name}</span>
                  {qual.isMatched ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <XCircle size={20} className="text-red-500" />
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">필수 자격</span>
              <span className="text-sm text-gray-500">{analysis.requiredScore}/50</span>
            </div>
            <Progress value={analysis.requiredScore * 2} className="h-2" />
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div>
          <div className="flex items-center mb-4">
            <button onClick={() => setActiveTab('overview')} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold">유사한 직무 경험</h2>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="h-2 rounded-full overflow-hidden bg-gray-200">
                <div className="h-full bg-blue-500" style={{ width: `${(analysis.experienceScore / 30) * 100}%` }}></div>
              </div>
              <div className="mt-1 text-center text-sm">
                <span className="text-gray-600">해당 공고와 OO 업무 기준으로</span><br />
                <span className="font-semibold">업계적으로 {Math.round((analysis.experienceScore / 30) * 100)}% 일치해요</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {analysis.experiences.map((exp) => (
              <Card key={exp.id} className="p-4">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="font-medium">{exp.title}</span>
                    <span className="text-sm text-gray-500">{Math.floor(exp.duration / 12)}년 {exp.duration % 12}개월</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {exp.similarity === 30 && "동일 직무, 역할 완전 일치"}
                    {exp.similarity === 20 && "유사 직무, 일부 역할 일치"}
                    {exp.similarity === 10 && "간접 경험, 환경 노출"}
                    {exp.similarity === 0 && "무관"}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">관련 경험</span>
              <span className="text-sm text-gray-500">{analysis.experienceScore}/30</span>
            </div>
            <Progress value={(analysis.experienceScore / 30) * 100} className="h-2" />
          </div>
        </div>
      )}

      {activeTab === 'preferred' && (
        <div>
          <div className="flex items-center mb-4">
            <button onClick={() => setActiveTab('overview')} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-semibold">우대 사항</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {analysis.preferredQualifications.map((qual) => (
              <Card key={qual.id} className={`p-3 border ${qual.isMatched ? 'border-green-200' : 'border-red-200'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm mr-2">{qual.name}</span>
                  {qual.isMatched ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <XCircle size={20} className="text-red-500" />
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">우대 요건</span>
              <span className="text-sm text-gray-500">{analysis.preferredScore}/20</span>
            </div>
            <Progress value={analysis.preferredScore * 5} className="h-2" />
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">지원하기</Button>
      </div>
    </div>
  );
};

export default MatchingAnalysis;
