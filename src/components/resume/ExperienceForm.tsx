
import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Trash2 } from "lucide-react";

interface ExperienceFormProps {
  formData: any;
  handleExperienceChange: (index: number, field: string, value: string) => void;
  addNewExperience: () => void;
  deleteExperience: (index: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  formData,
  handleExperienceChange,
  addNewExperience,
  deleteExperience,
  handlePrevious,
  handleNext
}) => {
  const years = Array.from({ length: 86 }, (_, i) => new Date().getFullYear() - 15 - i).reverse();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  const jobTitles = [
    "개발자",
    "디자이너",
    "기획자",
    "마케터",
    "영업",
    "인사",
    "회계",
    "직접 입력"
  ];

  const contractTypes = [
    "정규직",
    "계약직",
    "인턴",
    "파견직",
    "프리랜서"
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {formData.experiences.map((experience: any, index: number) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">경력 {index + 1}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteExperience(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`companyName${index}`}>회사명</Label>
                  <Input
                    id={`companyName${index}`}
                    value={experience.companyName}
                    onChange={(e) => handleExperienceChange(index, "companyName", e.target.value)}
                    placeholder="회사명"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`jobTitle${index}`}>직무</Label>
                    <Select
                      value={experience.jobTitle}
                      onValueChange={(value) => handleExperienceChange(index, "jobTitle", value)}
                    >
                      <SelectTrigger id={`jobTitle${index}`}>
                        <SelectValue placeholder="직무 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTitles.map((title) => (
                          <SelectItem key={title} value={title}>{title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {experience.jobTitle === "직접 입력" && (
                    <div className="space-y-2">
                      <Label htmlFor={`customJobTitle${index}`}>직접 입력</Label>
                      <Input
                        id={`customJobTitle${index}`}
                        value={experience.customJobTitle}
                        onChange={(e) => handleExperienceChange(index, "customJobTitle", e.target.value)}
                        placeholder="직무명 입력"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor={`contractType${index}`}>고용형태</Label>
                    <Select
                      value={experience.contractType}
                      onValueChange={(value) => handleExperienceChange(index, "contractType", value)}
                    >
                      <SelectTrigger id={`contractType${index}`}>
                        <SelectValue placeholder="고용형태 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {contractTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>근무기간</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={experience.startYear}
                        onValueChange={(value) => handleExperienceChange(index, "startYear", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="년도" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={`start-year-${year}`} value={year.toString()}>{year}년</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={experience.startMonth}
                        onValueChange={(value) => handleExperienceChange(index, "startMonth", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="월" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map(month => (
                            <SelectItem key={`start-month-${month}`} value={month.toString()}>{month}월</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        value={experience.endYear}
                        onValueChange={(value) => handleExperienceChange(index, "endYear", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="년도" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={`end-year-${year}`} value={year.toString()}>{year}년</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={experience.endMonth}
                        onValueChange={(value) => handleExperienceChange(index, "endMonth", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="월" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map(month => (
                            <SelectItem key={`end-month-${month}`} value={month.toString()}>{month}월</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`responsibilities${index}`}>담당업무</Label>
                  <Input
                    id={`responsibilities${index}`}
                    value={experience.responsibilities}
                    onChange={(e) => handleExperienceChange(index, "responsibilities", e.target.value)}
                    placeholder="담당 업무 내용을 입력하세요"
                  />
                </div>
              </div>
              
              {index < formData.experiences.length - 1 && (
                <Separator className="my-6" />
              )}
            </div>
          ))}
          
          <Button 
            variant="outline" 
            onClick={addNewExperience}
            className="w-full"
          >
            + 경력 추가
          </Button>
          
          <div className="flex justify-between space-x-4 mt-6">
            <Button onClick={handlePrevious} variant="outline">이전</Button>
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">다음</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
