
import React from 'react';
import { ArrowLeft, User, FileText, Award, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4 flex items-center">
        <Link to="/" className="mr-4">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">내 정보</h1>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-app-light-blue rounded-full flex items-center justify-center mr-4">
              <User size={32} className="text-app-blue" />
            </div>
            <div>
              <h2 className="text-xl font-bold">홍길동님</h2>
              <p className="text-gray-500">60대 | 서울특별시</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-app-blue text-white py-2 rounded-md">
              프로필 수정하기
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            <div className="flex items-center p-4">
              <FileText className="text-app-blue mr-3" size={20} />
              <span>내 이력서 관리</span>
            </div>
            <div className="flex items-center p-4">
              <Award className="text-app-blue mr-3" size={20} />
              <span>나의 자격증</span>
            </div>
            <div className="flex items-center p-4">
              <Settings className="text-app-blue mr-3" size={20} />
              <span>설정</span>
            </div>
            <div className="flex items-center p-4">
              <HelpCircle className="text-app-blue mr-3" size={20} />
              <span>고객 센터</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-6">
          <button className="flex items-center justify-center w-full p-4 text-gray-500">
            <LogOut size={18} className="mr-2" />
            <span>로그아웃</span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Profile;
