// src/types/job.ts

export interface Job {
  id: number;
  company: string;
  title: string;
  employment_type?: string;
  location?: string;
  category?: string;
  work_address?: string;
  [key: string]: any;
}

export interface EducationProgram {
  id: number;
  title: string;
  provider: string;
  duration: string;
  startDate: string;
  category: string;
}
