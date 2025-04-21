
import React from 'react';
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
    { value: '기획·전략', label: '기획·전략' },
    { value: '마케팅·홍보', label: '마케팅·홍보' },
    { value: '영업·판매·무역', label: '영업·판매·무역' },
    { value: '상품기획·MD', label: '상품기획·MD' },
    { value: '고객상담·TM', label: '고객상담·TM' },
    { value: '구매·자재·물류', label: '구매·자재·물류' },
    { value: '건설·건축', label: '건설·건축' },
    { value: '의료', label: '의료' },
    { value: '연구·R&D', label: '연구·R&D' },
    { value: '회계·세무·재무', label: '회계·세무·재무' },
    { value: '인사·노무·HRD', label: '인사·노무·HRD' },
    { value: '총무·법무·사무', label: '총무·법무·사무' },
    { value: 'IT개발·데이터', label: 'IT개발·데이터' },
    { value: '디자인', label: '디자인' },
    { value: '서비스', label: '서비스' },
    { value: '교육', label: '교육' },
    { value: '미디어·문화·스포츠', label: '미디어·문화·스포츠' },
    { value: '금융·보험', label: '금융·보험' },
    { value: '생산', label: '생산' },
    { value: '공공·복지', label: '공공·복지' },
    { value: '운전·운송·배송', label: '운전·운송·배송' },
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
    <div className="flex gap-3 w-full max-w-xl mx-auto mb-4">
      <div className="flex-1 flex items-center gap-2 border-2 border-gray-300 rounded-full px-5 py-2 bg-white h-10">
        <Briefcase size={20} className="text-app-blue" />
        <Select onValueChange={(value) => onFilterChange('jobType', value)}>
          <SelectTrigger className="border-0 p-0 h-10 text-xl font-bold shadow-none focus:ring-0">
            <SelectValue placeholder="직업 선택" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            {jobTypes.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 flex items-center gap-2 border-2 border-gray-300 rounded-full px-5 py-2 bg-white h-10">
        <MapPin size={20} className="text-app-blue" />
        <Select onValueChange={(value) => onFilterChange('region', value)}>
          <SelectTrigger className="border-0 p-0 h-10 text-xl font-bold shadow-none focus:ring-0">
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

