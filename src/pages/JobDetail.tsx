
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Star, StarOff } from 'lucide-react';
import { Job } from '../components/JobList';
import { getJobById, toggleFavoriteJob } from '../services/jobService';
import { getMockMatchAnalysis } from '../services/matchingService';
import BottomNavigation from '../components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchingAnalysis from '../components/MatchingAnalysis';
import JobHeader from '../components/job/JobHeader';
import JobInfo from '../components/job/JobInfo';
import JobDescription from '../components/job/JobDescription';
import MatchingScoreCard from '../components/job/MatchingScoreCard';
import ApplyDialog from '../components/job/ApplyDialog';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [activeTab, setActiveTab] = useState('info');
  
  const fromFavorites = location.state?.fromFavorites || false;

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchedJob = getJobById(id);
      setJob(fetchedJob);
      
      if (fromFavorites) {
        const analysis = getMockMatchAnalysis(id);
        setMatchScore(analysis.totalScore);
      }
      
      setLoading(false);
    }
  }, [id, fromFavorites]);

  const handleToggleFavorite = () => {
    if (job) {
      const updatedJobs = toggleFavoriteJob(job.id);
      const updatedJob = updatedJobs.find(j => j.id === job.id);
      if (updatedJob) {
        setJob(updatedJob);
        toast(updatedJob.isFavorite ? '관심 공고에 추가되었습니다' : '관심 공고에서 제거되었습니다');
      }
    }
  };

  const handleCreateCoverLetter = () => {
    if (job) {
      navigate('/cover-letter/ai-create', { 
        state: { 
          company: job.company,
          position: job.title
        }
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
          <h1 className="text-xl font-bold">공고를 찾을 수 없습니다</h1>
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
      <JobHeader job={job} handleToggleFavorite={handleToggleFavorite} />

      <main className="px-4 py-6">
        {fromFavorites && (
          <MatchingScoreCard 
            matchScore={matchScore}
            onShowAnalysis={() => setActiveTab('analysis')}
          />
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="info" className="flex-1">공고 정보</TabsTrigger>
            {fromFavorites && (
              <TabsTrigger value="analysis" className="flex-1">맞춤형 분석</TabsTrigger>
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
                onBack={() => setActiveTab('info')} 
              />
            </TabsContent>
          )}
        </Tabs>

        <div className="fixed bottom-[72px] left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-2">
          <Button 
            variant="outline"
            className="flex-none w-12 h-12 p-0"
            onClick={handleToggleFavorite}
          >
            {job.isFavorite ? (
              <Star className="w-5 h-5 text-yellow-500" />
            ) : (
              <StarOff className="w-5 h-5" />
            )}
          </Button>
          <Button 
            className="flex-1 py-3 text-lg font-medium"
            onClick={() => setShowApplyDialog(true)}
          >
            지원하기 <Briefcase className="ml-2" />
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

