// src/types/job.ts

export interface Job {
  id: string;
  company: string;
  title: string;
  employment_type?: string;
  location?: string;
  category?: string;
  work_address?: string;
  [key: string]: any;
}