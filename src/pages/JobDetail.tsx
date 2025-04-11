
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, StarOff, MapPin, Calendar, Building, Briefcase } from 'lucide-react';
import { Job } from '../components/JobList';
import { getJobById, toggleFavoriteJob } from '../services/jobService';
import BottomNavigation from '../components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchedJob = getJobById(id);
      setJob(fetchedJob);
      setLoading(false);
    }
  }, [id]);

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
      {/* Header */}
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

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Job Header Info */}
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

        {/* Job Description */}
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

        {/* Apply Button */}
        <div className="mt-6">
          <Button className="w-full py-6 text-lg" asChild>
            <Link to="/apply">
              지원하기 <Briefcase className="ml-2" />
            </Link>
          </Button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default JobDetail;
