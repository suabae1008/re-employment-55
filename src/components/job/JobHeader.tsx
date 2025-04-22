
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Job } from '../../components/JobList';

interface JobHeaderProps {
  job: Job;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.state?.fromRecommended) {
      navigate('/');
    } else {
      navigate('/', { state: { activeTab: 'all' } });
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
      </div>
    </header>
  );
};

export default JobHeader;
