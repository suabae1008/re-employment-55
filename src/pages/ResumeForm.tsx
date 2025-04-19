import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, Check, Plus, X } from 'lucide-react';
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
    veteranType?: string;
    disability: boolean;
    disabilityDocument?: File | null;
    disabilityType?: string;
    employmentSector: boolean;
    employmentSectorDocument?: File | null;
    employmentSectorType?: string;
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
      veteranType: '',
      disability: false,
      disabilityDocument: null,
      disabilityType: '',
      employmentSector: false,
      employmentSectorDocument: null,
      employmentSectorType: ''
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

  const renderEducationFields = () => {
    const { level } = resumeData.education;
    const isRequired = (eduLevel: string) => {
      if (level === '대학원') {
        return eduLevel === '대학교' || eduLevel === '대학원';
      }
      if (level === '대학교') {
        return eduLevel === '대학교';
      }
      if (level === '전문대학교') {
        return eduLevel === '전문대학교';
      }
      if (level === '고등학교') {
        return eduLevel === '고등학교';
      }
      return false;
    };

    const shouldRenderField = (eduLevel: string) => {
      switch (level) {
        case '대학원':
          return true;
        case '대학교':
          return eduLevel !== '대학원';
        case '전문대학교':
          return eduLevel !== '대학원' && eduLevel !== '대학교';
        case '고등학교':
          return eduLevel === '고등학교';
        default:
          return false;
      }
    };

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="educationLevel">최종학력</Label>
          <Select
            value={level}
            onValueChange={(value) => handleEducationChange('level', value)}
          >
            <SelectTrigger id="educationLevel" className="w-full">
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">선택하세요</SelectItem>
              <SelectItem value="대학원">대학원</SelectItem>
              <SelectItem value="대학교">대학교</SelectItem>
              <SelectItem value="전문대학교">전문대학교</SelectItem>
              <SelectItem value="고등학교">고등학교</SelectItem>
              <SelectItem value="검정고시">검정고시</SelectItem>
              <SelectItem value="해당없음">해당없음</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {level && level !== '해당없음' && level !== '검정고시' && (
          <div className="space-y-6">
            {shouldRenderField('고등학교') && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-medium flex items-center gap-2">
                  고등학교 정보
                  {isRequired('고등학교') && (
                    <span className="text-[#ea384c] text-sm">필수</span>
                  )}
                </h3>
                <div>
                  <Label htmlFor="highSchool">학교명</Label>
                  <Input
                    id="highSchool"
                    value={resumeData.education.schoolName}
                    onChange={(e) => handleEducationChange('schoolName', e.target.value)}
                    required={isRequired('고등학교')}
                    className="h-12"
                  />
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
              </div>
            )}

            {shouldRenderField('전문대학교') && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-medium flex items-center gap-2">
                  전문대학교 정보
                  {isRequired('전문대학교') && (
                    <span className="text-[#ea384c] text-sm">필수</span>
                  )}
                </h3>
                <div>
                  <Label htmlFor="college">학교명</Label>
                  <Input
                    id="college"
                    value={resumeData.education.schoolName}
                    onChange={(e) => handleEducationChange('schoolName', e.target.value)}
                    required={isRequired('전문대학교')}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="collegeMajor">전공</Label>
                  <Input
                    id="collegeMajor"
                    value={resumeData.education.major}
                    onChange={(e) => handleEducationChange('major', e.target.value)}
                    required={isRequired('전문대학교')}
                    className="h-12"
                  />
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
              </div>
            )}

            {shouldRenderField('대학교') && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-medium flex items-center gap-2">
                  대학교 정보
                  {isRequired('대학교') && (
                    <span className="text-[#ea384c] text-sm">필수</span>
                  )}
                </h3>
                <div>
                  <Label htmlFor="university">학교명</Label>
                  <Input
                    id="university"
                    value={resumeData.education.schoolName}
                    onChange={(e) => handleEducationChange('schoolName', e.target.value)}
                    required={isRequired('대학교')}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="universityMajor">전공</Label>
                  <Input
                    id="universityMajor"
                    value={resumeData.education.major}
                    onChange={(e) => handleEducationChange('major', e.target.value)}
                    required={isRequired('대학교')}
                    className="h-12"
                  />
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
              </div>
            )}

            {shouldRenderField('대학원') && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-medium flex items-center gap-2">
                  대학원 정보
                  {isRequired('대학원') && (
                    <span className="text-[#ea384c] text-sm">필수</span>
                  )}
                </h3>
                <div>
                  <Label htmlFor="graduateSchool">학교명</Label>
                  <Input
                    id="graduateSchool"
                    value={resumeData.education.schoolName}
                    onChange={(e) => handleEducationChange('schoolName', e.target.value)}
                    required={isRequired('대학원')}
                    className="h-12"
                  />
                </div>
                <div>
                  <Label htmlFor="graduateSchoolMajor">전공</Label>
                  <Input
                    id="graduateSchoolMajor"
                    value={resumeData.education.major}
                    onChange={(e) => handleEducationChange('major', e.target.value)}
                    required={isRequired('대학원')}
                    className="h-12"
                  />
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
              </div>
            )}
          </div>
        )}
      </div>
    );
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
