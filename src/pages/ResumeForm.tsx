import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, Check, Plus } from 'lucide-react';
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PostcodeSearch } from '@/components/PostcodeSearch';

interface ResumeData {
  id: string;
  title: string;
  basicInfo: {
    name: string;
    birthDate: Date | null;
    birthYear: number;
    birthMonth: number;
    birthDay: number;
    email: string;
    phone: string;
    address: string;
    veteran: boolean;
    veteranDocument?: File | null;
    disability: boolean;
    disabilityDocument?: File | null;
    employmentSector: boolean;
    employmentSectorDocument?: File | null;
  };
  education: {
    level: string;
    schoolName: string;
    major: string;
    graduationStatus: string;
    startDate: Date | null;
    endDate: Date | null;
  };
  experience: Array<{
    id: string;
    companyName: string;
    jobTitle: string;
    employmentType: string;
    department: string;
    status: string;
    startDate: Date | null;
    endDate: Date | null;
    country: string;
    achievements: string;
  }>;
  certificates: Array<{
    id: string;
    name: string;
    grade: string;
    issueDate: Date | null;
    issuer: string;
  }>;
}

const ResumeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [activeTab, setActiveTab] = useState("basicInfo");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 79 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const [days, setDays] = useState<number[]>([]);

  const [resumeData, setResumeData] = useState<ResumeData>({
    id: id || Date.now().toString(),
    title: '기본 이력서',
    basicInfo: {
      name: '',
      birthDate: null,
      birthYear: currentYear - 30,
      birthMonth: 1,
      birthDay: 1,
      email: '',
      phone: '',
      address: '',
      veteran: false,
      veteranDocument: null,
      disability: false,
      disabilityDocument: null,
      employmentSector: false,
      employmentSectorDocument: null
    },
    education: {
      level: '',
      schoolName: '',
      major: '',
      graduationStatus: '',
      startDate: null,
      endDate: null
    },
    experience: [{
      id: Date.now().toString(),
      companyName: '',
      jobTitle: '',
      employmentType: '',
      department: '',
      status: '재직 중',
      startDate: null,
      endDate: null,
      country: '대한민국',
      achievements: ''
    }],
    certificates: [{
      id: Date.now().toString(),
      name: '',
      grade: '',
      issueDate: null,
      issuer: ''
    }]
  });

  const [address, setAddress] = useState({
    postcode: '',
    roadAddress: '',
    detailAddress: ''
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const { birthYear, birthMonth } = resumeData.basicInfo;
    const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    
    if (resumeData.basicInfo.birthDay > daysInMonth) {
      handleBirthDateChange('birthDay', daysInMonth);
    }
  }, [resumeData.basicInfo.birthYear, resumeData.basicInfo.birthMonth]);

  useEffect(() => {
    const { birthYear, birthMonth, birthDay } = resumeData.basicInfo;
    if (birthYear && birthMonth && birthDay) {
      const date = new Date(birthYear, birthMonth - 1, birthDay);
      setResumeData(prev => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          birthDate: date
        }
      }));
    }
  }, [resumeData.basicInfo.birthYear, resumeData.basicInfo.birthMonth, resumeData.basicInfo.birthDay]);

  useEffect(() => {
    if (isEditMode) {
      const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      const resume = savedResumes.find((r: any) => r.id === id);
      if (resume) {
        if (resume.basicInfo.birthDate) {
          resume.basicInfo.birthDate = new Date(resume.basicInfo.birthDate);
          resume.basicInfo.birthYear = resume.basicInfo.birthDate.getFullYear();
          resume.basicInfo.birthMonth = resume.basicInfo.birthDate.getMonth() + 1;
          resume.basicInfo.birthDay = resume.basicInfo.birthDate.getDate();
        }
        if (resume.education.startDate) {
          resume.education.startDate = new Date(resume.education.startDate);
        }
        if (resume.education.endDate) {
          resume.education.endDate = new Date(resume.education.endDate);
        }

        if (resume.experience && resume.experience.length > 0) {
          resume.experience = resume.experience.map((exp: any) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
          }));
        } else {
          resume.experience = [{
            id: Date.now().toString(),
            companyName: '',
            jobTitle: '',
            employmentType: '',
            department: '',
            status: '재직 중',
            startDate: null,
            endDate: null,
            country: '대한민국',
            achievements: ''
          }];
        }

        if (resume.certificates && resume.certificates.length > 0) {
          resume.certificates = resume.certificates.map((cert: any) => ({
            ...cert,
            issueDate: cert.issueDate ? new Date(cert.issueDate) : null,
          }));
        } else {
          resume.certificates = [{
            id: Date.now().toString(),
            name: '',
            grade: '',
            issueDate: null,
            issuer: ''
          }];
        }

        setResumeData(resume);
      }
    } else {
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      if (userProfile.name) {
        setResumeData(prev => ({
          ...prev,
          basicInfo: {
            ...prev.basicInfo,
            name: userProfile.name || '',
            email: userProfile.email || '',
            phone: userProfile.phone || ''
          }
        }));
      }
    }
  }, [id, isEditMode]);

  const handleBasicInfoChange = (field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
  };

  const handleBirthDateChange = (field: string, value: number) => {
    setResumeData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
  };

  const handleEducationChange = (field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value
      }
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: any) => {
    setResumeData(prev => {
      const updatedExperience = [...prev.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value
      };
      return {
        ...prev,
        experience: updatedExperience
      };
    });
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          companyName: '',
          jobTitle: '',
          employmentType: '',
          department: '',
          status: '재직 중',
          startDate: null,
          endDate: null,
          country: '대한민국',
          achievements: ''
        }
      ]
    }));
  };

  const removeExperience = (index: number) => {
    if (resumeData.experience.length <= 1) {
      toast.error("최소 하나의 경력 정보가 필요합니다");
      return;
    }
    
    setResumeData(prev => {
      const updatedExperience = [...prev.experience];
      updatedExperience.splice(index, 1);
      return {
        ...prev,
        experience: updatedExperience
      };
    });
  };

  const handleCertificateChange = (index: number, field: string, value: any) => {
    setResumeData(prev => {
      const updatedCertificates = [...prev.certificates];
      updatedCertificates[index] = {
        ...updatedCertificates[index],
        [field]: value
      };
      return {
        ...prev,
        certificates: updatedCertificates
      };
    });
  };

  const addCertificate = () => {
    setResumeData(prev => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          id: Date.now().toString(),
          name: '',
          grade: '',
          issueDate: null,
          issuer: ''
        }
      ]
    }));
  };

  const removeCertificate = (index: number) => {
    if (resumeData.certificates.length <= 1) {
      toast.error("최소 하나의 자격증 정보가 필요합니다");
      return;
    }
    
    setResumeData(prev => {
      const updatedCertificates = [...prev.certificates];
      updatedCertificates.splice(index, 1);
      return {
        ...prev,
        certificates: updatedCertificates
      };
    });
  };

  const handleFileChange = (field: string, file: File | null) => {
    setResumeData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: file
      }
    }));
  };

  const handleSaveResume = () => {
    const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    const updatedResumes = isEditMode
      ? savedResumes.map((resume: any) => resume.id === id ? resumeData : resume)
      : [...savedResumes, resumeData];
    
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    localStorage.setItem('hasResumes', 'true');
    
    toast.success(isEditMode ? "이력서가 수정되었습니다" : "이력서가 저장되었습니다");
    navigate('/resume');
  };

  const handleNextToConfirmation = () => {
    setActiveTab("confirmation");
  };

  const isBasicInfoComplete = () => {
    const { name, email, phone, address: fullAddress, birthDate } = resumeData.basicInfo;
    return name && email && phone && fullAddress && birthDate;
  };

  const handlePostcodeComplete = (data: any) => {
    setAddress({
      ...address,
      postcode: data.zonecode,
      roadAddress: data.roadAddress
    });
    handleBasicInfoChange('address', `${data.roadAddress} ${address.detailAddress}`);
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const detailAddress = e.target.value;
    setAddress({
      ...address,
      detailAddress
    });
    handleBasicInfoChange('address', `${address.roadAddress} ${detailAddress}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-6 px-6 sticky top-0 z-10 shadow-sm border-b">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link to="/resume" className="hover:opacity-70">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-bold">{isEditMode ? '이력서 수정' : '이력서 작성'}</h1>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 max-w-[600px] mx-auto bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="basicInfo" className="rounded-md data-[state=active]:bg-white">
                기본정보
              </TabsTrigger>
              <TabsTrigger value="education" className="rounded-md data-[state=active]:bg-white">
                학력
              </TabsTrigger>
              <TabsTrigger value="experience" className="rounded-md data-[state=active]:bg-white">
                경력
              </TabsTrigger>
              <TabsTrigger value="certificates" className="rounded-md data-[state=active]:bg-white">
                자격증
              </TabsTrigger>
              <TabsTrigger value="confirmation" className="rounded-md data-[state=active]:bg-white">
                확인
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basicInfo" className="mt-4">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="max-w-[600px] mx-auto space-y-6">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-2">{resumeData.basicInfo.name || '님'}의 이력서</h2>
                      <p className="text-gray-500">기본 정보를 입력해주세요.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-1">
                          성함
                          <span className="text-[#ea384c] text-sm">필수</span>
                        </Label>
                        <Input
                          id="name"
                          value={resumeData.basicInfo.name}
                          onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1">
                          생년월일
                          <span className="text-[#ea384c] text-sm">필수</span>
                        </Label>
                        <div className="grid grid-cols-3 gap-3">
                          <Select
                            value={resumeData.basicInfo.birthYear.toString()}
                            onValueChange={(value) => handleBirthDateChange('birthYear', parseInt(value))}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="연도" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map(year => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}년
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={resumeData.basicInfo.birthMonth.toString()}
                            onValueChange={(value) => handleBirthDateChange('birthMonth', parseInt(value))}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="월" />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map(month => (
                                <SelectItem key={month} value={month.toString()}>
                                  {month}월
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={resumeData.basicInfo.birthDay.toString()}
                            onValueChange={(value) => handleBirthDateChange('birthDay', parseInt(value))}
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="일" />
                            </SelectTrigger>
                            <SelectContent>
                              {days.map(day => (
                                <SelectItem key={day} value={day.toString()}>
                                  {day}일
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-1">
                          이메일
                          <span className="text-[#ea384c] text-sm">필수</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.basicInfo.email}
                          onChange={(e) => handleBasicInfoChange('email', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-1">
                          휴대폰
                          <span className="text-[#ea384c] text-sm">필수</span>
                        </Label>
                        <Input
                          id="phone"
                          value={resumeData.basicInfo.phone}
                          onChange={(e) => handleBasicInfoChange('phone', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-1">
                          주소
                          <span className="text-[#ea384c] text-sm">필수</span>
                        </Label>
                        <div className="space-y-2">
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              value={address.postcode}
                              placeholder="우편번호"
                              readOnly
                              className="h-12"
                            />
                            <div className="col-span-2">
                              <PostcodeSearch onComplete={handlePostcodeComplete} />
                            </div>
                          </div>
                          <Input
                            value={address.roadAddress}
                            placeholder="도로명 주소"
                            readOnly
                            className="h-12"
                          />
                          <Input
                            value={address.detailAddress}
                            onChange={handleDetailAddressChange}
                            placeholder="상세 주소"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="pt-4 space-y-4">
                        <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                          <Checkbox
                            id="veteran"
                            checked={resumeData.basicInfo.veteran}
                            onCheckedChange={(checked) => handleBasicInfoChange('veteran', !!checked)}
                          />
                          <label htmlFor="veteran" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            보훈 대상
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                          <Checkbox
                            id="disability"
                            checked={resumeData.basicInfo.disability}
                            onCheckedChange={(checked) => handleBasicInfoChange('disability', !!checked)}
                          />
                          <label htmlFor="disability" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            장애 여부
                          </label>
                        </div>

                        <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                          <Checkbox
                            id="employmentSector"
                            checked={resumeData.basicInfo.employmentSector}
                            onCheckedChange={(checked) => handleBasicInfoChange('employmentSector', !!checked)}
                          />
                          <label htmlFor="employmentSector" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            취업계층 여부
                          </label>
                        </div>
                      </div>

                      <div className="pt-8">
                        <Button
                          onClick={() => setActiveTab("education")}
                          className="w-full h-12 text-lg font-bold"
                          disabled={!isBasicInfoComplete()}
                        >
                          다음
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="educationLevel">최종학력</Label>
                      <select
                        id="educationLevel"
                        className="w-full border rounded-md p-2"
                        value={resumeData.education.level}
                        onChange={(e) => handleEducationChange('level', e.target.value)}
                      >
                        <option value="">선택하세요</option>
                        <option value="고등학교">고등학교</option>
                        <option value="전문대학교">전문대학교</option>
                        <option value="대학교">대학교</option>
                        <option value="대학원">대학원</option>
                        <option value="기타">기타</option>
                        <option value="해당없음">해당없음</option>
                      </select>
                    </div>
                    
                    {resumeData.education.level && resumeData.education.level !== '해당없음' && (
                      <>
                        <div>
                          <Label htmlFor="schoolName">학교명</Label>
                          <Input 
                            id="schoolName" 
                            value={resumeData.education.schoolName} 
                            onChange={(e) => handleEducationChange('schoolName', e.target.value)}
                          />
                        </div>
                        
                        {resumeData.education.level !== '고등학교' && (
                          <div>
                            <Label htmlFor="major">전공</Label>
                            <Input 
                              id="major" 
                              value={resumeData.education.major} 
                              onChange={(e) => handleEducationChange('major', e.target.value)}
                            />
                          </div>
                        )}
                        
                        <div>
                          <Label htmlFor="graduationStatus">졸업상태</Label>
                          <select
                            id="graduationStatus"
                            className="w-full border rounded-md p-2"
                            value={resumeData.education.graduationStatus}
                            onChange={(e) => handleEducationChange('graduationStatus', e.target.value)}
                          >
                            <option value="">선택하세요</option>
                            <option value="졸업">졸업</option>
                            <option value="재학중">재학중</option>
                            <option value="휴학중">휴학중</option>
                            <option value="중퇴">중퇴</option>
                            <option value="수료">수료</option>
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>입학일</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  {resumeData.education.startDate ? (
                                    format(resumeData.education.startDate, 'yyyy-MM-dd')
                                  ) : (
                                    <span className="text-muted-foreground">날짜 선택</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={resumeData.education.startDate || undefined}
                                  onSelect={(date) => handleEducationChange('startDate', date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <div>
                            <Label>졸업일</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  {resumeData.education.endDate ? (
                                    format(resumeData.education.endDate, 'yyyy-MM-dd')
                                  ) : (
                                    <span className="text-muted-foreground">날짜 선택</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={resumeData.education.endDate || undefined}
                                  onSelect={(date) => handleEducationChange('endDate', date)}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="mb-8 pb-6 border-b border-gray-200 last:border-b-0">
                      {index > 0 && (
                        <div className="flex justify-end mb-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => removeExperience(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            삭제
                          </Button>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`companyName-${index}`}>직장명</Label>
                          <Input 
                            id={`companyName-${index}`} 
                            value={exp.companyName} 
                            onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                            placeholder="직장명을 입력해주세요"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`jobTitle-${index}`}>직무</Label>
                          <Select
                            value={exp.jobTitle}
                            onValueChange={(value) => handleExperienceChange(index, 'jobTitle', value)}
                          >
                            <SelectTrigger id={`jobTitle-${index}`} className="w-full">
                              <SelectValue placeholder="직무를 선택해 주세요" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="소프트웨어 개발자">소프트웨어 개발자</SelectItem>
                              <SelectItem value="웹 개발자">웹 개발자</SelectItem>
                              <SelectItem value="시스템 엔지니어">시스템 엔지니어</SelectItem>
                              <SelectItem value="데이터 엔지니어">데이터 엔지니어</SelectItem>
                              <SelectItem value="데이터 분석가">데이터 분석가</SelectItem>
                              <SelectItem value="영업 담당자">영업 담당자</SelectItem>
                              <SelectItem value="마케팅 담당자">마케팅 담당자</SelectItem>
                              <SelectItem value="인사 담당자">인사 담당자</SelectItem>
                              <SelectItem value="경영 지원">경영 지원</SelectItem>
                              <SelectItem value="회계 담당자">회계 담당자</SelectItem>
                              <SelectItem value="디자이너">디자이너</SelectItem>
                              <SelectItem value="기타">기타</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor={`employmentType-${index}`}>계약 형태</Label>
                          <Select
                            value={exp.employmentType}
                            onValueChange={(value) => handleExperienceChange(index, 'employmentType', value)}
                          >
                            <SelectTrigger id={`employmentType-${index}`} className="w-full">
                              <SelectValue placeholder="계약 형태를 선택해 주세요" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="정규직">정규직</SelectItem>
                              <SelectItem value="계약직">계약직</SelectItem>
                              <SelectItem value="인턴">인턴</SelectItem>
                              <SelectItem value="파견직">파견직</SelectItem>
                              <SelectItem value="아르바이트">아르바이트</SelectItem>
                              <SelectItem value="프리랜서">프리랜서</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor={`department-${index}`}>부서</Label>
                          <Input 
                            id={`department-${index}`} 
                            value={exp.department} 
                            onChange={(e) => handleExperienceChange(index, 'department', e.target.value)}
                            placeholder="담당했던 부서를 입력해주세요"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>상태</Label>
                          <RadioGroup 
                            value={exp.status}
                            onValueChange={(value) => handleExperienceChange(index, 'status', value)}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="재직 중" id={`status-current-${index}`} />
                              <Label htmlFor={`status-current-${index}`}>재직 중</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="퇴사" id={`status-quit-${index}`} />
                              <Label htmlFor={`status-quit-${index}`}>퇴사</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label>근무 기간</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                  >
                                    {exp.startDate ? (
                                      format(exp.startDate, 'yyyy-MM-dd')
                                    ) : (
                                      <span className="text-muted-foreground">시작일</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={exp.startDate || undefined}
                                    onSelect={(date) => handleExperienceChange(index, 'startDate', date)}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            
                            <div>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                    disabled={exp.status === '재직 중'}
                                  >
                                    {exp.endDate ? (
                                      format(exp.endDate, 'yyyy-MM-dd')
                                    ) : (
                                      <span className="text-muted-foreground">종료일</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={exp.endDate || undefined}
                                    onSelect={(date) => handleExperienceChange(index, 'endDate', date)}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor={`country-${index}`}>국가</Label>
                          <Select
                            value={exp.country}
                            onValueChange={(value) => handleExperienceChange(index, 'country', value)}
                          >
                            <SelectTrigger id={`country-${index}`} className="w-full">
                              <SelectValue placeholder="국���를 선택해 주세요" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="대한민국">대한민국</SelectItem>
                              <SelectItem value="일본">일본</SelectItem>
                              <SelectItem value="중국">중국</SelectItem>
                              <SelectItem value="미국">미국</SelectItem>
                              <SelectItem value="영국">영국</SelectItem>
                              <SelectItem value="캐나다">캐나다</SelectItem>
                              <SelectItem value="호주">호주</SelectItem>
                              <SelectItem value="기타">기타</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor={`achievements-${index}`}>주요 성과</Label>
                          <Textarea
                            id={`achievements-${index}`}
                            value={exp.achievements}
                            onChange={(e) => handleExperienceChange(index, 'achievements', e.target.value)}
                            placeholder="주요 성과를 간략하게 작성해주세요."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <Button 
                      type="button" 
                      onClick={addExperience}
                      variant="outline"
                      className="w-full"
                    >
                      + 경력 추가
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  {resumeData.certificates.map((cert, index) => (
                    <div key={cert.id} className="mb-8 pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-lg">자격증 {index + 1}</h3>
                          {index > 0 && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeCertificate(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              삭제
                            </Button>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor={`certificate-name-${index}`}>자격증 명</Label>
                          <Input 
                            id={`certificate-name-${index}`} 
                            value={cert.name} 
                            onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                            placeholder="자격증 명을 작성해주세요."
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`certificate-grade-${index}`}>자격등급</Label>
                          <Input 
                            id={`certificate-grade-${index}`} 
                            value={cert.grade} 
                            onChange={(e) => handleCertificateChange(index, 'grade', e.target.value)}
                            placeholder="직접 입력"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`certificate-issueDate-${index}`}>발급일</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                {cert.issueDate ? (
                                  format(cert.issueDate, 'yyyy-MM-dd')
                                ) : (
                                  <span className="text-muted-foreground">날짜 선택</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={cert.issueDate || undefined}
                                onSelect={(date) => handleCertificateChange(index, 'issueDate', date)}
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div>
                          <Label htmlFor={`certificate-issuer-${index}`}>발급기관</Label>
                          <Input 
                            id={`certificate-issuer-${index}`} 
                            value={cert.issuer} 
                            onChange={(e) => handleCertificateChange(index, 'issuer', e.target.value)}
                            placeholder="발급기관을 입력해주세요."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="confirmation" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="max-w-[600px] mx-auto">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-2">이력서 작성 완료</h2>
                      <p className="text-gray-500">작성한 내용을 확인하고 이력서를 저장하세요.</p>
                    </div>
                    <Button
                      onClick={handleSaveResume}
                      className="w-full h-12 text-lg font-bold"
                    >
                      이력서 저장하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </header>
    </div>
  );
};

export default ResumeForm;
