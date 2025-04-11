
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Clock, Calendar, Star, Filter } from 'lucide-react';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import JobToggle from '../components/JobToggle';
import JobFilters from '../components/JobFilters';
import JobCard from '../components/JobCard';
import BottomNavigation from '../components/BottomNavigation';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs } from '../services/jobService';
import { Job } from '../components/JobList';
import { toast } from 'sonner';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  // Job categories for the recommended tab
  const partTimeJobs = jobs?.filter(job => job.employmentType === '파트타임') || [];
  const recentJobs = jobs?.slice(0, 5) || [];
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

  // Categories for job types
  const jobCategories = [
    { 
      name: '요양보호사', 
      count: '52', 
      icon: <Heart className="text-pink-500" size={24} />,
      color: 'bg-pink-100'
    },
    { 
      name: '간호조무사', 
      count: '38', 
      icon: <Star className="text-purple-500" size={24} />,
      color: 'bg-purple-100'
    },
    { 
      name: '매장관리', 
      count: '45', 
      icon: <Briefcase className="text-blue-500" size={24} />,
      color: 'bg-blue-100'
    },
    { 
      name: '경비원', 
      count: '29', 
      icon: <Clock className="text-green-500" size={24} />,
      color: 'bg-green-100'
    }
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
            {/* Welcome Section */}
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-2">{userName}님, 반갑습니다!</h2>
              <h2 className="text-xl font-bold mb-4">오늘의 추천 구직 공고</h2>
              
              {/* Featured Job Cards - Enhanced Visual */}
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

            {/* Job Categories Cards */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Filter size={20} className="text-app-blue mr-2" />
                <h3 className="font-semibold text-lg">일자리 분류</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {jobCategories.map((category, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:shadow-md transition-shadow hover:scale-105 duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mr-3`}>
                          {category.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold">{category.name}</h4>
                          <p className="text-xs text-gray-600">{category.count}개 공고</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Interactive Public Job Information Carousel */}
            <div className="mb-8">
              <div className="bg-app-light-blue p-4 rounded-lg flex items-center mb-4">
                <Calendar className="text-app-blue mr-2" size={20} />
                <span className="font-medium">최근 올라온 공공 일자리 정보</span>
              </div>
              
              <Carousel 
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {recentJobs.map((job) => (
                    <CarouselItem key={job.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="h-full p-1">
                        <JobCard 
                          id={job.id}
                          title={job.title}
                          company={job.company}
                          location={job.location}
                          category={job.category}
                          highlight={job.highlight}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="static transform-none mx-2 bg-white shadow-md hover:bg-gray-50" />
                  <CarouselNext className="static transform-none mx-2 bg-white shadow-md hover:bg-gray-50" />
                </div>
              </Carousel>
            </div>

            {/* Job Categories as Cards */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              {/* Part-time Job Postings */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <Clock className="text-app-blue mr-2" size={20} />
                  <h3 className="font-medium">파트 타임 모집 공고</h3>
                </div>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {partTimeJobs.map((job) => (
                      <CarouselItem key={job.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                        <div className="h-full p-1">
                          <JobCard 
                            id={job.id}
                            title={job.title}
                            company={job.company}
                            location={job.location}
                            category={job.category}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    <CarouselPrevious className="static transform-none mx-2 bg-white shadow-md hover:bg-gray-50" />
                    <CarouselNext className="static transform-none mx-2 bg-white shadow-md hover:bg-gray-50" />
                  </div>
                </Carousel>
              </div>
              
              {/* Job Postings Near Me */}
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <MapPin className="text-app-blue mr-2" size={20} />
                  <h3 className="font-medium">집에서 가까운 모집 공고</h3>
                </div>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {nearbyJobs.map((job) => (
                      <CarouselItem key={job.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                        <div className="h-full p-1">
                          <JobCard 
                            id={job.id}
                            title={job.title}
                            company={job.company}
                            location={job.location}
                            category={job.category}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center mt-4">
                    <CarouselPrevious className="static transform-none mx-2 bg-white shadow-md hover:bg-gray-50" />
                    <CarouselNext className="static transform-none mx-2 bg-white shadow-md hover:bg-gray-50" />
                  </div>
                </Carousel>
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
