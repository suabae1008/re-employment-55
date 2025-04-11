
import React, { useState } from 'react';
import { Star, StarOff } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export interface Job {
  id: string | number;
  title: string;
  company: string;
  location?: string;
  deadline?: string;
  category?: string;
  description?: string;
  isFavorite?: boolean;
}

interface JobListProps {
  jobs: Job[];
  onToggleFavorite: (jobId: string | number) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onToggleFavorite }) => {
  const handleFavoriteToggle = (jobId: string | number, isFavorite: boolean) => {
    onToggleFavorite(jobId);
    toast(isFavorite ? '관심 공고에서 제거되었습니다' : '관심 공고에 추가되었습니다');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>구직 공고 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">관심</TableHead>
                <TableHead>공고명</TableHead>
                <TableHead>기관명</TableHead>
                <TableHead>지역</TableHead>
                <TableHead>마감일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <button 
                      onClick={() => handleFavoriteToggle(job.id, !!job.isFavorite)}
                      className="hover:text-yellow-500 focus:outline-none"
                    >
                      {job.isFavorite ? (
                        <Star className="text-yellow-500" size={20} />
                      ) : (
                        <StarOff size={20} />
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location || '-'}</TableCell>
                  <TableCell>{job.deadline || '상시채용'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobList;
