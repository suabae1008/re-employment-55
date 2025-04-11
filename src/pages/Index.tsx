
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, School, Calendar, BookOpen, Heart, Medal, Coffee, Clock } from 'lucide-react';
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

  // Senior-focused resources and programs
  const seniorResources = [
    {
      title: "시니어 디지털 교육",
      description: "스마트폰 활용법부터 컴퓨터 기초까지 배우는 무료 교육",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "건강 및 복지 서비스",
      description: "노인 건강검진 및 복지 프로그램 안내",
      icon: Heart,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "재취업 지원 프로그램",
      description: "50대 이상 맞춤형 취업 상담 및 연계 서비스",
      icon: Briefcase,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "여가활동 프로그램",
      description: "문화체험 및 취미활동 지원",
      icon: Coffee,
      color: "bg-amber-100 text-amber-600",
    }
  ];

  // Popular job categories for seniors
  const popularCategories = [
    {
      title: "요양보호사",
      count: "52개 공고",
      icon: Heart,
      color: "bg-pink-100",
    },
    {
      title: "간호조무사",
      count: "38개 공고",
      icon: Medal,
      color: "bg-purple-100",
    },
    {
      title: "매장관리",
      count: "45개 공고",
      icon: Briefcase,
      color: "bg-blue-100",
    },
    {
      title: "경비원",
      count: "29개 공고",
      icon: Clock,
      color: "bg-green-100",
    }
  ];

  const handleResourceClick = (title: string) => {
    toast(`${title} 정보를 확인합니다.`);
  };

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
            {/* Welcome Section with Animation */}
            <div className="mb-8 bg-gradient-to-r from-app-light-blue to-blue-100 rounded-xl p-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-2">{userName}님, 반갑습니다!</h2>
              <h2 className="text-2xl font-bold mb-4">오늘의 추천 구직 공고</h2>
              <p className="text-gray-700 mb-4">내 이력과 적합한 공고를 확인해보세요.</p>
              
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

            {/* Senior Resources Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">시니어를 위한 유용한 정보</h3>
              <div className="grid grid-cols-2 gap-3">
                {seniorResources.map((resource, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-md transition-shadow duration-200 hover:scale-105"
                    onClick={() => handleResourceClick(resource.title)}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-full ${resource.color} flex items-center justify-center mb-3 mt-3`}>
                        <resource.icon size={24} />
                      </div>
                      <h4 className="font-semibold mb-1">{resource.title}</h4>
                      <p className="text-xs text-gray-600">{resource.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Popular Job Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">인기 있는 시니어 일자리</h3>
              <div className="grid grid-cols-2 gap-3">
                {popularCategories.map((category, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 flex items-center">
                      <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center mr-3`}>
                        <category.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{category.title}</h4>
                        <p className="text-xs text-gray-600">{category.count}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Public Job Information - Carousel */}
            <div className="mb-8">
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
