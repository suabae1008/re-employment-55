
import React from 'react';
import { MapPin, Calendar, Building } from 'lucide-react';
import { Job } from '../../components/JobList';

interface JobInfoProps {
  job: Job;
}

const JobInfo: React.FC<JobInfoProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <div className="flex items-start gap-2 mb-4">
            <img src={job.companyLogo || "/lovable-uploads/0e956dd8-196b-4a92-9db1-39d0d2144f98.png"} 
                 alt={job.company} 
                 className="w-12 h-12 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold">{job.company}</h1>
              <p className="text-gray-600">{job.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">경력</p>
              <p>경력 1년 이상</p>
            </div>
            <div>
              <p className="text-gray-500">금여</p>
              <p>월급 2.6백만원</p>
            </div>
            <div>
              <p className="text-gray-500">학력</p>
              <p>학력무관</p>
            </div>
            <div>
              <p className="text-gray-500">근무지역</p>
              <p>{job.location || '경기 용인시'}</p>
            </div>
            <div>
              <p className="text-gray-500">근무형태</p>
              <p>계약직 24개월</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">접수 기간 및 방법</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>접수 기간: 채용 시 마감</p>
              <p>접수 방법: 온라인, 이메일</p>
              <p>이력서 양식: 자유</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">문의 사항</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>휴대폰: 010-0000-0000</p>
              <p>이메일: glskdnfls@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
