
import React, { useState } from 'react';
import { Search, MapPin, Briefcase, School, LightbulbIcon, Calendar } from 'lucide-react';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import JobToggle from '../components/JobToggle';
import JobCard from '../components/JobCard';
import CategoryCard from '../components/CategoryCard';
import BottomNavigation from '../components/BottomNavigation';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs } from '../services/jobService';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'all'>('recommended');
  
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  // Filter jobs by category for different sections
  const partTimeJobs = jobs?.filter(job => job.employmentType === '파트타임') || [];
  const recentJobs = jobs?.slice(0, 3) || [];
  const nearbyJobs = jobs?.filter(job => job.location?.includes('서울')) || [];

  // Sample data for the recommended jobs
  const recommendedJobs = [
    {
      id: 1,
      title: '방문간호사 모집 공고 (파트 타임)',
      company: '주식회사웰케어스테이션',
      highlight: 'D-2',
      imageUrl: '/lovable-uploads/3aa8ac17-9c21-4161-ae1f-3e092f26a777.png'
    },
    {
      id: 2,
      title: '[서울금연지원센터] 입원환자 금연상담사',
      company: '이화여자대학교 산학협력단',
      category: '상시채용',
    },
    {
      id: 3,
      title: '서울특별시어린이병원 기간제 노동자 채용 공고',
      company: '서울특별시어린이병원',
      location: '서울 서초구',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <SearchBar placeholder="공고를 검색해주세요." />
        <JobToggle activeTab={activeTab} setActiveTab={setActiveTab} />
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {activeTab === 'recommended' && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">김현속님을 위한</h2>
              <h2 className="text-2xl font-bold mb-4">오늘의 추천 구직 공고</h2>
              <p className="text-gray-600 mb-4">내 이력과 적합한 공고를 확인해보세요.</p>
              
              {/* Recommended Jobs */}
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <JobCard 
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    imageUrl={job.imageUrl}
                    category={job.category}
                    highlight={job.highlight}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'all' && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">전체 구직 공고</h2>
            {isLoading ? (
              <p>로딩 중...</p>
            ) : (
              <div className="space-y-4">
                {jobs?.map((job) => (
                  <JobCard 
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recent Public Job Information */}
        <div className="mb-6">
          <div className="bg-app-light-blue p-4 rounded-lg flex items-center mb-4">
            <Search className="text-app-blue mr-2" size={20} />
            <span className="font-medium">최근 올라온 공공 일자리 정보</span>
          </div>
          
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <JobCard 
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* Part-time Job Postings */}
          <CategoryCard 
            title="파트 타임 모집 공고" 
            icon={Briefcase}
            backgroundColor="bg-yellow-100"
            to="/jobs/part-time" 
          />
          
          {/* Job Postings Near Me */}
          <CategoryCard 
            title="집에서 가까운 모집 공고" 
            icon={MapPin} 
            backgroundColor="bg-green-100"
            to="/jobs/nearby"
          />
          
          {/* Job Preparation Education */}
          <CategoryCard 
            title="취업 준비 교육 정보" 
            icon={School}
            backgroundColor="bg-purple-100"
            to="/education" 
          />

          {/* Educational Program */}
          <CategoryCard 
            title="교육생 모집" 
            icon={LightbulbIcon}
            backgroundColor="bg-blue-100"
            to="/programs" 
          />
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
