
import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getJobsByType } from '../services/jobService';
import JobCard from '../components/JobCard';
import BottomNavigation from '../components/BottomNavigation';
import { Job } from '../components/JobList';

const NearbyJobs = () => {
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ['jobs', 'nearby'],
    queryFn: () => getJobsByType('nearby'),
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">집에서 가까운 모집 공고</h1>
        </div>
      </header>

      {/* Location Section */}
      <div className="bg-white p-4 mb-4 flex items-center">
        <MapPin className="text-app-blue mr-2" size={20} />
        <span>현재 위치: 서울특별시 서초구</span>
      </div>

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

export default NearbyJobs;
