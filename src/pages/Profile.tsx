
import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Edit2, Save, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

// Interface for our profile data
interface ProfileData {
  name: string;
  gender: '여자' | '남자';
  birthDate: string;
  phone: string;
  email: string;
  desiredJob: string;
  desiredLocation: string;
  desiredWorkingHours: string;
  desiredSalary: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData>({
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

  // Editing states for each field
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<ProfileData>({...profile});

  // Load profile from localStorage on initial load
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setTempValues(parsedProfile);
    } else {
      // Store initial profile in localStorage if not already present
      localStorage.setItem('userProfile', JSON.stringify(profile));
      localStorage.setItem('userName', profile.name);
    }
  }, []);

  const handleEditField = (field: string) => {
    setEditingField(field);
    setTempValues({...profile});
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setTempValues({
      ...tempValues,
      [field]: value
    });
  };

  const handleGenderChange = (gender: '여자' | '남자') => {
    setTempValues({
      ...tempValues,
      gender
    });
  };

  const handleSaveField = (field: keyof ProfileData) => {
    const updatedProfile = { 
      ...profile, 
      [field]: tempValues[field] 
    };
    
    setProfile(updatedProfile);
    setEditingField(null);
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    
    // Update userName in localStorage if name was changed
    if (field === 'name') {
      localStorage.setItem('userName', tempValues.name);
      
      // Dispatch storage event for cross-component communication
      window.dispatchEvent(new Event('storage'));
    }
    
    toast.success("저장되었습니다");
  };

  const renderEditableField = (label: string, field: keyof ProfileData, type: string = 'text') => {
    const isEditing = editingField === field;
    
    return (
      <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-500">{label}</span>
        {isEditing ? (
          <div className="flex items-center">
            <input
              type={type}
              value={tempValues[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="border rounded px-2 py-1 text-sm w-36"
            />
            <button 
              onClick={() => handleSaveField(field)}
              className="ml-2 text-green-500"
              aria-label="저장"
            >
              <Check size={18} />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <span>{profile[field]}</span>
            <button 
              onClick={() => handleEditField(field)}
              className="ml-2 text-gray-500"
              aria-label="수정"
            >
              <Edit2 size={14} />
            </button>
          </div>
        )}
      </div>
    );
  };

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
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">내 프로필</h2>
          </div>
          
          <div className="space-y-2">
            {renderEditableField('성함', 'name')}
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">성별</span>
              {editingField === 'gender' ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gender" 
                        checked={tempValues.gender === '여자'} 
                        onChange={() => handleGenderChange('여자')}
                        className="mr-2 text-blue-500"
                      />
                      <span>여자</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gender" 
                        checked={tempValues.gender === '남자'} 
                        onChange={() => handleGenderChange('남자')}
                        className="mr-2"
                      />
                      <span>남자</span>
                    </label>
                  </div>
                  <button 
                    onClick={() => handleSaveField('gender')}
                    className="ml-2 text-green-500"
                    aria-label="저장"
                  >
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{profile.gender}</span>
                  <button 
                    onClick={() => handleEditField('gender')}
                    className="ml-2 text-gray-500"
                    aria-label="수정"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}
            </div>
            
            {renderEditableField('생년월일', 'birthDate')}
            {renderEditableField('전화번호', 'phone')}
            {renderEditableField('E-mail', 'email', 'email')}
          </div>
        </div>

        {/* Desired Job Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">내 희망 직무</h2>
          </div>
          
          <div className="space-y-2">
            {renderEditableField('희망 직무', 'desiredJob')}
            {renderEditableField('희망 근무 지역', 'desiredLocation')}
            {renderEditableField('희망 근무 가능 시간', 'desiredWorkingHours')}
            {renderEditableField('희망 급여', 'desiredSalary')}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Profile;
