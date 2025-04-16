
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Calendar as CalendarIcon, Check } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "sonner";
import BottomNavigation from '../components/BottomNavigation';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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
  certificates: any[]; // To be expanded later
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
    certificates: []
  });

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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Link to="/resume" className="mr-4">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-bold">{isEditMode ? '이력서 수정' : '이력서 작성'}</h1>
          </div>
          <Button 
            onClick={handleSaveResume}
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            <Save size={16} className="mr-2" />
            저장
          </Button>
        </div>
      </header>

      <main className="px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basicInfo">기본정보</TabsTrigger>
            <TabsTrigger value="education">학력</TabsTrigger>
            <TabsTrigger value="experience">경력</TabsTrigger>
            <TabsTrigger value="certificates">자격증</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basicInfo" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">성함</Label>
                    <Input 
                      id="name" 
                      value={resumeData.basicInfo.name} 
                      onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>생년월일</Label>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="birthYear">연도</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              {resumeData.basicInfo.birthYear}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48 h-60 overflow-y-auto p-0">
                            <ToggleGroup 
                              type="single"
                              className="flex flex-col"
                              value={resumeData.basicInfo.birthYear.toString()}
                              onValueChange={(value) => value && handleBirthDateChange('birthYear', parseInt(value))}
                            >
                              {years.map(year => (
                                <ToggleGroupItem key={year} value={year.toString()} className="w-full rounded-none justify-start">
                                  {year}
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <Label htmlFor="birthMonth">월</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              {resumeData.basicInfo.birthMonth}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 h-60 overflow-y-auto p-0">
                            <ToggleGroup 
                              type="single"
                              className="flex flex-col"
                              value={resumeData.basicInfo.birthMonth.toString()}
                              onValueChange={(value) => value && handleBirthDateChange('birthMonth', parseInt(value))}
                            >
                              {months.map(month => (
                                <ToggleGroupItem key={month} value={month.toString()} className="w-full rounded-none justify-start">
                                  {month}
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div>
                        <Label htmlFor="birthDay">일</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              {resumeData.basicInfo.birthDay}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 h-60 overflow-y-auto p-0">
                            <ToggleGroup 
                              type="single"
                              className="flex flex-col"
                              value={resumeData.basicInfo.birthDay.toString()}
                              onValueChange={(value) => value && handleBirthDateChange('birthDay', parseInt(value))}
                            >
                              {days.map(day => (
                                <ToggleGroupItem key={day} value={day.toString()} className="w-full rounded-none justify-start">
                                  {day}
                                </ToggleGroupItem>
                              ))}
                            </ToggleGroup>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">이메일</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={resumeData.basicInfo.email} 
                      onChange={(e) => handleBasicInfoChange('email', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">휴대폰</Label>
                    <Input 
                      id="phone" 
                      value={resumeData.basicInfo.phone} 
                      onChange={(e) => handleBasicInfoChange('phone', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">주소</Label>
                    <Input 
                      id="address" 
                      value={resumeData.basicInfo.address} 
                      onChange={(e) => handleBasicInfoChange('address', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="veteran" 
                      checked={resumeData.basicInfo.veteran} 
                      onCheckedChange={(checked) => handleBasicInfoChange('veteran', !!checked)}
                    />
                    <Label htmlFor="veteran">보훈 대상</Label>
                    {resumeData.basicInfo.veteran && (
                      <Input 
                        type="file" 
                        className="ml-2" 
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleFileChange('veteranDocument', file);
                        }}
                      />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="disability" 
                      checked={resumeData.basicInfo.disability} 
                      onCheckedChange={(checked) => handleBasicInfoChange('disability', !!checked)}
                    />
                    <Label htmlFor="disability">장애 여부</Label>
                    {resumeData.basicInfo.disability && (
                      <Input 
                        type="file" 
                        className="ml-2" 
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleFileChange('disabilityDocument', file);
                        }}
                      />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="employmentSector" 
                      checked={resumeData.basicInfo.employmentSector} 
                      onCheckedChange={(checked) => handleBasicInfoChange('employmentSector', !!checked)}
                    />
                    <Label htmlFor="employmentSector">취업계층 여부</Label>
                    {resumeData.basicInfo.employmentSector && (
                      <Input 
                        type="file" 
                        className="ml-2" 
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleFileChange('employmentSectorDocument', file);
                        }}
                      />
                    )}
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
                            <SelectValue placeholder="국가를 선택해 주세요" />
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
                <p className="text-center py-10 text-gray-500">자격증 정보를 입력하세요</p>
                {/* Certificates form will be expanded in future iterations */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default ResumeForm;
