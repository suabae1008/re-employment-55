
import React from 'react';
import { MapPin, Calendar, Building } from 'lucide-react';
import { Job } from '../../components/JobList';

interface JobInfoProps {
  job: Job;
}

const JobInfo: React.FC<JobInfoProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
      {job.category && (
        <div className="inline-block bg-app-light-blue text-app-blue px-3 py-1 rounded-full text-xs mb-2">
          {job.category}
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p className="text-lg text-gray-700 mb-4">{job.company}</p>
      
      <div className="space-y-2">
        {job.location && (
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2" />
            <span>{job.location}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-600">
          <Calendar size={18} className="mr-2" />
          <span>마감일: {job.deadline || '상시채용'}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Building size={18} className="mr-2" />
          <span>고용형태: {job.employmentType || '미지정'}</span>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
