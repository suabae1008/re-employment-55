import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Clock, Calendar, Star, Filter, Heart, School, Sparkles, List } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import BottomNavigation from '../components/BottomNavigation';
import JobCard from '../components/JobCard';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs, getEducationData } from '../services/jobService';
import { Job } from '../components/JobList';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'recommended' | 'all'>('recommended');
  const [userName, setUserName] = useState<string>('김현숙');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
    
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

  const { data: educationPrograms } = useQuery({
    queryKey: ['education'],
    queryFn: () => getEducationData(),
  });

  const handleFilterChange = (filterType: 'jobType' | 'region', value: string) => {
    if (filterType === 'jobType') {
      setJobTypeFilter(value);
    } else {
      setRegionFilter(value);
    }
  };

  const filteredJobs = React.useMemo(() => {
    if (!jobs) return [];
    
    return jobs.filter(job => {
      const matchesJobType = jobTypeFilter === 'all' || job.category === jobTypeFilter;
      const matchesRegion = regionFilter === 'all' || job.location?.includes(regionFilter);
      return matchesJobType && matchesRegion;
    });
  }, [jobs, jobTypeFilter, regionFilter]);

  const handleJobCardClick = (jobId: string | number) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="pt-5 px-5">
        <div className="flex justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bb4f7ec5b45888b3e493a8729d13e4ef11c4dee?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
            className="w-16 h-auto object-contain"
            alt="Logo"
          />
        </div>

        <div className="flex mt-6 min-h-14 rounded-full border-2 border-app-blue bg-white px-6 py-3 items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/07a7ba0cf04bf9e919490e2a92981e563a46f773?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
            className="w-5 h-5 object-contain mr-10"
            alt="Search icon"
          />
          <div className="text-gray-500 text-xl font-semibold">공고를 검색해주세요.</div>
        </div>

        <div className="flex mt-6 w-full gap-3 mb-1">
          <button 
            onClick={() => setActiveTab('recommended')}
            className={`flex flex-1 h-10 px-3 py-1 items-center gap-2 justify-start rounded-full text-xl font-bold ${
              activeTab === 'recommended' 
                ? 'bg-app-blue text-white' 
                : 'bg-white text-gray-600 border-2 border-gray-300'
            }`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/99ff82deca2bbbefe53ecc2ef855ef055ca8d29a?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
              className="w-5 h-5 object-contain"
              alt="Recommended icon"
            />
            <span className="self-stretch my-auto">추천 구직 공고</span>
          </button>
          <button 
            onClick={() => setActiveTab('all')}
            className={`flex flex-1 h-10 px-3 py-1 items-center gap-2 justify-start rounded-full text-xl font-bold ${
              activeTab === 'all' 
                ? 'bg-app-blue text-white' 
                : 'bg-white text-gray-600 border-2 border-gray-300'
            }`}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e40b44359d8cfa5848cd1930f57ccda137f7d339?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
              className="w-5 h-5 object-contain"
              alt="All jobs icon"
            />
            <span className="self-stretch my-auto">전체 구직 공고</span>
          </button>
        </div>
      </header>

      <main className="px-5">
        {activeTab === 'recommended' && (
          <>
            <section className="mt-4">
              <h1 className="text-2xl text-gray-800 font-bold leading-10">
                {userName}님을 위한<br />
                오늘의 추천 구직 공고
              </h1>
              <p className="text-base text-gray-600 leading-8 mt-2">
                내 이력과 적합한 공고를 확인해보세요.
              </p>

              <article 
                className="mt-4 bg-white rounded-xl border-2 border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleJobCardClick(1)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base text-gray-600 font-bold">주식회사웰케어스테이션</h3>
                  <div className="bg-gray-100 rounded-full px-2 py-1 text-sm font-bold">
                    <span className="text-gray-800 mr-1">Ai매치</span>
                    <span className="text-app-blue">84%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h2 className="text-xl text-gray-900 font-bold">방문간호사 모집 공고 (파트 타임)</h2>
                  <span className="text-lg font-bold text-red-600">D-2</span>
                </div>
              </article>

              <article 
                className="mt-4 bg-white rounded-xl border-2 border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleJobCardClick(2)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base text-gray-600 font-bold">이화여자대학교 산학협력단</h3>
                  <div className="bg-gray-100 rounded-full px-2 py-1 text-sm font-bold">
                    <span className="text-gray-800 mr-1">Ai매치</span>
                    <span className="text-app-blue">82%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h2 className="text-xl text-gray-900 font-bold">[서울금연지원센터] 입원환자 ...</h2>
                  <span className="text-lg font-bold text-app-blue">상시채용</span>
                </div>
              </article>
            </section>

            <div className="mt-5 flex flex-col gap-2">
              <Link to="/jobs/part-time" className="block">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all">
                  <div className="px-2">
                    <h2 className="text-xl font-bold text-gray-900 py-2 px-2 rounded-xl mb-2 bg-red-100 w-full">
                      🎈 파트 타임 모집 공고
                    </h2>
                  </div>
                  <div className="relative">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/af7462bc608ebdda31fb77f7512f012d8e32f2a5"
                      alt="파트타임 일자리"
                      className="w-full h-[182px] object-cover"
                    />
                    <h3 className="absolute bottom-0 left-0 right-0 p-2 text-white font-extrabold text-base leading-8 bg-gradient-to-t from-black/50 to-transparent">
                      서울북부교육청 학습비타민 지원가 모집 (주 3회)
                    </h3>
                  </div>
                </article>
              </Link>

              <Link to="/jobs/nearby" className="block">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all">
                  <div className="px-2">
                    <h2 className="text-xl font-bold text-gray-900 py-2 px-2 rounded-xl mb-2 bg-green-100 w-full">
                      🏡 집에서 가까운 모집 공고
                    </h2>
                  </div>
                  <div className="relative">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e6c5f6e8a9bd491a4280ee026463466e00c7fc9?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
                      alt="근처 일자리"
                      className="w-full h-[182px] object-cover"
                    />
                    <h3 className="absolute bottom-0 left-0 right-0 p-2 text-white font-extrabold text-base leading-8 bg-gradient-to-t from-black/50 to-transparent">
                      송파구시설관리공단 주임간호사 채용
                    </h3>
                  </div>
                </article>
              </Link>

              <Link to="/education" className="block">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all">
                  <div className="px-2">
                    <h2 className="text-xl font-bold text-gray-900 py-2 px-2 rounded-xl mb-2 bg-yellow-100 w-full">
                      📝 취업 준비 교육 정보
                    </h2>
                  </div>
                  <div className="relative">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a42b21f36731534d6f73a7f8ee22168d39794df3?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
                      alt="교육 정보"
                      className="w-full h-[182px] object-cover"
                    />
                  </div>
                </article>
              </Link>
            </div>
          </>
        )}

        {activeTab === 'all' && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold my-4">전체 구직 공고</h2>
            <JobFilters onFilterChange={handleFilterChange} />
            {isLoading ? (
              <p>로딩 중...</p>
            ) : (
              <div className="space-y-4">
                {filteredJobs && filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <article 
                      key={job.id} 
                      className="mt-4 bg-white rounded-xl border-2 border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleJobCardClick(job.id)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-base text-gray-600 font-bold">{job.company}</h3>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <h2 className="text-xl text-gray-900 font-bold">{job.title}</h2>
                        {job.highlight ? (
                          <span className="text-lg font-bold text-red-600">{job.highlight}</span>
                        ) : (
                          <span className="text-lg font-bold text-app-blue">상시채용</span>
                        )}
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-center py-4">해당 조건의 구직 공고가 없습니다.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
