
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, School, Calendar } from 'lucide-react';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import JobToggle from '../components/JobToggle';
import JobFilters from '../components/JobFilters';
import JobCard from '../components/JobCard';
import CategoryCard from '../components/CategoryCard';
import BottomNavigation from '../components/BottomNavigation';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs } from '../services/jobService';
import { Job } from '../components/JobList';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'all'>('recommended');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    jobType: 'all',
    region: 'all'
  });
  
  // Get user name from localStorage or use default
  const [userName, setUserName] = useState<string>('김현숙');
  
  useEffect(() => {
    // Check localStorage for user name
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
    
    // Add event listener for name changes
    const handleStorageChange = () => {
      const updatedName = localStorage.getItem('userName');
      if (updatedName) {
        setUserName(updatedName);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  // Filter jobs based on selected filters
  useEffect(() => {
    if (!jobs) {
      setFilteredJobs([]);
      return;
    }

    let result = [...jobs];
    
    if (filters.jobType !== 'all') {
      result = result.filter(job => job.category?.includes(filters.jobType));
    }
    
    if (filters.region !== 'all') {
      result = result.filter(job => job.location?.includes(filters.region));
    }
    
    setFilteredJobs(result);
  }, [jobs, filters]);

  // Part-time jobs and nearby jobs for recommended tab
  const partTimeJobs = jobs?.filter(job => job.employmentType === '파트타임') || [];
  const recentJobs = jobs?.slice(0, 3) || [];
  const nearbyJobs = jobs?.filter(job => job.location?.includes('서울')) || [];

  // Handle filter changes
  const handleFilterChange = (filterType: 'jobType' | 'region', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Sample data for the recommended jobs
  const recommendedJobs = [
    {
      id: 1,
      title: '방문간호사 모집 공고 (파트 타임)',
      company: '주식회사웰케어스테이션',
      highlight: 'D-2',
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
        {activeTab === 'all' && (
          <JobFilters onFilterChange={handleFilterChange} />
        )}
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {activeTab === 'recommended' && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{userName}님을 위한</h2>
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
                    category={job.category}
                    highlight={job.highlight}
                  />
                ))}
              </div>
            </div>

            {/* Recent Public Job Information - Carousel */}
            <div className="mb-6">
              <div className="bg-app-light-blue p-4 rounded-lg flex items-center mb-4">
                <Search className="text-app-blue mr-2" size={20} />
                <span className="font-medium">최근 올라온 공공 일자리 정보</span>
              </div>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {recentJobs.map((job) => (
                    <CarouselItem key={job.id} className="md:basis-1/2 lg:basis-1/3">
                      <JobCard 
                        id={job.id}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1" />
                <CarouselNext className="right-1" />
              </Carousel>
            </div>

            {/* Categories as Horizontal Scrolling Cards */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {/* Part-time Job Postings */}
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-3">파트 타임 모집 공고</h3>
                <Carousel className="w-full">
                  <CarouselContent>
                    {partTimeJobs.map((job) => (
                      <CarouselItem key={job.id} className="md:basis-1/2 lg:basis-1/3">
                        <JobCard 
                          id={job.id}
                          title={job.title}
                          company={job.company}
                          location={job.location}
                          category={job.category}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-1" />
                  <CarouselNext className="right-1" />
                </Carousel>
              </div>
              
              {/* Job Postings Near Me */}
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-3">집에서 가까운 모집 공고</h3>
                <Carousel className="w-full">
                  <CarouselContent>
                    {nearbyJobs.map((job) => (
                      <CarouselItem key={job.id} className="md:basis-1/2 lg:basis-1/3">
                        <JobCard 
                          id={job.id}
                          title={job.title}
                          company={job.company}
                          location={job.location}
                          category={job.category}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-1" />
                  <CarouselNext className="right-1" />
                </Carousel>
              </div>
              
              {/* Job Preparation Education */}
              <div>
                <h3 className="text-lg font-medium mb-3">취업 준비 교육 정보</h3>
                <CategoryCard 
                  title="취업 준비 교육 정보" 
                  icon={School}
                  backgroundColor="bg-purple-100"
                  to="/education" 
                />
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
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <JobCard 
                      key={job.id}
                      id={job.id}
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      category={job.category}
                      highlight={job.highlight}
                    />
                  ))
                ) : (
                  <p className="text-center py-4">해당 조건의 구직 공고가 없습니다.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
