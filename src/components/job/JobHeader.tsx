
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, StarOff } from 'lucide-react';
import { Job } from '../../components/JobList';
import { toast } from 'sonner';

interface JobHeaderProps {
  job: Job;
  handleToggleFavorite: () => void;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job, handleToggleFavorite }) => {
  useEffect(() => {
    // Add entrance animation when component mounts
    const header = document.querySelector('.job-header');
    if (header) {
      header.classList.add('animate-fade-in');
    }
  }, []);

  return (
    <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm job-header">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">공고 상세</h1>
        </div>
        <button 
          onClick={() => {
            handleToggleFavorite();
            toast(job.isFavorite ? '관심 공고에서 제거되었습니다' : '관심 공고에 추가되었습니다');
            
            // Add animation when favorited
            const btn = document.querySelector('.favorite-btn');
            if (btn) {
              btn.classList.add('scale-110');
              setTimeout(() => btn.classList.remove('scale-110'), 200);
            }
          }}
          className="p-2 hover:bg-gray-100 rounded-full favorite-btn transition-transform"
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
