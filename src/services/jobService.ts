import axios from 'axios';
import { Job } from '@/types/job';
import { EducationProgram } from '@/types/job';
import { fetchJobsFromDB } from './supabaseClient';

// Convert DB job entry to our Job format
const convertDBJobToJobFormat = (dbJob: any): Job => {
  const locationMatch = dbJob.work_location?.match(/서울특별시\s*([^\s]+구)/);
  const location = locationMatch ? locationMatch[0] : (dbJob.company_address || '서울');
  const deadline = !dbJob.closing_date ? '상시채용' : dbJob.closing_date;
  let highlight = '';
  if (deadline !== '상시채용') {
    try {
      const deadlineDate = new Date(deadline);
      const today = new Date();
      const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 3 && daysLeft > 0) {
        highlight = `D-${daysLeft}`;
      }
    } catch (e) { }
  }
  return {
    id: dbJob.id || dbJob.regist_no,
    title: dbJob.job_title,
    company: dbJob.company_name,
    location: location,
    deadline: deadline,
    employmentType: dbJob.employment_type_name || '정규직',
    category: dbJob.job_type_name || '일반',
    isFavorite: false,
    description: dbJob.job_description || '',
    highlight: highlight,
  };
};

// Fetch all jobs from Supabase TB_JOBS table
export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const dbJobs = await fetchJobsFromDB();
    if (!dbJobs) return [];
    return dbJobs.map(convertDBJobToJobFormat);
  } catch (error) {
    console.error('Error fetching jobs from Supabase:', error);
    return [];
  }
};

// Get jobs by type (part-time, nearby, etc.)
export const getJobsByType = async (type: string): Promise<Job[]> => {
  const allJobs = await fetchJobs();

  switch (type) {
    case 'part-time':
      return allJobs.filter(job => job.employment_type?.includes('시간제'));
    case 'nearby':
      return allJobs.filter(job => job.location?.includes('서울'));
    default:
      return allJobs;
  }
};

// Get education data from backend API
export const getEducationData = async (): Promise<EducationProgram[]> => {
  const res = await axios.get<EducationProgram[]>(EDUCATION_API);
  return res.data;
};

// Get recommendations for a user
export const getRecommendedJobs = async (userId: number): Promise<Job[]> => {
  const allJobs = await fetchJobs();
  return allJobs.slice(0, 3);
};

// Get a job by ID
export const getJobById = async (id: string | number): Promise<Job | null> => {
  const allJobs = await fetchJobs();
  const job = allJobs.find(job => job.id.toString() === id.toString());
  return job || null;
};

// Toggle favorite status for a job (client-side only for now)
export const toggleFavoriteJob = async (jobId: string | number): Promise<Job[]> => {
  const allJobs = await fetchJobs();
  const updatedJobs = allJobs.map(job =>
    job.id.toString() === jobId.toString() ? { ...job, isFavorite: !job.isFavorite } : job
  );
  return updatedJobs;
};

// Get only favorite jobs (client-side filtering)
export const getFavoriteJobs = async (): Promise<Job[]> => {
  const allJobs = await fetchJobs();
  return allJobs.filter(job => job.isFavorite);
};

// Fetch jobs by category
export const fetchJobsByCategory = async (category: string): Promise<Job[]> => {
  try {
    const allJobs = await fetchJobs();
    if (category === 'all') {
      return allJobs;
    }
    return allJobs.filter(job => job.category === category || job.employmentType === category);
  } catch (error) {
    console.error('Error fetching jobs by category:', error);
    return [];
  }
};
