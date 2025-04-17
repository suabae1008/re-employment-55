
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, StarOff } from 'lucide-react';
import { Job } from '../../components/JobList';
import { toast } from 'sonner';

interface JobHeaderProps {
  job: Job;
  handleToggleFavorite: () => void;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job, handleToggleFavorite }) => {
  return (
    <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">공고 상세</h1>
        </div>
        <button 
          onClick={handleToggleFavorite}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label={job.isFavorite ? "관심 공고에서 제거" : "관심 공고에 추가"}
        >
          {job.isFavorite ? (
            <Star className="text-yellow-500" size={24} />
          ) : (
            <StarOff size={24} />
          )}
        </button>
      </div>
    </header>
  );
};

export default JobHeader;
