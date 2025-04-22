
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Briefcase, Star } from "lucide-react";
import { Job } from "../components/JobList";
import { getJobById, toggleFavoriteJob } from "../services/jobService";
import { getMockMatchAnalysis } from "../services/matchingService";
import BottomNavigation from "../components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchingAnalysis from "../components/MatchingAnalysis";
import JobHeader from "../components/job/JobHeader";
import JobInfo from "../components/job/JobInfo";
import JobDescription from "../components/job/JobDescription";
import ApplyDialog from "../components/job/ApplyDialog";
import classNames from "classnames";

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [activeTab, setActiveTab] = useState("info");
  const fromFavorites = location.state?.fromFavorites || false;

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const fetchedJob = await getJobById(id);
        setJob(fetchedJob);

        if (fromFavorites) {
          const analysis = getMockMatchAnalysis(id);
          setMatchScore(analysis.totalScore);
        }
      } catch (err) {
        console.error("공고 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, fromFavorites]);

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
        {fromFavorites && (
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

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
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
              <MatchingAnalysis
                analysis={getMockMatchAnalysis(id as string)}
                onBack={() => setActiveTab("info")}
              />
            </TabsContent>
          )}
        </Tabs>

        <div className="fixed bottom-[72px] left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleFavorite}
            className={classNames(
              "w-12 h-12 rounded-full transition-colors",
              job?.isFavorite ? "bg-[#FFE376]" : "hover:bg-gray-100"
            )}
          >
            <Star
              className={classNames(
                "transition-colors",
                job?.isFavorite ? "text-black" : "text-gray-500"
              )}
            />
          </Button>
          <Button
            className="flex-1 py-3 text-lg font-medium bg-[#FFE376] hover:bg-[#FFE376] text-black"
            onClick={() => setShowApplyDialog(true)}
          >
            <Briefcase className="ml-2" />
            지원하기
          </Button>
        </div>
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
