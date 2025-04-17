
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 py-3 px-4 flex justify-between items-center max-w-lg mx-auto z-50">
      <Link to="/" className={`flex flex-col items-center flex-1 min-w-0 ${path === '/' ? 'text-app-blue' : 'text-gray-500'}`}>
        <img 
          src={path === '/' 
            ? "https://cdn.builder.io/api/v1/image/assets/TEMP/aa2ad292e5d41c3f4f6c7b31c866d69c8e20ed2e?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822" 
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/27e44202ad7c77fa83b58a77c71d24a08e41bf56?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"}
          className="w-10 h-10 object-contain"
          alt="홈"
        />
        <span className="text-sm mt-1">홈</span>
      </Link>
      
      <Link to="/favorites" className={`flex flex-col items-center flex-1 min-w-0 ${path === '/favorites' ? 'text-app-blue' : 'text-gray-500'}`}>
        <img 
          src={path === '/favorites' 
            ? "https://cdn.builder.io/api/v1/image/assets/TEMP/b2ef3cf70d6afccf40a7b2be6f4ce2d731f46ed2?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822" 
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/eaf82b097d84d0a2ed21cd6cb2812e8d6a8293a0?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"}
          className="w-10 h-10 object-contain"
          alt="관심 공고"
        />
        <span className="text-sm mt-1">관심 공고</span>
      </Link>
      
      <Link to="/cover-letter" className={`flex flex-col items-center flex-1 min-w-0 ${path === '/cover-letter' ? 'text-app-blue' : 'text-gray-500'}`}>
        <img 
          src={path === '/cover-letter' 
            ? "https://cdn.builder.io/api/v1/image/assets/TEMP/3e7d1fa55e36aca8fcd09399f08ad31dfc4f55f6?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822" 
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/c0e7bf151ac1d02af7fef7473e92d83e81d57ef9?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"}
          className="w-10 h-10 object-contain"
          alt="자기소개서"
        />
        <span className="text-sm mt-1">자기소개서</span>
      </Link>
      
      <Link to="/resume" className={`flex flex-col items-center flex-1 min-w-0 ${path === '/resume' ? 'text-app-blue' : 'text-gray-500'}`}>
        <img 
          src={path === '/resume' 
            ? "https://cdn.builder.io/api/v1/image/assets/TEMP/c43abb9a9b8db3a17d38c612d34d2f1b5b214aa4?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822" 
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/0bd88ca77fe05453b8a25af6ae7e7593a17f4ca9?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"}
          className="w-10 h-10 object-contain"
          alt="이력서"
        />
        <span className="text-sm mt-1">이력서</span>
      </Link>
      
      <Link to="/profile" className={`flex flex-col items-center flex-1 min-w-0 ${path === '/profile' ? 'text-app-blue' : 'text-gray-500'}`}>
        <img 
          src={path === '/profile' 
            ? "https://cdn.builder.io/api/v1/image/assets/TEMP/8e75f47fc6387a3fc0ffa81177d4c31ecab05cef?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822" 
            : "https://cdn.builder.io/api/v1/image/assets/TEMP/a20dc66d35e3eda7ad42bd52a1ecbe89c18c4d8e?placeholderIfAbsent=true&apiKey=005c88254743412a8fbdeef29d674822"}
          className="w-10 h-10 object-contain"
          alt="내 정보"
        />
        <span className="text-sm mt-1">내 정보</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
