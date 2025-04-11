
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Star, FileEdit, FileText, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center py-1 px-3">
          <Home size={24} className={path === '/' ? "text-app-blue" : "text-gray-400"} />
          <span className="text-xs mt-1">홈</span>
        </Link>
        <Link to="/favorites" className="flex flex-col items-center py-1 px-3">
          <Star size={24} className={path === '/favorites' ? "text-app-blue" : "text-gray-400"} />
          <span className="text-xs mt-1">관심 공고</span>
        </Link>
        <Link to="/cover-letter" className="flex flex-col items-center py-1 px-3">
          <FileEdit size={24} className={path === '/cover-letter' ? "text-app-blue" : "text-gray-400"} />
          <span className="text-xs mt-1">자기소개서</span>
        </Link>
        <Link to="/resume" className="flex flex-col items-center py-1 px-3">
          <FileText size={24} className={path === '/resume' ? "text-app-blue" : "text-gray-400"} />
          <span className="text-xs mt-1">이력서</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center py-1 px-3">
          <User size={24} className={path === '/profile' ? "text-app-blue" : "text-gray-400"} />
          <span className="text-xs mt-1">내 정보</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
