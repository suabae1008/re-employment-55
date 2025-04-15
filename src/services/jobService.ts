
import { fetchSeoulJobs } from './seoulJobsService';
import { Job } from '../components/JobList';

// Sample data that mimics the structure of job data
export const sampleJobs: Job[] = [
  {
    id: 1,
    title: '방문간호사 모집 공고 (파트 타임)',
    company: '주식회사웰케어스테이션',
    location: '서울 서초구',
    deadline: '2025-05-10',
    category: '의료/간호',
    isFavorite: false,
    employmentType: '파트타임',
    description: '저희 웰케어스테이션에서는 방문간호사를 모집합니다. 환자의 가정을 방문하여 간호 서비스를 제공하며, 건강 상태를 체크하고 의료 서비스를 제공합니다.\n\n주요 업무:\n- 환자 가정 방문 및 건강 상태 체크\n- 기본 간호 서비스 제공\n- 투약 관리 및 지도\n- 건강 관리 교육',
    highlight: 'D-2',
  },
  {
    id: 2,
    title: '[서울금연지원센터] 입원환자 금연상담사',
    company: '이화여자대학교 산학협력단',
    location: '서울 종로구',
    deadline: '2025-05-15',
    category: '상담/복지',
    isFavorite: false,
    employmentType: '계약직',
    description: '서울금연지원센터에서 입원환자를 대상으로 금연상담 서비스를 제공할 상담사를 모집합니다. 병원 내 입원 환자들을 대상으로 금연 교육 및 상담을 진행합니다.\n\n주요 업무:\n- 입원 환자 대상 금연 상담 진행\n- 금연 교육 프로그램 운영\n- 상담 내용 기록 및 관리\n- 금연 성공률 모니터링',
    highlight: '상시채용',
  },
  {
    id: 3,
    title: '서울특별시어린이병원 기간제 노동자 채용 공고',
    company: '서울특별시어린이병원',
    location: '서울 서초구',
    deadline: '2025-05-05',
    category: '의료/간호',
    isFavorite: false,
    employmentType: '기간제',
    description: '서울특별시어린이병원에서 기간제 노동자를 모집합니다. 어린이 환자들을 대상으로 진료 보조 및 간호 업무를 수행하며, 병원 행정 업무도 함께 담당합니다.\n\n주요 업무:\n- 어린이 환자 진료 보조\n- 간호 업무 지원\n- 병원 행정 업무 보조\n- 환자 및 보호자 응대',
  },
  {
    id: 4,
    title: '송파구시설관리공단 주말간호사 채용',
    company: '송파구시설관리공단',
    location: '서울 송파구',
    deadline: '2025-05-20',
    category: '의료/간호',
    isFavorite: false,
    employmentType: '주말근무',
    description: '송파구시설관리공단에서 주말에 근무할 간호사를 모집합니다. 주말에 시설을 이용하는 주민들을 위한 의료 서비스를 제공합니다.\n\n주요 업무:\n- 주말 이용객 응급처치\n- 건강 상담 서비스 제공\n- 의료기구 관리 및 소독\n- 의료 기록 관리',
  },
  {
    id: 5,
    title: '강동구 사회복지사 모집',
    company: '강동구청',
    location: '서울 강동구',
    deadline: '2025-05-12',
    category: '상담/복지',
    isFavorite: false,
    employmentType: '정규직',
    description: '강동구청에서 지역 주민들의 복지를 담당할 사회복지사를 모집합니다. 지역 사회 복지 프로그램을 기획하고 운영하며, 주민들의 복지 서비스 접근성을 높이는 역할을 담당합니다.\n\n주요 업무:\n- 지역 사회 복지 프로그램 기획 및 운영\n- 복지 서비스 상담 및 연계\n- 취약계층 지원 업무\n- 복지 정책 홍보 및 교육',
  },
  {
    id: 6,
    title: '노인요양센터 요양보호사 채용',
    company: '서울시노인복지센터',
    location: '서울 노원구',
    deadline: '상시채용',
    category: '요양/돌봄',
    isFavorite: false,
    employmentType: '정규직',
    description: '서울시노인복지센터에서 노인분들을 케어할 요양보호사를 모집합니다. 노인분들의 일상생활을 지원하고, 건강 관리를 돕는 역할을 담당합니다.\n\n주요 업무:\n- 노인 일상생활 지원\n- 식사 및 투약 보조\n- 위생 관리 지원\n- 건강 상태 모니터링',
  },
  {
    id: 7,
    title: '시니어 행정사무 지원 모집',
    company: '서울시청',
    location: '서울 중구',
    deadline: '2025-05-18',
    category: '사무/행정',
    isFavorite: false,
    employmentType: '계약직',
    description: '서울시청에서 시니어를 대상으로 행정사무 지원 인력을 모집합니다. 문서 관리, 데이터 입력 등의 행정업무를 담당하며, 시니어의 경험을 살릴 수 있는 환경을 제공합니다.\n\n주요 업무:\n- 행정 문서 관리\n- 데이터 입력 및 정리\n- 민원 접수 및 안내\n- 사무실 환경 관리',
  },
  {
    id: 8,
    title: '도서관 사서 보조 파트타임',
    company: '서울시립도서관',
    location: '서울 마포구',
    deadline: '2025-05-25',
    category: '교육/문화',
    isFavorite: false,
    employmentType: '파트타임',
    description: '서울시립도서관에서 사서 보조 업무를 담당할 파트타임 직원을 모집합니다. 도서 관리, 이용자 안내 등의 업무를 담당하며, 도서관 운영을 지원합니다.\n\n주요 업무:\n- 도서 대출 및 반납 처리\n- 도서 정리 및 관리\n- 도서관 이용자 안내\n- 도서관 프로그램 보조',
  },
];

// Education information data for job preparation
export interface EducationProgram {
  id: number;
  title: string;
  provider: string;
  duration: string;
  startDate: string;
  category: string;
}

export const educationData: EducationProgram[] = [
  {
    id: 1,
    title: '간호조무사 양성 과정',
    provider: '서울시 직업교육원',
    duration: '6개월',
    startDate: '2025-06-01',
    category: '의료/간호'
  },
  {
    id: 2,
    title: '사회복지사 2급 자격증 취득 과정',
    provider: '서울복지교육센터',
    duration: '3개월',
    startDate: '2025-05-15',
    category: '상담/복지'
  },
  {
    id: 3,
    title: '요양보호사 자격증 취득 과정',
    provider: '서울시 요양교육원',
    duration: '2개월',
    startDate: '2025-05-20',
    category: '요양/돌봄'
  }
];

// In a real application, this would fetch data from a database
// For now, we'll try to fetch from Seoul API first, then fall back to sample data
export const fetchJobs = async (): Promise<Job[]> => {
  try {
    // First try to fetch from the Seoul API
    const seoulJobs = await fetchSeoulJobs(1, 20);
    
    // If we got data from Seoul API, return it
    if (seoulJobs && seoulJobs.length > 0) {
      // Store in localStorage for offline access
      saveJobsToStorage(seoulJobs);
      return seoulJobs;
    }
    
    // If Seoul API fails, fall back to localStorage or sample data
    return getJobsFromStorage();
  } catch (error) {
    console.error('Error in fetchJobs:', error);
    // Fall back to localStorage or sample data
    return getJobsFromStorage();
  }
};

// Get jobs by type (part-time, nearby, etc.)
export const getJobsByType = async (type: string): Promise<Job[]> => {
  const allJobs = getJobsFromStorage();
  
  switch(type) {
    case 'part-time':
      return allJobs.filter(job => job.employmentType === '파트타임');
    case 'nearby': 
      return allJobs.filter(job => job.location?.includes('서울'));
    default:
      return allJobs;
  }
};

// Get education data
export const getEducationData = async (): Promise<EducationProgram[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(educationData);
    }, 300);
  });
};

// Get recommendations for a user
export const getRecommendedJobs = async (userId: string): Promise<Job[]> => {
  // In a real app, this would use user profile data to match with jobs
  const allJobs = getJobsFromStorage();
  // For demo purposes, return first 3 jobs as "recommended"
  return allJobs.slice(0, 3);
};

// Get a job by ID
export const getJobById = (id: string | number): Job | null => {
  const allJobs = getJobsFromStorage();
  const job = allJobs.find(job => job.id.toString() === id.toString());
  return job || null;
};

// Get jobs from localStorage or return default ones
export const getJobsFromStorage = (): Job[] => {
  const savedJobs = localStorage.getItem('jobs');
  return savedJobs ? JSON.parse(savedJobs) : sampleJobs;
};

// Save jobs to localStorage
export const saveJobsToStorage = (jobs: Job[]): void => {
  localStorage.setItem('jobs', JSON.stringify(jobs));
};

// Get only favorite jobs
export const getFavoriteJobs = (): Job[] => {
  const allJobs = getJobsFromStorage();
  return allJobs.filter(job => job.isFavorite);
};

// Toggle favorite status for a job
export const toggleFavoriteJob = (jobId: string | number): Job[] => {
  const allJobs = getJobsFromStorage();
  const updatedJobs = allJobs.map(job => 
    job.id.toString() === jobId.toString() ? { ...job, isFavorite: !job.isFavorite } : job
  );
  saveJobsToStorage(updatedJobs);
  return updatedJobs;
};

// Store jobs by type for future reference
export const fetchJobsByCategory = async (category: string): Promise<Job[]> => {
  try {
    // Fetch all jobs
    const allJobs = await fetchJobs();
    
    // Filter by requested category
    if (category === 'all') {
      return allJobs;
    }
    
    return allJobs.filter(job => job.category === category || job.employmentType === category);
  } catch (error) {
    console.error('Error fetching jobs by category:', error);
    return [];
  }
};
