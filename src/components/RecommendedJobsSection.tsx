import React from "react";
import { Link } from "react-router-dom";

interface RecommendedJobsSectionProps {
  userName: string;
  onJobCardClick: (jobId: string | number) => void;
}

const RecommendedJobsSection: React.FC<RecommendedJobsSectionProps> = ({
  userName,
  onJobCardClick,
}) => {
  return (
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
          onClick={() => onJobCardClick(1)}
        >
          <div className="flex justify-between items-start">
            <h2 className="text-xl text-gray-900 font-bold max-w-[75%] truncate">
              방문간호사 모집 공고 (파트 타임)
            </h2>
            <span className="text-m font-semibold text-red-600 shrink-0">
              D-2
            </span>
          </div>
          <div className="mt-2">
            <h3 className="text-base text-gray-600 font-bold truncate">
              주식회사웰케어스테이션
            </h3>
          </div>
        </article>

        <article
          className="mt-4 bg-white rounded-xl border-2 border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => onJobCardClick(2)}
        >
          <div className="flex justify-between items-start">
            <h2 className="text-xl text-gray-900 font-bold max-w-[75%] truncate">
              [서울금연지원센터] 입원환자 ...
            </h2>
            <span className="text-m font-semibold text-[#0EA5E9] shrink-0">
              상시채용
            </span>
          </div>
          <div className="mt-2">
            <h3 className="text-base text-gray-600 font-bold truncate">
              이화여자대학교 산학협력단
            </h3>
          </div>
        </article>
      </section>

      <div className="mt-5 flex flex-col gap-2">
        <Link to="/jobs/part-time" className="block">
          <article className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all">
            <div className="px-2">
              <h2 className="text-xl font-bold text-gray-900 py-2 px-2 rounded-xl mb-2 bg-red-100 w-full truncate">
                🎈 파트 타임 모집 공고
              </h2>
            </div>
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/af7462bc608ebdda31fb77f7512f012d8e32f2a5"
                alt="파트타임 일자리"
                className="w-full h-[182px] object-cover"
              />
              <h3 className="absolute bottom-0 left-0 right-0 p-2 text-white font-extrabold text-base leading-8 bg-gradient-to-t from-black/50 to-transparent truncate">
                서울북부교육청 학습비타민 지원가 모집 (주 3회)
              </h3>
            </div>
          </article>
        </Link>

        <Link to="/jobs/nearby" className="block">
          <article className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all">
            <div className="px-2">
              <h2 className="text-xl font-bold text-gray-900 py-2 px-2 rounded-xl mb-2 bg-green-100 w-full truncate">
                🏡 집에서 가까운 모집 공고
              </h2>
            </div>
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e6c5f6e8a9bd491a4280ee026463466e00c7fc9?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"
                alt="근처 일자리"
                className="w-full h-[182px] object-cover"
              />
              <h3 className="absolute bottom-0 left-0 right-0 p-2 text-white font-extrabold text-base leading-8 bg-gradient-to-t from-black/50 to-transparent truncate">
                송파구시설관리공단 주임간호사 채용
              </h3>
            </div>
          </article>
        </Link>

        <Link to="/education" className="block">
          <article className="bg-white rounded-xl overflow-hidden shadow-sm mb-4 cursor-pointer hover:shadow-md transition-all">
            <div className="px-2">
              <h2 className="text-xl font-bold text-gray-900 py-2 px-2 rounded-xl mb-2 bg-yellow-100 w-full truncate">
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
  );
};

export default RecommendedJobsSection;
