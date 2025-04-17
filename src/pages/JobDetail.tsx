
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, StarOff, MapPin, Calendar, Building, Briefcase, BarChart2, FileUp, PenTool } from 'lucide-react';
import { Job } from '../components/JobList';
import { getJobById, toggleFavoriteJob } from '../services/jobService';
import { getMockMatchAnalysis } from '../services/matchingService';
import BottomNavigation from '../components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import MatchingAnalysis from '../components/MatchingAnalysis';
import MatchScoreGauge from '../components/MatchScoreGauge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMatchingAnalysis, setShowMatchingAnalysis] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [showMatchScore, setShowMatchScore] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fromFavorites = location.state?.fromFavorites || false;

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchedJob = getJobById(id);
      setJob(fetchedJob);
      
      if (fromFavorites) {
        const analysis = getMockMatchAnalysis(id);
        setMatchScore(analysis.totalScore);
        setShowMatchScore(true);
      } else {
        setShowMatchScore(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success('이력서 파일이 선택되었습니다.');
    }
  };

  const handleApplyWithFile = () => {
    if (selectedFile) {
      toast.success('지원이 완료되었습니다!');
      setShowApplyDialog(false);
    } else {
      toast.error('이력서 파일을 선택해주세요.');
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

  if (showMatchingAnalysis && showMatchScore) {
    return (
      <div className="min-h-screen bg-white pb-20 px-4 py-4">
        <MatchingAnalysis 
          analysis={getMockMatchAnalysis(id as string)} 
          onBack={() => setShowMatchingAnalysis(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold">공고 상세</h1>
          </div>
          <button 
            onClick={handleToggleFavorite}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label={job.isFavorite ? "관심 공고에서 제거" : "관심 공고에 추가"}
          >
            {job.isFavorite ? (
              <Star className="text-yellow-500" size={24} />
            ) : (
              <StarOff size={24} />
            )}
          </button>
        </div>
      </header>

      <main className="px-4 py-6">
        {showMatchScore && (
          <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold">맞춤형 공고 분석</h3>
              <p className="text-sm text-gray-600 mt-1 mb-3">나와 잘 맞는 공고인지 알아보세요</p>
              <div className="mb-6">
                <MatchScoreGauge score={matchScore} />
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 border-dashed border-gray-300"
              onClick={() => setShowMatchingAnalysis(true)}
            >
              <BarChart2 size={16} className="mr-2" />
              자세히 분석 보기
            </Button>
          </div>
        )}
        
        <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          {job.category && (
            <div className="inline-block bg-app-light-blue text-app-blue px-3 py-1 rounded-full text-xs mb-2">
              {job.category}
            </div>
          )}
          
          <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
          <p className="text-lg text-gray-700 mb-4">{job.company}</p>
          
          <div className="space-y-2">
            {job.location && (
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                <span>{job.location}</span>
              </div>
            )}
            
            <div className="flex items-center text-gray-600">
              <Calendar size={18} className="mr-2" />
              <span>마감일: {job.deadline || '상시채용'}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Building size={18} className="mr-2" />
              <span>고용형태: {job.employmentType || '미지정'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
          <h3 className="text-xl font-bold mb-4">공고 내용</h3>
          <div className="prose">
            {job.description ? (
              <p className="whitespace-pre-line">{job.description}</p>
            ) : (
              <p>해당 공고에 대한 상세 설명이 없습니다.</p>
            )}
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-bold mb-4">지원 자격</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>관련 분야 경력 1년 이상</li>
            <li>성별, 연령 제한 없음</li>
            <li>문서 작성 능력 우수자 우대</li>
          </ul>

          <Separator className="my-6" />

          <h3 className="text-xl font-bold mb-4">근무 조건</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>근무 시간: 09:00 ~ 18:00 (주 5일)</li>
            <li>급여: 면접 후 결정</li>
            <li>복리후생: 4대보험, 퇴직금, 중식제공</li>
          </ul>
        </div>

        <div className="mt-6">
          <Button 
            className="w-full py-6 text-lg"
            onClick={() => setShowApplyDialog(true)}
          >
            지원하기 <Briefcase className="ml-2" />
          </Button>
        </div>
      </main>

      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{job.title} 지원하기</DialogTitle>
            <DialogDescription>
              {job.company}에 지원하는 방법을 선택해주세요.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="resume">이력서 파일 업로드</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="resume" 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileChange}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleApplyWithFile}
                >
                  제출
                </Button>
              </div>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  선택된 파일: {selectedFile.name}
                </p>
              )}
            </div>
            
            <Separator />
            
            <div className="grid gap-2">
              <Label>AI 자기소개서 작성</Label>
              <Button 
                className="w-full" 
                onClick={handleCreateCoverLetter}
              >
                <PenTool size={16} className="mr-2" />
                자기소개서 생성하기
              </Button>
              <p className="text-sm text-muted-foreground">
                AI가 도와드리는 자기소개서 작성 툴을 이용해보세요.
              </p>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setShowApplyDialog(false)}
            >
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
};

export default JobDetail;
