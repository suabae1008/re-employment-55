
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getJobsByType } from '../services/jobService';
import JobCard from '../components/JobCard';
import BottomNavigation from '../components/BottomNavigation';

const PartTimeJobs = () => {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs', 'part-time'],
    queryFn: () => getJobsByType('part-time'),
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">파트 타임 모집 공고</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {isLoading ? (
          <p className="text-center py-4">로딩 중...</p>
        ) : jobs && jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => (
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
        ) : (
          <p className="text-center py-4">해당 조건의 구직 공고가 없습니다.</p>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default PartTimeJobs;
