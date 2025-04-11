
import { Job } from "../components/JobList";

// Sample data that mimics the structure of Seoul's job data
export const sampleJobs: Job[] = [
  {
    id: 1,
    title: '방문간호사 모집 공고 (파트 타임)',
    company: '주식회사웰케어스테이션',
    location: '서울 서초구',
    deadline: '2025-05-10',
    category: '의료/간호',
    isFavorite: false
  },
  {
    id: 2,
    title: '[서울금연지원센터] 입원환자 금연상담사',
    company: '이화여자대학교 산학협력단',
    location: '서울 종로구',
    deadline: '2025-05-15',
    category: '상담/복지',
    isFavorite: false
  },
  {
    id: 3,
    title: '서울특별시어린이병원 기간제 노동자 채용 공고',
    company: '서울특별시어린이병원',
    location: '서울 서초구',
    deadline: '2025-05-05',
    category: '의료/간호',
    isFavorite: false
  },
  {
    id: 4,
    title: '송파구시설관리공단 주말간호사 채용',
    company: '송파구시설관리공단',
    location: '서울 송파구',
    deadline: '2025-05-20',
    category: '의료/간호',
    isFavorite: false
  },
  {
    id: 5,
    title: '강동구 사회복지사 모집',
    company: '강동구청',
    location: '서울 강동구',
    deadline: '2025-05-12',
    category: '상담/복지',
    isFavorite: false
  },
  {
    id: 6,
    title: '노인요양센터 요양보호사 채용',
    company: '서울시노인복지센터',
    location: '서울 노원구',
    deadline: '상시채용',
    category: '요양/돌봄',
    isFavorite: false
  },
  {
    id: 7,
    title: '시니어 행정사무 지원 모집',
    company: '서울시청',
    location: '서울 중구',
    deadline: '2025-05-18',
    category: '사무/행정',
    isFavorite: false
  },
  {
    id: 8,
    title: '도서관 사서 보조 파트타임',
    company: '서울시립도서관',
    location: '서울 마포구',
    deadline: '2025-05-25',
    category: '교육/문화',
    isFavorite: false
  },
];

// In a real application, this would fetch data from the Seoul Open API
// For now, we'll use the sample data to simulate the API response
export const fetchJobs = async (): Promise<Job[]> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleJobs);
    }, 500);
  });
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
    job.id === jobId ? { ...job, isFavorite: !job.isFavorite } : job
  );
  saveJobsToStorage(updatedJobs);
  return updatedJobs;
};
