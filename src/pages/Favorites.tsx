import React, { useState, useEffect } from "react";
import { Star } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Job } from "../types/job";
import { Button } from "@/components/ui/button";
import BottomNavigation from "../components/BottomNavigation";
import { getFavoriteJobs, toggleFavoriteJob } from "../services/jobService";
import { getMockMatchAnalysis } from "../services/matchingService";
import Header from "@/components/Header";

const Favorites = () => {
  const [favoriteJobs, setFavoriteJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [jobScores, setJobScores] = useState<Record<string | number, number>>(
    {}
  );
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/', { state: { activeTab: 'all' } });
  };

  useEffect(() => {
    loadFavoriteJobs();
  }, []);

  const loadFavoriteJobs = async () => {
    try {
      setLoading(true);
      const favorites = await getFavoriteJobs();
      setFavoriteJobs(favorites);

      const scores: Record<string | number, number> = {};
      favorites.forEach((job) => {
        const analysis = getMockMatchAnalysis(job.id.toString());
        scores[job.id] = analysis.totalScore;
      });
      setJobScores(scores);
    } catch (error) {
      console.error("Failed to load favorite jobs:", error);
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
    setFavoriteJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    setJobScores((prevScores) => {
      const newScores = { ...prevScores };
      delete newScores[jobId];
      return newScores;
    });
  };

  const filteredJobs = searchQuery
    ? favoriteJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (job.location &&
            job.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (job.category &&
            job.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : favoriteJobs;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header
        title="관심 공고"
        refreshing={refreshing}
        onBack={handleBack}
      />

      <main className="px-4 py-2">
        {loading ? (
          <div className="text-center py-10">
            <p>데이터를 불러오는 중...</p>
          </div>
        ) : favoriteJobs.length > 0 ? (
          <div>
            {filteredJobs.map((job) => (
              <div key={job.id} className="mb-3 relative">
                <Link to={`/job/${job.id}`} state={{ fromFavorites: true }}>
                  <div className="border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow p-3 pl-12">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-gray-600 text-sm">{job.company}</p>
                        {job.deadline && (
                          <p className="text-gray-500 text-xs mt-1">
                            ~{job.deadline}
                          </p>
                        )}
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
                        매칭점수 {jobScores[job.id]}점
                      </div>
                    </div>
                  </div>
                </Link>
                <button
                  className="absolute top-1/2 -translate-y-1/2 left-3"
                  onClick={() => handleToggleFavorite(job.id)}
                  aria-label="관심 공고에서 제거"
                >
                  <Star
                    size={24}
                    className={cn(
                      "transition-colors",
                      "fill-yellow-400 text-yellow-400"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">저장된 관심 공고가 없습니다.</p>
            <p className="text-gray-500 mt-2">
              홈 또는 지원소개서 페이지에서 별표 아이콘을 클릭하여 관심 공고로
              등록해보세요.
            </p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Favorites;
