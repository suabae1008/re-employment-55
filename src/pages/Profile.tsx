import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Edit2, Save, Check } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/Header";

// Interface for our profile data
interface ProfileData {
  name: string;
  gender: "여자" | "남자";
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
    name: "김현숙",
    gender: "여자",
    birthDate: "1963.02.03",
    phone: "010-1234-5678",
    email: "hskim63@naver.com",
    desiredJob: "바리스타",
    desiredLocation: "서울시",
    desiredWorkingHours: "평일 가능",
    personality: "차분함",
  });

  // 전체 섹션 편집 상태 관리
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [tempProfile, setTempProfile] = useState<ProfileData>({ ...profile });

  // Load profile from localStorage on initial load
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setTempProfile(parsedProfile);
    } else {
      // Store initial profile in localStorage if not already present
      localStorage.setItem("userProfile", JSON.stringify(profile));
      localStorage.setItem("userName", profile.name);
    }
  }, []);

  const handleOpenProfileEdit = () => {
    setTempProfile({ ...profile });
    setIsEditingProfile(true);
  };

  const handleOpenJobEdit = () => {
    setTempProfile({ ...profile });
    setIsEditingJob(true);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setTempProfile({
      ...tempProfile,
      [field]: value,
    });
  };

  const handleGenderChange = (gender: "여자" | "남자") => {
    setTempProfile({
      ...tempProfile,
      gender,
    });
  };

  const handleSaveProfile = () => {
    const updatedProfile = {
      ...profile,
      name: tempProfile.name,
      gender: tempProfile.gender,
      birthDate: tempProfile.birthDate,
      phone: tempProfile.phone,
      email: tempProfile.email,
    };

    setProfile(updatedProfile);
    setIsEditingProfile(false);

    // Save to localStorage
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

    // Update userName in localStorage if name was changed
    if (profile.name !== tempProfile.name) {
      localStorage.setItem("userName", tempProfile.name);

      // Dispatch storage event for cross-component communication
      window.dispatchEvent(new Event("storage"));
    }

    toast.success("저장되었습니다");
  };

  const handleSaveJob = () => {
    const updatedProfile = {
      ...profile,
      desiredJob: tempProfile.desiredJob,
      desiredLocation: tempProfile.desiredLocation,
      desiredWorkingHours: tempProfile.desiredWorkingHours,
      desiredSalary: tempProfile.desiredSalary,
    };

    setProfile(updatedProfile);
    setIsEditingJob(false);

    // Save to localStorage
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

    toast.success("저장되었습니다");
  };

  // 프로필 정보 렌더링 함수
  const renderProfileField = (label: string, value: string) => {
    return (
      <div className="flex justify-between items-center py-3 border-b border-gray-100">
        <span className="text-gray-500">{label}</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header title="자기소개서" />

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">내 프로필</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenProfileEdit}
              className="text-blue-500"
            >
              <Edit2 size={18} />
            </Button>
          </div>

          <div className="space-y-2">
            {renderProfileField("성함", profile.name)}
            {renderProfileField("성별", profile.gender)}
            {renderProfileField("생년월일", profile.birthDate)}
            {renderProfileField("전화번호", profile.phone)}
            {renderProfileField("E-mail", profile.email)}
          </div>
        </div>

        {/* Desired Job Info */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">내 희망 직무</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenJobEdit}
              className="text-blue-500"
            >
              <Edit2 size={18} />
            </Button>
          </div>

          <div className="space-y-2">
            {renderProfileField("희망 직무", profile.desiredJob)}
            {renderProfileField("희망 근무 지역", profile.desiredLocation)}
            {renderProfileField(
              "희망 근무 가능 시간",
              profile.desiredWorkingHours
            )}
            {renderProfileField("성향", profile.personality)}
          </div>
        </div>
      </main>

      {/* 프로필 정보 편집 다이얼로그 */}
      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>내 프로필 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">성함</Label>
              <Input
                id="name"
                value={tempProfile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>성별</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    checked={tempProfile.gender === "여자"}
                    onChange={() => handleGenderChange("여자")}
                    className="form-radio"
                  />
                  <span>여자</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    checked={tempProfile.gender === "남자"}
                    onChange={() => handleGenderChange("남자")}
                    className="form-radio"
                  />
                  <span>남자</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">생년월일</Label>
              <Input
                id="birthDate"
                value={tempProfile.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                value={tempProfile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={tempProfile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveProfile} className="w-full">
              저장하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 희망 직무 편집 다이얼로그 */}
      <Dialog open={isEditingJob} onOpenChange={setIsEditingJob}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>내 희망 직무 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="desiredJob">희망 직무</Label>
              <Input
                id="desiredJob"
                value={tempProfile.desiredJob}
                onChange={(e) =>
                  handleInputChange("desiredJob", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredLocation">희망 근무 지역</Label>
              <Input
                id="desiredLocation"
                value={tempProfile.desiredLocation}
                onChange={(e) =>
                  handleInputChange("desiredLocation", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredWorkingHours">희망 근무 가능 시간</Label>
              <Input
                id="desiredWorkingHours"
                value={tempProfile.desiredWorkingHours}
                onChange={(e) =>
                  handleInputChange("desiredWorkingHours", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredSalary">희망 급여</Label>
              <Input
                id="desiredSalary"
                value={tempProfile.desiredSalary}
                onChange={(e) =>
                  handleInputChange("desiredSalary", e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveJob} className="w-full">
              저장하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Profile;
