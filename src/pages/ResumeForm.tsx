import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Award, Accessibility, HandHeart, Upload } from "lucide-react";
import { createResume } from '../services/resumeService';
import { PostcodeSearch } from '../components/PostcodeSearch';

const ResumeForm: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    postcode: "",
    address: "",
    addressDetail: "",
    
    isVeteran: false,
    veteranType: "",
    veteranDocument: null,
    isDisabled: false,
    disabilityType: "",
    disabilityDocument: null,
    isVulnerable: false,
    vulnerableType: "",
    vulnerableDocument: null,
    
    highestEducation: "대학교",
    highSchool: "",
    highSchoolMajor: "",
    highSchoolGradYear: "",
    college: "",
    collegeMajor: "",
    collegeGPA: "",
    collegeGradYear: "",
    university: "",
    universityMajor: "",
    universityGPA: "",
    universityGradYear: "",
    gradSchool: "",
    gradSchoolMajor: "",
    gradSchoolGPA: "",
    gradSchoolGradYear: "",
    
    company1: "",
    position1: "",
    period1: "",
    description1: "",
    company2: "",
    position2: "",
    period2: "",
    description2: "",
    
    skills: "",
    certificates: "",
    languages: "",
    awards: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    birthYear: false,
    birthMonth: false,
    birthDay: false,
    address: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressComplete = (data: any) => {
    setFormData(prev => ({
      ...prev,
      postcode: data.zonecode,
      address: data.address,
    }));
    setFormErrors(prev => ({ ...prev, address: false }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
  };

  const validateBasicInfo = () => {
    const errors = {
      name: !formData.name,
      email: !formData.email,
      phone: !formData.phone,
      birthYear: !formData.birthYear,
      birthMonth: !formData.birthMonth,
      birthDay: !formData.birthDay,
      address: !formData.address,
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleTabChange = (value: string) => {
    if (value !== "personal" || validateBasicInfo()) {
      setActiveTab(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resumeData = Object.values(formData) as string[];
      await createResume(resumeData);
      navigate('/resume');
    } catch (error) {
      console.error('Error creating resume:', error);
    }
  };

  const handleNext = () => {
    if (activeTab === "personal" && !validateBasicInfo()) {
      return;
    }
    
    switch(activeTab) {
      case "personal":
        setActiveTab("education");
        break;
      case "education":
        setActiveTab("experience");
        break;
      case "experience":
        setActiveTab("skills");
        break;
      default:
        break;
    }
  };

  const handlePrevious = () => {
    switch(activeTab) {
      case "education":
        setActiveTab("personal");
        break;
      case "experience":
        setActiveTab("education");
        break;
      case "skills":
        setActiveTab("experience");
        break;
      default:
        break;
    }
  };

  const years = Array.from({ length: 86 }, (_, i) => new Date().getFullYear() - 15 - i).reverse();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-6 px-6 sticky top-0 z-10 shadow-sm border-b">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-semibold">이력서 작성</h1>
              <p className="text-gray-500 text-sm">입력한 정보를 바탕으로 이력서를 작성합니다.</p>
            </div>
            <div>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">저장하기</Button>
            </div>
          </div>
        </div>
      </header>
      
      <Tabs defaultValue="personal" value={activeTab} onValueChange={handleTabChange} className="max-w-[800px] mx-auto px-6 py-8">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="personal" className="text-sm">기본 정보</TabsTrigger>
          <TabsTrigger value="education" className="text-sm">학력 사항</TabsTrigger>
          <TabsTrigger value="experience" className="text-sm">경력 사항</TabsTrigger>
          <TabsTrigger value="skills" className="text-sm">기술 & 자격증</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      이름 <span className="text-red-500 text-xs">필수</span>
                    </Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="이름을 입력하세요" 
                      value={formData.name} 
                      onChange={handleChange}
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs">이름을 입력해주세요</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      이메일 <span className="text-red-500 text-xs">필수</span>
                    </Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="이메일을 입력하세요" 
                      value={formData.email} 
                      onChange={handleChange}
                      className={formErrors.email ? "border-red-500" : ""} 
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs">이메일을 입력해주세요</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      연락처 <span className="text-red-500 text-xs">필수</span>
                    </Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      placeholder="연락처를 입력하세요" 
                      value={formData.phone} 
                      onChange={handleChange}
                      className={formErrors.phone ? "border-red-500" : ""} 
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs">연락처를 입력해주세요</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>
                      생년월일 <span className="text-red-500 text-xs">필수</span>
                    </Label>
                    <div className="grid grid-cols-3 gap-4">
                      <Select 
                        value={formData.birthYear}
                        onValueChange={(value) => handleSelectChange("birthYear", value)}
                      >
                        <SelectTrigger className={formErrors.birthYear ? "border-red-500" : ""}>
                          <SelectValue placeholder="년도" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={year} value={year.toString()}>{year}년</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select 
                        value={formData.birthMonth}
                        onValueChange={(value) => handleSelectChange("birthMonth", value)}
                      >
                        <SelectTrigger className={formErrors.birthMonth ? "border-red-500" : ""}>
                          <SelectValue placeholder="월" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map(month => (
                            <SelectItem key={month} value={month.toString()}>{month}월</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select 
                        value={formData.birthDay}
                        onValueChange={(value) => handleSelectChange("birthDay", value)}
                      >
                        <SelectTrigger className={formErrors.birthDay ? "border-red-500" : ""}>
                          <SelectValue placeholder="일" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map(day => (
                            <SelectItem key={day} value={day.toString()}>{day}일</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {(formErrors.birthYear || formErrors.birthMonth || formErrors.birthDay) && (
                      <p className="text-red-500 text-xs">생년월일을 입력해주세요</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      주소 <span className="text-red-500 text-xs">필수</span>
                    </Label>
                    <div className="space-y-2">
                      <div className="grid grid-cols-[1fr_120px] gap-2">
                        <Input 
                          id="postcode" 
                          name="postcode" 
                          placeholder="우편번호" 
                          value={formData.postcode} 
                          readOnly 
                          className={formErrors.address ? "border-red-500" : ""} 
                        />
                        <PostcodeSearch onComplete={handleAddressComplete} />
                      </div>
                      <Input 
                        id="address" 
                        name="address" 
                        placeholder="도로명 주소" 
                        value={formData.address} 
                        readOnly 
                        className={formErrors.address ? "border-red-500" : ""} 
                      />
                      <Input 
                        id="addressDetail" 
                        name="addressDetail" 
                        placeholder="상세 주소를 입력하세요" 
                        value={formData.addressDetail} 
                        onChange={handleChange} 
                      />
                    </div>
                    {formErrors.address && (
                      <p className="text-red-500 text-xs">주소를 입력해주세요</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isVeteran"
                          checked={formData.isVeteran}
                          onCheckedChange={() => handleCheckboxChange("isVeteran")}
                        />
                        <Label htmlFor="isVeteran" className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          보훈 대상
                        </Label>
                      </div>
                      {formData.isVeteran && (
                        <div className="mt-2 ml-6 space-y-2">
                          <Select
                            value={formData.veteranType}
                            onValueChange={(value) => handleSelectChange("veteranType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="보훈 종류 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="독립유공자">독립유공자</SelectItem>
                              <SelectItem value="국가유공자">국가유공자</SelectItem>
                              <SelectItem value="보훈보상대상자">보훈보상대상자</SelectItem>
                              <SelectItem value="특수임무유공자">특수임무유공자</SelectItem>
                              <SelectItem value="5.18민주유공자">5.18민주유공자</SelectItem>
                              <SelectItem value="고엽제후유의증">고엽제후유의증</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              onChange={(e) => handleFileChange(e, "veteranDocument")}
                              className="hidden"
                              id="veteranDocument"
                            />
                            <Label
                              htmlFor="veteranDocument"
                              className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
                            >
                              <Upload className="w-4 h-4" />
                              증빙서류 첨부
                            </Label>
                            {formData.veteranDocument && (
                              <span className="text-sm text-gray-600">
                                {formData.veteranDocument.name}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isDisabled"
                          checked={formData.isDisabled}
                          onCheckedChange={() => handleCheckboxChange("isDisabled")}
                        />
                        <Label htmlFor="isDisabled" className="flex items-center gap-1">
                          <Accessibility className="w-4 h-4" />
                          장애 여부
                        </Label>
                      </div>
                      {formData.isDisabled && (
                        <div className="mt-2 ml-6 space-y-2">
                          <Select
                            value={formData.disabilityType}
                            onValueChange={(value) => handleSelectChange("disabilityType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="장애 종류 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="지체장애">지체장애</SelectItem>
                              <SelectItem value="시각장애">시각장애</SelectItem>
                              <SelectItem value="청각장애">청각장애</SelectItem>
                              <SelectItem value="언어장애">언어장애</SelectItem>
                              <SelectItem value="지적장애">지적장애</SelectItem>
                              <SelectItem value="자폐성장애">자폐성장애</SelectItem>
                              <SelectItem value="정신장애">정신장애</SelectItem>
                              <SelectItem value="신장장애">신장장애</SelectItem>
                              <SelectItem value="심장장애">심장장애</SelectItem>
                              <SelectItem value="호흡기장애">호흡기장애</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              onChange={(e) => handleFileChange(e, "disabilityDocument")}
                              className="hidden"
                              id="disabilityDocument"
                            />
                            <Label
                              htmlFor="disabilityDocument"
                              className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
                            >
                              <Upload className="w-4 h-4" />
                              증빙서류 첨부
                            </Label>
                            {formData.disabilityDocument && (
                              <span className="text-sm text-gray-600">
                                {formData.disabilityDocument.name}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isVulnerable"
                          checked={formData.isVulnerable}
                          onCheckedChange={() => handleCheckboxChange("isVulnerable")}
                        />
                        <Label htmlFor="isVulnerable" className="flex items-center gap-1">
                          <HandHeart className="w-4 h-4" />
                          취약계층 여부
                        </Label>
                      </div>
                      {formData.isVulnerable && (
                        <div className="mt-2 ml-6 space-y-2">
                          <Select
                            value={formData.vulnerableType}
                            onValueChange={(value) => handleSelectChange("vulnerableType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="취약계층 종류 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="기초생활수급자">기초생활수급자</SelectItem>
                              <SelectItem value="차상위계층">차상위계층</SelectItem>
                              <SelectItem value="한부모가족">한부모가족</SelectItem>
                              <SelectItem value="북한이탈주민">북한이탈주민</SelectItem>
                              <SelectItem value="결혼이민자">결혼이민자</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              onChange={(e) => handleFileChange(e, "vulnerableDocument")}
                              className="hidden"
                              id="vulnerableDocument"
                            />
                            <Label
                              htmlFor="vulnerableDocument"
                              className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
                            >
                              <Upload className="w-4 h-4" />
                              증빙서류 첨부
                            </Label>
                            {formData.vulnerableDocument && (
                              <span className="text-sm text-gray-600">
                                {formData.vulnerableDocument.name}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <Button 
                    onClick={handleNext} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    다음
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="highestEducation">최종 학력</Label>
                  <Select 
                    name="highestEducation" 
                    value={formData.highestEducation} 
                    onValueChange={(value) => handleSelectChange("highestEducation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="최종 학력을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="해당없음">해당없음</SelectItem>
                      <SelectItem value="고등학교">고등학교</SelectItem>
                      <SelectItem value="전문대학">전문대학</SelectItem>
                      <SelectItem value="대학교">대학교</SelectItem>
                      <SelectItem value="대학원">대학원</SelectItem>
                      <SelectItem value="검정고시">검정고시</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">고등학교 정보</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="highSchool">
                        고등학교명
                        {formData.highestEducation === "고등학교" && (
                          <span className="text-red-500 text-xs ml-1">필수</span>
                        )}
                      </Label>
                      <Input 
                        id="highSchool" 
                        name="highSchool" 
                        placeholder="고등학교명" 
                        value={formData.highSchool} 
                        onChange={handleChange} 
                        required={formData.highestEducation === "고등학교"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="highSchoolMajor">전공계열</Label>
                      <Input 
                        id="highSchoolMajor" 
                        name="highSchoolMajor" 
                        placeholder="전공계열" 
                        value={formData.highSchoolMajor} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="highSchoolGradYear">졸업년도</Label>
                      <Input 
                        id="highSchoolGradYear" 
                        name="highSchoolGradYear" 
                        placeholder="졸업년도" 
                        value={formData.highSchoolGradYear} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>
                </div>
                
                {(formData.highestEducation === "전문대학" || 
                  formData.highestEducation === "대학교" || 
                  formData.highestEducation === "대학원") && (
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4">전문대학교 정보</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="college">
                          전문대학명
                          {formData.highestEducation === "전문대학" && (
                            <span className="text-red-500 text-xs ml-1">필수</span>
                          )}
                        </Label>
                        <Input 
                          id="college" 
                          name="college" 
                          placeholder="전문대학명" 
                          value={formData.college} 
                          onChange={handleChange} 
                          required={formData.highestEducation === "전문대학"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collegeMajor">전공</Label>
                        <Input 
                          id="collegeMajor" 
                          name="collegeMajor" 
                          placeholder="전공" 
                          value={formData.collegeMajor} 
                          onChange={handleChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collegeGPA">학점</Label>
                        <Input 
                          id="collegeGPA" 
                          name="collegeGPA" 
                          placeholder="학점" 
                          value={formData.collegeGPA} 
                          onChange={handleChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="collegeGradYear">졸업년도</Label>
                        <Input 
                          id="collegeGradYear" 
                          name="collegeGradYear" 
                          placeholder="졸업년도" 
                          value={formData.collegeGradYear} 
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {(formData.highestEducation === "대학교" || 
                  formData.highestEducation === "대학원") && (
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4">대학교 정보</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="university">
                          대학교명
                          {formData.highestEducation === "대학교" && (
                            <span className="text-red-500 text-xs ml-1">필수</span>
                          )}
                        </Label>
                        <Input 
                          id="university" 
                          name="university" 
                          placeholder="대학교명" 
                          value={formData.university} 
                          onChange={handleChange} 
                          required={formData.highestEducation === "대학교"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="universityMajor">전공</Label>
                        <Input 
                          id="universityMajor" 
                          name="universityMajor" 
                          placeholder="전공" 
                          value={formData.universityMajor} 
                          onChange={handleChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="universityGPA">학점</Label>
                        <Input 
                          id="universityGPA" 
                          name="universityGPA" 
                          placeholder="학점" 
                          value={formData.universityGPA} 
                          onChange={handleChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="universityGradYear">졸업년도</Label>
                        <Input 
                          id="universityGradYear" 
                          name="universityGradYear" 
                          placeholder="졸업년도" 
                          value={formData.universityGradYear} 
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {formData.highestEducation === "대학원" && (
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-4">대학원 정보</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gradSchool">
                          대학원명
                          <span className="text-red-500 text-xs ml-1">필수</span>
                        </Label>
                        <Input 
                          id="gradSchool" 
                          name="gradSchool" 
                          placeholder="대학원명" 
                          value={formData.gradSchool} 
                          onChange={handleChange} 
                          required={formData.highestEducation === "대학원"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gradSchoolMajor">전공</Label>
                        <Input 
                          id="gradSchoolMajor" 
                          name="gradSchoolMajor" 
                          placeholder="전공" 
                          value={formData.gradSchoolMajor} 
                          onChange={handleChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gradSchoolGPA">학점</Label>
                        <Input 
                          id="gradSchoolGPA" 
                          name="gradSchoolGPA" 
                          placeholder="학점" 
                          value={formData.gradSchoolGPA} 
                          onChange={handleChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gradSchoolGradYear">졸업년도</Label>
                        <Input 
                          id="gradSchoolGradYear" 
                          name="gradSchoolGradYear" 
                          placeholder="졸업년도" 
                          value={formData.gradSchoolGradYear} 
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between space-x-4 mt-6">
                  <Button onClick={handlePrevious} variant="outline">이전</Button>
                  <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">다음</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="experience">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-medium mb-4">경력 1</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company1">회사명</Label>
                      <Input 
                        id="company1" 
                        name="company1" 
                        placeholder="회사명" 
                        value={formData.company1} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position1">직책/직무</Label>
                      <Input 
                        id="position1" 
                        name="position1" 
                        placeholder="직책/직무" 
                        value={formData.position1} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="period1">재직 기간</Label>
                      <Input 
                        id="period1" 
                        name="period1" 
                        placeholder="YYYY.MM - YYYY.MM" 
                        value={formData.period1} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description1">담당 업무</Label>
                      <Input 
                        id="description1" 
                        name="description1" 
                        placeholder="담당했던 업무를 간략히 설명해주세요" 
                        value={formData.description1} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">경력 2</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company2">회사명</Label>
                      <Input 
                        id="company2" 
                        name="company2" 
                        placeholder="회사명" 
                        value={formData.company2} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position2">직책/직무</Label>
                      <Input 
                        id="position2" 
                        name="position2" 
                        placeholder="직책/직무" 
                        value={formData.position2} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="period2">재직 기간</Label>
                      <Input 
                        id="period2" 
                        name="period2" 
                        placeholder="YYYY.MM - YYYY.MM" 
                        value={formData.period2} 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description2">담당 업무</Label>
                      <Input 
                        id="description2" 
                        name="description2" 
                        placeholder="담당했던 업무를 간략히 설명해주세요" 
                        value={formData.description2} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between space-x-4 mt-6">
                  <Button onClick={handlePrevious} variant="outline">이전</Button>
                  <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">다음</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="skills">보유 기술</Label>
                  <Input 
                    id="skills" 
                    name="skills" 
                    placeholder="보유한 기술을 입력하세요 (예: Python, JavaScript, Photoshop)" 
                    value={formData.skills} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="certificates">자격증</Label>
                  <Input 
                    id="certificates" 
                    name="certificates" 
                    placeholder="보유한 자격증을 입력하세요" 
                    value={formData.certificates} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="languages">외국어 능력</Label>
                  <Input 
                    id="languages" 
                    name="languages" 
                    placeholder="구사 가능한 외국어와 수준을 입력하세��" 
                    value={formData.languages} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="awards">수상 내역</Label>
                  <Input 
                    id="awards" 
                    name="awards" 
                    placeholder="수상 내역을 입력하세요" 
                    value={formData.awards} 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="flex justify-between space-x-4 mt-6">
                  <Button onClick={handlePrevious} variant="outline">이전</Button>
                  <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">저장하기</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeForm;
