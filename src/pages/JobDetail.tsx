
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Job } from "../components/JobList";
import { getJobById, toggleFavoriteJob } from "../services/jobService";
import { getMockMatchAnalysis } from "../services/matchingService";
import { Button } from "@/components/ui/button";
import JobHeader from "../components/job/JobHeader";
import JobTabs from "../components/job/JobTabs";
import JobActions from "../components/job/JobActions";
import ApplyDialog from "../components/job/ApplyDialog";
import QualificationQuestionDialog from "../components/matching/QualificationQuestionDialog";
import BottomNavigation from "../components/BottomNavigation";

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [activeTab, setActiveTab] = useState("info");
  const [showQualificationDialog, setShowQualificationDialog] = useState(false);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
  const [isAnalysisReady, setIsAnalysisReady] = useState(false);
  const [showAnalysisTab, setShowAnalysisTab] = useState(false);

  // 특별히 분석 탭을 보여줄 공고 ID 목록
  const specialJobIds = ["2", "VN001"];
  // 특별히 분석 탭을 보여줄 회사명 목록
  const specialCompanies = ["은빛재가복지센터"];

  // 공고가 분석 탭을 보여줘야 하는지 확인하는 함수
  const shouldShowAnalysis = (job: Job | null, jobId: string | undefined): boolean => {
    if (!job || !jobId) return false;
    
    // 즐겨찾기된 공고인 경우
    if (job.isFavorite) return true;
    
    // 특별 ID 목록에 포함된 경우
    if (specialJobIds.includes(jobId)) return true;
    
    // 특별 회사 목록에 포함된 경우
    if (specialCompanies.includes(job.company)) return true;
    
    return false;
  };

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const fetchedJob = await getJobById(id);
        setJob(fetchedJob);

        // 분석 탭 표시 여부 결정
        const shouldShow = shouldShowAnalysis(fetchedJob, id);
        setShowAnalysisTab(shouldShow);

        if (shouldShow) {
          const analysis = getMockMatchAnalysis(id);
          setMatchScore(analysis.totalScore);
          
          // 특별 공고는 항상 분석 준비 완료
          const isSpecialJob = specialJobIds.includes(id) || 
                               (fetchedJob && specialCompanies.includes(fetchedJob.company));
          
          if (isSpecialJob) {
            setIsAnalysisReady(true);
          } else if (location.state?.isAnalysisReady) {
            setIsAnalysisReady(true);
          } else {
            setIsAnalysisReady(id.toString().length % 2 === 0);
          }
        }
      } catch (err) {
        console.error("공고 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, location.state]);

  // URL의 쿼리 파라미터에 따라 초기 탭 설정
  useEffect(() => {
    // URL에 tab=analysis 파라미터가 있는 경우
    if (location.search.includes("tab=analysis")) {
      setActiveTab("analysis");
    }
    
    // 특별 공고 ID인 경우 분석 탭을 기본으로 설정
    if (specialJobIds.includes(id || "") && showAnalysisTab) {
      setActiveTab("analysis");
    }
  }, [location.search, id, showAnalysisTab]);

  const handleToggleFavorite = async () => {
    if (!job) return;
    try {
      const updatedJobs = await toggleFavoriteJob(job.id);
      const updatedJob = updatedJobs.find((j) => j.id === job.id);
      if (updatedJob) {
        setJob(updatedJob);
        // 즐겨찾기 상태 변경 후 분석 탭 표시 여부 다시 계산
        setShowAnalysisTab(shouldShowAnalysis(updatedJob, id));
      }
    } catch (error) {
      console.error("관심 공고 토글 실패:", error);
    }
  };

  const handleCreateCoverLetter = () => {
    if (job) {
      navigate("/cover-letter/ai-create", {
        state: {
          company: job.company,
          position: job.title,
        },
      });
    }
  };

  const handleStartAnalysis = () => {
    setShowQualificationDialog(true);
  };

  const handleQuestionnaireComplete = (answers: boolean[]) => {
    setHasCompletedQuestionnaire(true);
    const analysis = getMockMatchAnalysis(id as string);
    setMatchScore(analysis.totalScore);
    setIsAnalysisReady(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">전체 공고</h1>
        </div>
        <p className="text-center mt-12">요청하신 공고를 찾을 수 없습니다.</p>
        <div className="text-center mt-6">
          <Button asChild>
            <Link to="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <JobHeader job={job} />

      <main className="px-4 py-6">
        {showAnalysisTab && (
          <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
            <div className="inline-block bg-app-light-blue text-app-blue px-3 py-1 rounded-full text-xs mb-2">
              맞춤형 공고 분석
            </div>
            <h2 className="text-2xl font-bold mb-2">모집 공고문</h2>
            <p className="text-gray-600">
              공고에 대한 상세 내용입니다. 맞춤형 분석 탭에서 자세한 내용을
              확인해보세요.
            </p>
          </div>
        )}

        <JobTabs
          job={job}
          fromFavorites={showAnalysisTab}
          activeTab={activeTab}
          hasCompletedQuestionnaire={hasCompletedQuestionnaire}
          isAnalysisReady={isAnalysisReady}
          matchAnalysis={getMockMatchAnalysis(id as string)}
          onTabChange={setActiveTab}
          onStartAnalysis={handleStartAnalysis}
        />

        <QualificationQuestionDialog
          open={showQualificationDialog}
          onOpenChange={setShowQualificationDialog}
          onComplete={handleQuestionnaireComplete}
        />

        <JobActions
          isFavorite={job.isFavorite}
          onToggleFavorite={handleToggleFavorite}
          onApplyClick={() => setShowApplyDialog(true)}
        />
      </main>

      <ApplyDialog
        open={showApplyDialog}
        onOpenChange={setShowApplyDialog}
        jobTitle={job.title}
        company={job.company}
        onCreateCoverLetter={handleCreateCoverLetter}
      />

      <BottomNavigation />
    </div>
  );
};

export default JobDetail;
