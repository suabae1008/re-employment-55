
import React, { useState } from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface JobFiltersProps {
  onFilterChange: (filterType: 'jobType' | 'region', value: string) => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange }) => {
  const jobTypes = [
    { value: 'all', label: '모든 직종' },
    { value: 'nursing', label: '간호/요양' },
    { value: 'education', label: '교육/보육' },
    { value: 'office', label: '사무직' },
    { value: 'service', label: '서비스/판매' },
    { value: 'labor', label: '단순노무' },
  ];

  const seoulDistricts = [
    { value: 'all', label: '전체 지역' },
    { value: '강남구', label: '강남구' },
    { value: '강동구', label: '강동구' },
    { value: '강북구', label: '강북구' },
    { value: '강서구', label: '강서구' },
    { value: '관악구', label: '관악구' },
    { value: '광진구', label: '광진구' },
    { value: '구로구', label: '구로구' },
    { value: '금천구', label: '금천구' },
    { value: '노원구', label: '노원구' },
    { value: '도봉구', label: '도봉구' },
    { value: '동대문구', label: '동대문구' },
    { value: '동작구', label: '동작구' },
    { value: '마포구', label: '마포구' },
    { value: '서대문구', label: '서대문구' },
    { value: '서초구', label: '서초구' },
    { value: '성동구', label: '성동구' },
    { value: '성북구', label: '성북구' },
    { value: '송파구', label: '송파구' },
    { value: '양천구', label: '양천구' },
    { value: '영등포구', label: '영등포구' },
    { value: '용산구', label: '용산구' },
    { value: '은평구', label: '은평구' },
    { value: '종로구', label: '종로구' },
    { value: '중구', label: '중구' },
    { value: '중랑구', label: '중랑구' },
  ];

  return (
    <div className="flex gap-2 w-full max-w-xl mx-auto mb-4">
      <div className="flex-1 flex items-center gap-2 border rounded-full px-3 py-2 bg-white">
        <Briefcase size={16} className="text-app-blue" />
        <Select onValueChange={(value) => onFilterChange('jobType', value)}>
          <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0">
            <SelectValue placeholder="직업 선택" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 flex items-center gap-2 border rounded-full px-3 py-2 bg-white">
        <MapPin size={16} className="text-app-blue" />
        <Select onValueChange={(value) => onFilterChange('region', value)}>
          <SelectTrigger className="border-0 p-0 h-auto shadow-none focus:ring-0">
            <SelectValue placeholder="지역별 선택" />
          </SelectTrigger>
          <SelectContent>
            {seoulDistricts.map(district => (
              <SelectItem key={district.value} value={district.value}>
                {district.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobFilters;
