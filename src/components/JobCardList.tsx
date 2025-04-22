
import React from "react";
import { Job } from "../types/job";

interface JobCardListProps {
  jobs: Job[];
  onJobCardClick: (jobId: string | number) => void;
  isLoading: boolean;
}

const JobCardList: React.FC<JobCardListProps> = ({
  jobs,
  onJobCardClick,
  isLoading,
}) => {
  function getDDayColor(highlight: string | undefined) {
    if (!highlight || highlight === "상시채용") return "text-[#0EA5E9]";
    if (/^D-(\d+)/.test(highlight)) {
      const n = Number(highlight.replace("D-", ""));
      if (!isNaN(n) && n <= 7) return "text-[#ea384c]";
      return "text-[#0EA5E9]";
    }
    return "text-[#0EA5E9]";
  }

  function getDeadlineText(deadline: string | undefined) {
    if (!deadline || deadline === "상시채용") return "";
    try {
      const date = new Date(deadline);
      if (!isNaN(date.getTime())) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekDayNames = ["일", "월", "화", "수", "목", "금", "토"];
        const weekDay = weekDayNames[date.getDay()];
        return `~${month}/${day}(${weekDay})`;
      }
    } catch {
      return "";
    }
    return "";
  }

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="space-y-4">
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => {
          const dDayText = job.highlight ?? (job.deadline ? "" : "상시채용");
          const dDayColor = getDDayColor(dDayText);
          const deadlineText = getDeadlineText(job.deadline);

          return (
            <article
              key={job.id}
              className="relative bg-white border-2 border-gray-200 rounded-2xl p-5 cursor-pointer hover:shadow transition flex flex-col"
              onClick={() => onJobCardClick(job.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-[#222] leading-snug break-words mb-1 line-clamp-2">
                    {job.title}
                  </h2>
                  <div className="text-base text-gray-400 font-semibold break-words leading-tight">
                    {job.company}
                  </div>
                </div>
                <div className="ml-2 flex flex-col items-end gap-2 min-w-[70px]">
                  <span className={`text-base font-bold ${dDayColor}`}>{dDayText}</span>
                  {deadlineText && (
                    <span className="text-xs text-gray-300 font-bold">{deadlineText}</span>
                  )}
                </div>
              </div>
            </article>
          );
        })
      ) : null}
    </div>
  );
};

export default JobCardList;
