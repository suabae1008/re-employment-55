
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
  // fromFavorites는 이제 URL 파라미터나 상태로 전달되는 값만 참조하고, 실제 UI 렌더링은 job.isFavorite 기준으로 함
  const fromFavorites = location.state?.fromFavorites || false;
  const [showQualificationDialog, setShowQualificationDialog] = useState(false);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
  const [isAnalysisReady, setIsAnalysisReady] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const fetchedJob = await getJobById(id);
        setJob(fetchedJob);

        // 직접 URL 접근과 내부 링크 접근 모두에서 isFavorite이 true인 경우 분석 정보 로드
        if (fetchedJob && fetchedJob.isFavorite) {
          const analysis = getMockMatchAnalysis(id);
          setMatchScore(analysis.totalScore);
          
          // 특정 공고는 항상 분석 데이터 준비
          if (fetchedJob.company === "은빛재가복지센터" || id === "VN001") {
            setIsAnalysisReady(true);
          } else if (location.state?.isAnalysisReady) {
            setIsAnalysisReady(true);
          } else {
            setIsAnalysisReady(id.toString().length % 2 === 0);
          }
        } else {
          // 즐겨찾기 아닌 경우에도 특정 공고는 분석 표시
          if (id === "VN001" || (fetchedJob && fetchedJob.company === "은빛재가복지센터")) {
            const analysis = getMockMatchAnalysis(id);
            setMatchScore(analysis.totalScore);
            setIsAnalysisReady(true);
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

  // 사용자가 탭을 변경할 때마다 URL을 업데이트하여 공유 시 동일한 탭으로 접근하도록 설정
  useEffect(() => {
    if (job?.isFavorite && activeTab === "info") {
      // 즐겨찾기된 공고는 기본적으로 analysis 탭이 있을 수 있도록 준비
      setActiveTab("info");
    }
  }, [job?.isFavorite]);

  const handleToggleFavorite = async () => {
    if (!job) return;
    try {
      const updatedJobs = await toggleFavoriteJob(job.id);
      const updatedJob = updatedJobs.find((j) => j.id === job.id);
      if (updatedJob) {
        setJob(updatedJob);
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
        {job.isFavorite && (
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
          fromFavorites={job.isFavorite}
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
