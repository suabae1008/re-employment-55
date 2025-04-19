import React from 'react';
import { Card, CardContent } from "./ui/card";
import { PencilLine } from "lucide-react";
import { Button } from "./ui/button";

interface ResumePreviewProps {
  formData: any;
  onEdit: () => void;
  onSubmit: (e?: React.FormEvent) => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ formData, onEdit, onSubmit }) => {
  const formatComputerSkills = () => {
    const skills = [];
    if (formData.computerSkills.documentCreation) skills.push("문서 작성");
    if (formData.computerSkills.spreadsheet) skills.push("스프레드시트");
    if (formData.computerSkills.presentation) skills.push("프레젠테이션");
    if (formData.computerSkills.accounting) skills.push("회계 프로그램");
    if (formData.computerSkills.other) skills.push(formData.computerSkills.other);
    return skills.join(", ");
  };

  const formatDrivingAbility = () => {
    const abilities = [];
    if (formData.drivingAbility.license) abilities.push("운전면허 보유");
    if (formData.drivingAbility.vehicle) abilities.push("차량 보유");
    return abilities.join(", ");
  };

  return (
    <Card className="max-w-[800px] mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f50b1e03a1fea690ea1c5626170f7597a96442e" 
              className="w-[61px] h-[50px] mb-2.5" 
              alt="Logo" 
            />
            <h2 className="text-2xl font-bold">내 이력서</h2>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onEdit}
          >
            <PencilLine className="w-4 h-4" />
            수정하기
          </Button>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-semibold mb-4">기본정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">성함</label>
                <p>{formData.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">생년월일</label>
                <p>{`${formData.birthYear}.${formData.birthMonth}.${formData.birthDay}`}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">이메일</label>
                <p>{formData.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">휴대전화</label>
                <p>{formData.phone}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">학력사항</h3>
            {formData.highestEducation !== "해당없음" && (
              <div className="space-y-4">
                {formData.university && (
                  <div>
                    <p className="font-medium">{formData.university}</p>
                    <p className="text-sm text-gray-600">
                      {formData.universityMajor} | {formData.universityGradYear}년 졸업
                    </p>
                  </div>
                )}
                {formData.college && (
                  <div>
                    <p className="font-medium">{formData.college}</p>
                    <p className="text-sm text-gray-600">
                      {formData.collegeMajor} | {formData.collegeGradYear}년 졸업
                    </p>
                  </div>
                )}
                {formData.highSchool && (
                  <div>
                    <p className="font-medium">{formData.highSchool}</p>
                    <p className="text-sm text-gray-600">
                      {formData.highSchoolGradYear}년 졸업
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">경력사항</h3>
            <div className="space-y-4">
              {formData.experiences.map((exp: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <p className="font-medium">{exp.companyName}</p>
                  <p className="text-sm text-gray-600">
                    {exp.jobTitle === "직접 입력" ? exp.customJobTitle : exp.jobTitle} | {exp.contractType}
                  </p>
                  <p className="text-sm text-gray-600">
                    {exp.startYear}.{exp.startMonth} - {exp.endYear}.{exp.endMonth}
                  </p>
                  <p className="mt-2">{exp.responsibilities}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">자격증</h3>
            <div className="space-y-4">
              {formData.certificates.map((cert: any, index: number) => (
                <div key={index}>
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-gray-600">
                    {cert.grade} | {cert.organization} | {cert.issueDate}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">컴퓨터 활용 능력</h3>
            <p>{formatComputerSkills()}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">운전 능력</h3>
            <p>{formatDrivingAbility()}</p>
          </section>

          <div className="flex justify-end space-x-4 mt-8">
            <Button onClick={() => onSubmit()} className="bg-blue-600 hover:bg-blue-700">
              저장
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
