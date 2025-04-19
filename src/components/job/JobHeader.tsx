
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface JobHeaderProps {
  job: Job;
}

const JobHeader: React.FC<JobHeaderProps> = ({ job }) => {
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
      </div>
    </header>
  );
};

export default JobHeader;
