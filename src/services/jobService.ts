
import { Job } from "../types/job";

// Mock data for jobs
const mockJobs: Job[] = [
  {
    id: 1,
    company: "제우스 아이엔씨",
    title: "현장작업 및 생산 업무",
    employment_type: "정규직",
    location: "경기 화성시",
    category: "제조·생산",
    work_address: "경기도 화성시 동탄첨단산업1로 27",
    deadline: "2025-05-10",
    highlight: "D-3",
  },
  {
    id: 2,
    company: "은빛재가복지센터",
    title: "재가요양보호사 모집",
    employment_type: "계약직",
    location: "서울 강남구",
    category: "의료·간호",
    work_address: "서울특별시 강남구 논현로 537",
    deadline: "2025-05-15",
    highlight: "D-7",
  },
  {
    id: 3,
    company: "디지털서비스",
    title: "웹 개발자 모집",
    employment_type: "정규직",
    location: "서울 서초구",
    category: "IT·개발",
    work_address: "서울특별시 서초구 서초대로 301",
    deadline: "2025-05-20",
    highlight: "D-12",
  },
  {
    id: 4,
    company: "푸른노인복지센터",
    title: "사회복지사 모집",
    employment_type: "계약직",
    location: "서울 중구",
    category: "사회복지",
    work_address: "서울특별시 중구 을지로 157",
    deadline: "2025-05-25",
    highlight: "D-17",
  },
  {
    id: 5,
    company: "한국혁신기술",
    title: "빅데이터 분석가",
    employment_type: "정규직",
    location: "경기 성남시",
    category: "IT·개발",
    work_address: "경기도 성남시 분당구 판교로 228",
    deadline: "상시채용",
    highlight: "상시채용",
  }
];

// Local storage key for favorite jobs
const FAVORITE_JOBS_KEY = 'favoriteJobs';

// Get favorite job IDs from local storage
export const getFavoriteJobIds = (): string[] => {
  const storedFavorites = localStorage.getItem(FAVORITE_JOBS_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

// Save favorite job IDs to local storage
const saveFavoriteJobIds = (jobIds: string[]): void => {
  localStorage.setItem(FAVORITE_JOBS_KEY, JSON.stringify(jobIds));
};

// Check if a job is marked as favorite
export const isJobFavorite = (jobId: string | number): boolean => {
  const favoriteJobIds = getFavoriteJobIds();
  return favoriteJobIds.includes(jobId.toString());
};

// Fetch all jobs
export const fetchJobs = async (): Promise<Job[]> => {
  // Simulate API request with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Add isFavorite flag to each job
      const jobsWithFavorites = mockJobs.map(job => ({
        ...job,
        isFavorite: isJobFavorite(job.id)
      }));
      resolve(jobsWithFavorites);
    }, 500);
  });
};

// Toggle favorite status for a job
export const toggleFavoriteJob = async (jobId: string | number): Promise<Job[]> => {
  const favoriteJobIds = getFavoriteJobIds();
  const jobIdStr = jobId.toString();
  
  if (favoriteJobIds.includes(jobIdStr)) {
    // Remove from favorites
    const updatedFavorites = favoriteJobIds.filter(id => id !== jobIdStr);
    saveFavoriteJobIds(updatedFavorites);
  } else {
    // Add to favorites
    favoriteJobIds.push(jobIdStr);
    saveFavoriteJobIds(favoriteJobIds);
  }
  
  // Return updated jobs list
  return fetchJobs();
};

// Get job by ID
export const getJobById = async (jobId: string): Promise<Job | null> => {
  const jobs = await fetchJobs();
  const job = jobs.find(job => job.id.toString() === jobId);
  return job || null;
};

// Get jobs by type (for NearbyJobs and PartTimeJobs pages)
export const getJobsByType = async (type: string): Promise<Job[]> => {
  const jobs = await fetchJobs();
  
  if (type === 'nearby') {
    // Filter jobs in Seoul for nearby
    return jobs.filter(job => job.location && job.location.includes('서울'));
  } else if (type === 'part-time') {
    // Filter part-time jobs
    return jobs.filter(job => job.employment_type === '계약직');
  }
  
  return jobs;
};

// Get recommended jobs
export const getRecommendedJobs = async (userId: number): Promise<Job[]> => {
  const jobs = await fetchJobs();
  // For demo purposes, return first 3 jobs as recommended
  return jobs.slice(0, 3);
};

// Get education data
export const getEducationData = async (): Promise<any[]> => {
  // Mock education programs data
  const educationPrograms = [
    {
      id: 1,
      edc_nm: "디지털 역량 강화 교육",
      provider: "서울시 일자리훈련센터",
      edc_begin_de_dt: "2025-06-01",
      edc_end_de_dt: "2025-07-30",
      sttus_nm: "접수중"
    },
    {
      id: 2,
      edc_nm: "노인 돌봄 서비스 실무교육",
      provider: "한국요양복지협회",
      edc_begin_de_dt: "2025-05-15",
      edc_end_de_dt: "2025-06-15",
      sttus_nm: "접수중"
    },
    {
      id: 3,
      edc_nm: "사무행정 실무 과정",
      provider: "중장년 일자리 지원센터",
      edc_begin_de_dt: "2025-06-10",
      edc_end_de_dt: "2025-07-10",
      sttus_nm: "접수예정"
    }
  ];
  
  return educationPrograms;
};

export const getFavoriteJobs = async (): Promise<Job[]> => {
  const allJobs = await fetchJobs();
  const favoriteJobIds = getFavoriteJobIds();
  const favoriteJobs = allJobs.filter(job => favoriteJobIds.includes(job.id.toString()));

  // Special handling for specific jobs to demonstrate different matching analysis states
  return favoriteJobs.map(job => {
    if (job.company === '제우스 아이엔씨') {
      // This job will show as "매칭점수 준비중"
      return {
        ...job,
        matchingStatus: 'pending'
      };
    }
    if (job.company === '은빛재가복지센터') {
      // This job will show as "매칭점수 80점"
      return {
        ...job,
        matchingStatus: 'completed',
        matchScore: 80
      };
    }
    return job;
  });
};
