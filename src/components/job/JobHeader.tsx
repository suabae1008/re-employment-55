
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { Job } from '../../components/JobList';
import { toggleFavoriteJob, isJobFavorite } from '../../services/jobService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface JobHeaderProps {
  job: Job;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = React.useState(isJobFavorite(job.id));

  const handleBack = () => {
    if (location.state?.fromRecommended) {
      navigate('/');
    } else {
      navigate('/', { state: { activeTab: 'all' } });
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await toggleFavoriteJob(job.id);
      setIsFavorite(!isFavorite);
      toast(
        isFavorite
          ? "관심 공고에서 제거되었습니다"
          : "관심 공고에 추가되었습니다"
      );
    } catch (error) {
      console.error("관심 공고 토글 실패:", error);
      toast("요청 처리 중 오류가 발생했습니다");
    }
  };

  return (
    <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm job-header">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">공고 상세</h1>
        </div>
        <button
          onClick={handleToggleFavorite}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Star
            size={24}
            className={cn(
              "transition-colors",
              isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            )}
          />
        </button>
      </div>
    </header>
  );
};

export default JobHeader;
