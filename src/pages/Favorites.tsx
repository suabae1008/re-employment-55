
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Job } from '../components/JobList';
import { Button } from "@/components/ui/button";
import JobCard from '../components/JobCard';
import BottomNavigation from '../components/BottomNavigation';
import { getFavoriteJobs, toggleFavoriteJob } from '../services/jobService';
import { getMockMatchAnalysis } from '../services/matchingService';

const Favorites = () => {
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [jobScores, setJobScores] = useState<Record<string | number, number>>({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFavoriteJobs();
  }, []);

  const loadFavoriteJobs = () => {
    try {
      setLoading(true);
      const favorites = getFavoriteJobs();
      setFavoriteJobs(favorites);
      
      // Calculate match scores for each favorite job
      const scores: Record<string | number, number> = {};
      favorites.forEach(job => {
        const analysis = getMockMatchAnalysis(job.id.toString());
        scores[job.id] = analysis.totalScore;
      });
      setJobScores(scores);
    } catch (error) {
      console.error('Failed to load favorite jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadFavoriteJobs();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleToggleFavorite = (jobId: string | number) => {
    toggleFavoriteJob(jobId);
    // Remove the job from the favorites list directly
    setFavoriteJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    // Also remove the job score
    setJobScores(prevScores => {
      const newScores = { ...prevScores };
      delete newScores[jobId];
      return newScores;
    });
  };

  const filteredJobs = searchQuery 
    ? favoriteJobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (job.category && job.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : favoriteJobs;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold">관심 공고</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={20} className={`${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="관심 공고 검색"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-2">
        {loading ? (
          <div className="text-center py-10">
            <p>데이터를 불러오는 중...</p>
          </div>
        ) : favoriteJobs.length > 0 ? (
          <div>
            {filteredJobs.map(job => (
              <div key={job.id} className="mb-3 relative">
                <Link to={`/job/${job.id}`} state={{ fromFavorites: true }}>
                  <div className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow p-3 pl-12">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-gray-600 text-sm">{job.company}</p>
                        {job.deadline && (
                          <p className="text-gray-500 text-xs mt-1">~{job.deadline}</p>
                        )}
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
                        매칭점수 {jobScores[job.id]}점
                      </div>
                    </div>
                  </div>
                </Link>
                <button 
                  className="absolute top-1/2 -translate-y-1/2 left-3 text-yellow-500"
                  onClick={() => handleToggleFavorite(job.id)}
                  aria-label="관심 공고에서 제거"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">저장된 관심 공고가 없습니다.</p>
            <p className="text-gray-500 mt-2">홈 또는 지원소개서 페이지에서 별표 아이콘을 클릭하여 관심 공고로 등록해보세요.</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Favorites;
