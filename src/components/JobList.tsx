import React, { useState } from 'react';
import { Star, StarOff } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export interface Job {
  id: string | number;
  title: string;
  company: string;
  location?: string;
  deadline?: string;
  category?: string;
  description?: string;
  employmentType?: string;
  isFavorite?: boolean;
  highlight?: string; // Highlight property
  detailUrl?: string; // Added detailUrl property for Seoul API
  companyLogo?: string; // Added companyLogo property
}

interface JobListProps {
  jobs: Job[];
  onToggleFavorite: (jobId: string | number) => void;
  fromFavorites?: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, onToggleFavorite, fromFavorites = false }) => {
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
                {fromFavorites && <TableHead>매칭</TableHead>}
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
                  <TableCell className="font-medium">
                    <Link 
                      to={`/job/${job.id}`} 
                      state={{ fromFavorites: fromFavorites }}
                      className="hover:text-app-blue hover:underline"
                    >
                      {job.title}
                    </Link>
                  </TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location || '-'}</TableCell>
                  <TableCell>{job.deadline || '상시채용'}</TableCell>
                  {fromFavorites && (
                    <TableCell>
                      {job.highlight && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          {job.highlight}
                        </span>
                      )}
                    </TableCell>
                  )}
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
