
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Job } from '../../components/JobList';

interface JobDescriptionProps {
  job: Job;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
      <h3 className="text-xl font-bold mb-4">공고 내용</h3>
      <div className="prose">
        {job.description ? (
          <p className="whitespace-pre-line">{job.description}</p>
        ) : (
          <p>해당 공고에 대한 상세 설명이 없습니다.</p>
        )}
      </div>

      <Separator className="my-6" />

      <h3 className="text-xl font-bold mb-4">지원 자격</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>관련 분야 경력 1년 이상</li>
        <li>성별, 연령 제한 없음</li>
        <li>문서 작성 능력 우수자 우대</li>
      </ul>

      <Separator className="my-6" />

      <h3 className="text-xl font-bold mb-4">근무 조건</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>근무 시간: 09:00 ~ 18:00 (주 5일)</li>
        <li>급여: 면접 후 결정</li>
        <li>복리후생: 4대보험, 퇴직금, 중식제공</li>
      </ul>
    </div>
  );
};

export default JobDescription;
