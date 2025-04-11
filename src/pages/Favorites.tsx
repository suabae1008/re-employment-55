
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Job } from '../components/JobList';
import JobList from '../components/JobList';
import BottomNavigation from '../components/BottomNavigation';
import { getFavoriteJobs, toggleFavoriteJob } from '../services/jobService';
import { getMockMatchAnalysis } from '../services/matchingService';

const Favorites = () => {
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [jobScores, setJobScores] = useState<Record<string | number, number>>({});

  useEffect(() => {
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

    loadFavoriteJobs();
  }, []);

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

  // Add match score to each job
  const jobsWithScores = filteredJobs.map(job => ({
    ...job,
    highlight: jobScores[job.id] ? `매칭 ${jobScores[job.id]}점` : undefined
  }));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">관심 공고</h1>
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
      <main className="px-4 py-6">
        {loading ? (
          <div className="text-center py-10">
            <p>데이터를 불러오는 중...</p>
          </div>
        ) : favoriteJobs.length > 0 ? (
          <JobList 
            jobs={jobsWithScores} 
            onToggleFavorite={handleToggleFavorite} 
            fromFavorites={true}
          />
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
