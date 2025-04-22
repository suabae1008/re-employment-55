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
  edc_nm: string;
  provider: string;
  edc_begin_de_dt: string;
  edc_end_de_dt: string;
  sttus_nm: string;
}
