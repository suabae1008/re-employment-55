
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../services/jobService";
import RecommendedJobsSection from "../components/RecommendedJobsSection";
import JobCardList from "../components/JobCardList";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"recommended" | "all">("recommended");
  const [userName, setUserName] = useState<string>("김현숙");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }

    const handleStorageChange = () => {
      const updatedName = localStorage.getItem("userName");
      if (updatedName) {
        setUserName(updatedName);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const handleJobCardClick = (jobId: string | number) => {
    navigate(`/job/${jobId}`);
  };

  const [filters, setFilters] = useState<{ jobType: string; region: string }>({
    jobType: "all",
    region: "all",
  });

  const handleFilterChange = (filterType: "jobType" | "region", value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredJobs = jobs
    ? jobs.filter(
        (job) =>
          (filters.jobType === "all" || job.category === filters.jobType) &&
          (filters.region === "all" || (job.location && job.location.includes(filters.region)))
      )
    : [];

  return (
    <div className="bg-white min-h-screen">
      <header className="pt-5 px-5">
        <div className="flex justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bb4f7ec5b45888b3e493a8729d13e4ef11c4dee?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
            className="w-16 h-auto object-contain"
            alt="Logo"
          />
        </div>

        <div className="flex mt-6 min-h-14 rounded-full border-2 border-app-blue bg-white px-6 py-3 items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/07a7ba0cf04bf9e919490e2a92981e563a46f773?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
            className="w-5 h-5 object-contain mr-10"
            alt="Search icon"
          />
          <div className="text-gray-500 text-xl font-semibold">
            공고를 검색해주세요.
          </div>
        </div>

        <div className="flex mt-6 w-full gap-3 mb-1">
          <button
            onClick={() => setActiveTab("recommended")}
            className={`flex flex-1 h-10 px-3 py-1 items-center gap-2 justify-start rounded-full text-xl font-bold ${
              activeTab === "recommended"
                ? "bg-app-blue text-white"
                : "bg-white text-gray-600 border-2 border-gray-300"
            }`}
          >
            <img
              src={
                activeTab === "recommended"
                  ? "/buttons/recommend.svg"
                  : "/buttons/recommend-active.svg"
              }
            />
            <span className="self-stretch my-auto">추천 구직 공고</span>
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`flex flex-1 h-10 px-3 py-1 items-center gap-2 justify-start rounded-full text-xl font-bold ${
              activeTab === "all"
                ? "bg-app-blue text-white"
                : "bg-white text-gray-600 border-2 border-gray-300"
            }`}
          >
            <img
              src={
                activeTab === "all"
                  ? "/buttons/building-active.svg"
                  : "/buttons/building-active.svg"
              }
              className="w-5 h-5 object-contain"
              alt="All jobs icon"
            />
            <span className="self-stretch my-auto">전체 구직 공고</span>
          </button>
        </div>
      </header>

      <main className="px-5">
        {activeTab === "recommended" && (
          <RecommendedJobsSection 
            userName={userName} 
            onJobCardClick={handleJobCardClick} 
          />
        )}

        {activeTab === "all" && (
          <div className="mb-6">
            <JobFilters onFilterChange={handleFilterChange} />
            <JobCardList 
              jobs={filteredJobs} 
              onJobCardClick={handleJobCardClick} 
              isLoading={isLoading} 
            />

            <h2 className="text-[rgba(44,44,44,1)] text-2xl font-bold leading-loose mt-10">
              이 공고, 놓치지 마세요!
            </h2>
            <div className="mt-4">
              <JobCard
                id="notice-1"
                highlight="D-2"
                title="방문간호사 모집 공고 (파트 타임)"
                company="주식회사웰케어스테이션"
                location="서울특별시 서초구"
                category="간호"
              />
            </div>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
