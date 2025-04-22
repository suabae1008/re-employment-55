import React from "react";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  User,
  AlertCircle,
  Info,
} from "lucide-react";
import { MatchAnalysis } from "../services/matchingService";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MatchScoreGauge from "./MatchScoreGauge";

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
        <div className="text-center mb-8">
          <div className="inline-block bg-app-light-blue text-app-blue px-3 py-1 rounded-full text-xs mb-2">
            맞춤형 공고 분석
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">매칭 점수</h2>
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
                    <span className="text-blue-500 font-medium">최대 50점</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>공고와 유사한 경험</span>
                    <span className="text-blue-500 font-medium">최대 30점</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>우대 사항</span>
                    <span className="text-blue-500 font-medium">최대 20점</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <h4 className="mb-10">
            <MatchScoreGauge score={analysis.totalScore} />
          </h4>
          <p className="text-gray-600 mb-4 whitespace-normal break-words after:content-none before:content-none">
            나와 잘 맞는 공고인지 확인해보세요.
          </p>
        </div>
        
        {/* 점수 향상 가이드 섹션 */}
        <div className="mt-8 mb-8">
          <h3 className="text-lg font-semibold mb-4">이렇게 점수를 올려요</h3>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
              {/* 자격사항 카드 - 부족한 자격사항 표시 */}
              {analysis.requiredQualifications.filter(q => !q.isMatched).map((qual) => (
                <div key={`req-${qual.id}`} className="flex-shrink-0 w-60 p-4 rounded-lg" style={{ backgroundColor: "#D3E4FD" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="font-medium">자격 사항</div>
                  </div>
                  <p className="text-sm">{qual.name}</p>
                </div>
              ))}
              
              {/* 우대사항 카드 - 부족한 우대사항 표시 */}
              {analysis.preferredQualifications.filter(q => !q.isMatched).map((qual) => (
                <div key={`pref-${qual.id}`} className="flex-shrink-0 w-60 p-4 rounded-lg" style={{ backgroundColor: "#E5DEFF" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                      </svg>
                    </div>
                    <div className="font-medium">우대 사항</div>
                  </div>
                  <p className="text-sm">{qual.name}</p>
                </div>
              ))}
              
              {/* 경험 관련 카드 */}
              <div className="flex-shrink-0 w-60 p-4 rounded-lg" style={{ backgroundColor: "#F2FCE2" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className="font-medium">관련 경험</div>
                </div>
                <p className="text-sm">유사한 직무 경험을 더 쌓아보세요</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Collapsible>
            <Card>
              <CollapsibleTrigger className="w-full text-left p-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">자격 사항</span>
                  <span className="text-sm text-gray-600">
                    {
                      analysis.requiredQualifications.filter((q) => q.isMatched)
                        .length
                    }
                    개 중 {analysis.requiredQualifications.length}개를
                    만족했어요
                  </span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid gap-3 py-4">
                    {analysis.requiredQualifications.map((qual) => (
                      <div
                        key={qual.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          qual.isMatched ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{qual.name}</span>
                        </div>
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
        </div>

        <Collapsible>
          <Card>
            <CollapsibleTrigger className="w-full text-left p-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">유사한 직무 경험</span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4 py-4">
                  {analysis.experiences.map((exp) => (
                    <div key={exp.id} className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-1">{exp.title}</h4>
                      <p className="text-sm text-gray-600">
                        {exp.duration}개월의 경험 보유
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        순환 및 야간 근무 경험이 경쟁 업무와 유사
                      </p>
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
                <span className="font-medium">우대 사항</span>
                <span className="text-sm text-gray-600">
                  {
                    analysis.preferredQualifications.filter((q) => q.isMatched)
                      .length
                  }
                  개 중 {analysis.preferredQualifications.length}개를 만족했어요
                </span>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="grid gap-3 py-4">
                  {analysis.preferredQualifications.map((qual) => (
                    <div
                      key={qual.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        qual.isMatched ? "bg-green-50" : "bg-red-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{qual.name}</span>
                      </div>
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

        {/* Card removed as requested */}
      </div>
    </div>
  );
};

export default MatchingAnalysis;
