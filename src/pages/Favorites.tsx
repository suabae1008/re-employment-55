
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import BottomNavigation from '../components/BottomNavigation';

const Favorites = () => {
  // Sample data for saved job postings
  const savedJobs = [
    {
      id: 1,
      title: '방문간호사 모집 공고 (파트 타임)',
      company: '주식회사웰케어스테이션',
      highlight: 'D-2',
    },
    {
      id: 2,
      title: '송파구시설관리공단 주말간호사 채용',
      company: '송파구시설관리공단',
      location: '서울 송파구',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4 flex items-center">
        <Link to="/" className="mr-4">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">관심 공고</h1>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {savedJobs.length > 0 ? (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <JobCard 
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                highlight={job.highlight}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">저장된 관심 공고가 없습니다.</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Favorites;
