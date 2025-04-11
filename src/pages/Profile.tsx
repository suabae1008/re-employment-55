
import React, { useState } from 'react';
import { ArrowLeft, User, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Card, CardContent } from "@/components/ui/card";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '김현숙',
    gender: '여자',
    birthDate: '1963.02.03',
    phone: '010-1234-5678',
    email: 'hskim63@naver.com',
    desiredJob: '바리스타',
    desiredLocation: '서울시',
    desiredWorkingHours: '평일 가능',
    desiredSalary: '월 210 만원'
  });

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
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">내 프로필</h2>
            <button className="text-gray-500">
              <Edit2 size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">성함</span>
              <span>{profile.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">성별</span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="gender" 
                    checked={profile.gender === '여자'} 
                    readOnly 
                    className="mr-2 text-blue-500"
                  />
                  <span>여자</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="gender" 
                    checked={profile.gender === '남자'} 
                    readOnly 
                    className="mr-2"
                  />
                  <span>남자</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">생년월일</span>
              <span>{profile.birthDate}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">전화번호</span>
              <span>{profile.phone}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">E-mail</span>
              <span>{profile.email}</span>
            </div>
          </div>
        </div>

        {/* Desired Job Info */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">내 희망 직무</h2>
            <button className="text-gray-500">
              <Edit2 size={18} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">희망 직무</span>
              <span>{profile.desiredJob}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">희망 근무 지역</span>
              <span>{profile.desiredLocation}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">희망 근무 가능 시간</span>
              <span>{profile.desiredWorkingHours}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">희망 급여</span>
              <span>{profile.desiredSalary}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Profile;
