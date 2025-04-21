import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  Star,
  Filter,
  Heart,
  School,
  Sparkles,
  List,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import BottomNavigation from "../components/BottomNavigation";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import SearchBar from "../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs, getEducationData } from "../services/jobService";
import { Job } from "../components/JobList";
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

  const { data: educationPrograms } = useQuery({
    queryKey: ["educationPrograms"],
    queryFn: () => getEducationData(),
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
          <>
            <section className="mt-4">
              <h1 className="text-2xl text-gray-800 font-bold leading-10">
                {userName}님을 위한
                <br />
                오늘의 추천 구직 공고
              </h1>
              <p className="text-base text-gray-600 leading-8 mt-2">
                내 이력과 적합한 공고를 확인해보세요.
              </p>

              <article
                className="mt-4 bg-white rounded-xl border-2 border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleJobCardClick(1)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base text-gray-600 font-bold">
                    주식회사웰케어스테이션
                  </h3>
                  <div className="bg-gray-100 rounded-full px-2 py-1 text-sm font-bold">
                    <span className="text-gray-800 mr-1">Ai매치</span>
                    <span className="text-app-blue">84%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h2 className="text-xl text-gray-900 font-bold">
                    방문간호사 모집 공고 (파트 타임)
                  </h2>
                  <span className="text-lg font-bold text-red-600">D-2</span>
                </div>
              </article>

              <article
                className="mt-4 bg-white rounded-xl border-2 border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleJobCardClick(2)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base text-gray-600 font-bold">
                    이화여자대학교 산학협력단
                  </h3>
                  <div className="bg-gray-100 rounded-full px-2 py-1 text-sm font-bold">
                    <span className="text-gray-800 mr-1">Ai매치</span>
                    <span className="text-app-blue">82%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h2 className="text-xl text-gray-900 font-bold">
                    [서울금연지원센터] 입원환자 ...
                  </h2>
                  <span className="text-lg font-bold text-app-blue">
                    상시채용
                  </span>
                </div>
              </article>
            </section>

            <div className="mt-5 flex flex-col gap-2">
              <Link to="/jobs/part-time" className="block">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all">
                  <div className="px-2">
                    <h2 className="text-xl font-bold text-gray-900 py-2 px-2 rounded-xl mb-2 bg-red-100 w-full">
                      🎈 파트 타임 모집 공고
                    </h2>
                  </div>
                  <div className="relative">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/af7462bc608ebdda31fb77f7512f012d8e32f2a5"
                      alt="파트타임 일자리"
                      className="w-full h-[182px] object-cover"
                    />
                    <h3 className="absolute bottom-0 left-0 right-0 p-2 text-white font-extrabold text-base leading-8 bg-gradient-to-t from-black/50 to-transparent">
                      서울북부교육청 학습비타민 지원가 모집 (주 3회)
                    </h3>
                  </div>
                </article>
              </Link>

              <Link to="/jobs/nearby" className="block">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all">
                  <div className="px-2">
                    <h2 className="text-xl font-bold text-gray-900 py-2 px-2 rounded-xl mb-2 bg-green-100 w-full">
                      🏡 집에서 가까운 모집 공고
                    </h2>
                  </div>
                  <div className="relative">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e6c5f6e8a9bd491a4280ee026463466e00c7fc9?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
                      alt="근처 일자리"
                      className="w-full h-[182px] object-cover"
                    />
                    <h3 className="absolute bottom-0 left-0 right-0 p-2 text-white font-extrabold text-base leading-8 bg-gradient-to-t from-black/50 to-transparent">
                      송파구시설관리공단 주임간호사 채용
                    </h3>
                  </div>
                </article>
              </Link>

              <Link to="/education" className="block">
                <article className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all">
                  <div className="px-2">
                    <h2 className="text-xl font-bold text-gray-900 py-2 px-2 rounded-xl mb-2 bg-yellow-100 w-full">
                      📝 취업 준비 교육 정보
                    </h2>
                  </div>
                  <div className="relative">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a42b21f36731534d6f73a7f8ee22168d39794df3?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
                      alt="교육 정보"
                      className="w-full h-[182px] object-cover"
                    />
                  </div>
                </article>
              </Link>
            </div>
          </>
        )}

        {activeTab === "all" && (
          <div className="mb-6">
            {/* <h2 className="text-2xl font-bold my-4">전체 구직 공고</h2> */}
            <JobFilters onFilterChange={handleFilterChange} />

            {isLoading ? (
              <p>로딩 중...</p>
            ) : (
              <div className="space-y-4">
                {filteredJobs && filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => {
                    const dDayText = job.highlight || (job.deadline ? "" : "상시채용");
                    const dDayColor = getDDayColor(dDayText);
                    const deadlineText = getDeadlineText(job.deadline);

                    return (
                      <article
                        key={job.id}
                        className="flex items-start border-2 border-gray-200 rounded-2xl px-6 py-4 bg-white shadow-none hover:shadow transition relative cursor-pointer"
                        onClick={() => handleJobCardClick(job.id)}
                      >
                        {/* 관심공고(별) 자리 - 추후 관심 기능 붙일 때 */}
                        {/* <Star className="absolute left-4 top-4 text-yellow-400" /> */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col min-w-0">
                              <h2 className="text-2xl font-bold text-[#222] mb-2 leading-tight break-words line-clamp-2">{job.title}</h2>
                              <span className="text-xl text-gray-400 font-semibold leading-none break-words">{job.company}</span>
                            </div>
                            <div className={`ml-4 flex flex-col items-end mt-0`}>
                              <span className={`text-2xl font-bold ${dDayColor} ml-2`}>
                                {dDayText}
                              </span>
                              {deadlineText && (
                                <span className="text-lg text-gray-300 font-bold mt-3">
                                  {deadlineText}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  null
                )}
              </div>
            )}

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
