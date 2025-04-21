
import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Trash2 } from "lucide-react";

interface SkillsFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  updateCertificate: (index: number, field: string, value: string) => void;
  addCertificate: () => void;
  deleteCertificate: (index: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({
  formData,
  setFormData,
  updateCertificate,
  addCertificate,
  deleteCertificate,
  handlePrevious,
  handleNext
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <h3 className="font-medium text-lg mb-4">자격증</h3>
          
          {formData.certificates.map((certificate: any, index: number) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">자격증 {index + 1}</h4>
                {formData.certificates.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCertificate(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`certificateName${index}`}>자격증명</Label>
                  <Input
                    id={`certificateName${index}`}
                    value={certificate.name}
                    onChange={(e) => updateCertificate(index, "name", e.target.value)}
                    placeholder="자격증 이름"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`certificateGrade${index}`}>등급</Label>
                  <Input
                    id={`certificateGrade${index}`}
                    value={certificate.grade}
                    onChange={(e) => updateCertificate(index, "grade", e.target.value)}
                    placeholder="등급/점수"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`certificateOrganization${index}`}>발행기관</Label>
                  <Input
                    id={`certificateOrganization${index}`}
                    value={certificate.organization}
                    onChange={(e) => updateCertificate(index, "organization", e.target.value)}
                    placeholder="발행기관"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`certificateIssueDate${index}`}>취득일</Label>
                  <Input
                    id={`certificateIssueDate${index}`}
                    value={certificate.issueDate}
                    onChange={(e) => updateCertificate(index, "issueDate", e.target.value)}
                    placeholder="YYYY.MM.DD"
                  />
                </div>
              </div>
              
              {index < formData.certificates.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
          
          <Button 
            variant="outline" 
            onClick={addCertificate}
            className="w-full mt-4"
          >
            + 자격증 추가
          </Button>
          
          <div className="border-t pt-6 mt-6">
            <h3 className="font-medium text-lg mb-4">컴퓨터 활용 능력</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="documentCreation"
                  checked={formData.computerSkills.documentCreation}
                  onCheckedChange={() => 
                    setFormData(prev => ({
                      ...prev,
                      computerSkills: {
                        ...prev.computerSkills,
                        documentCreation: !prev.computerSkills.documentCreation
                      }
                    }))
                  }
                />
                <Label htmlFor="documentCreation">문서 작성 (한글, MS워드 등)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="spreadsheet"
                  checked={formData.computerSkills.spreadsheet}
                  onCheckedChange={() => 
                    setFormData(prev => ({
                      ...prev,
                      computerSkills: {
                        ...prev.computerSkills,
                        spreadsheet: !prev.computerSkills.spreadsheet
                      }
                    }))
                  }
                />
                <Label htmlFor="spreadsheet">스프레드시트 (엑셀 등)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="presentation"
                  checked={formData.computerSkills.presentation}
                  onCheckedChange={() => 
                    setFormData(prev => ({
                      ...prev,
                      computerSkills: {
                        ...prev.computerSkills,
                        presentation: !prev.computerSkills.presentation
                      }
                    }))
                  }
                />
                <Label htmlFor="presentation">프레젠테이션 (파워포인트 등)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accounting"
                  checked={formData.computerSkills.accounting}
                  onCheckedChange={() => 
                    setFormData(prev => ({
                      ...prev,
                      computerSkills: {
                        ...prev.computerSkills,
                        accounting: !prev.computerSkills.accounting
                      }
                    }))
                  }
                />
                <Label htmlFor="accounting">회계 프로그램</Label>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="otherSkill"
                    checked={!!formData.computerSkills.other}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({
                        ...prev,
                        computerSkills: {
                          ...prev.computerSkills,
                          other: checked ? " " : ""
                        }
                      }))
                    }
                  />
                  <Label htmlFor="otherSkill">기타</Label>
                </div>
                
                {formData.computerSkills.other !== "" && (
                  <Input
                    value={formData.computerSkills.other}
                    onChange={(e) => 
                      setFormData(prev => ({
                        ...prev,
                        computerSkills: {
                          ...prev.computerSkills,
                          other: e.target.value
                        }
                      }))
                    }
                    placeholder="기타 컴퓨터 활용 능력을 입력하세요"
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="font-medium text-lg mb-4">운전 능력</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="drivingLicense"
                  checked={formData.drivingAbility.license}
                  onCheckedChange={() => 
                    setFormData(prev => ({
                      ...prev,
                      drivingAbility: {
                        ...prev.drivingAbility,
                        license: !prev.drivingAbility.license
                      }
                    }))
                  }
                />
                <Label htmlFor="drivingLicense">운전면허 보유</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ownVehicle"
                  checked={formData.drivingAbility.vehicle}
                  onCheckedChange={() => 
                    setFormData(prev => ({
                      ...prev,
                      drivingAbility: {
                        ...prev.drivingAbility,
                        vehicle: !prev.drivingAbility.vehicle
                      }
                    }))
                  }
                />
                <Label htmlFor="ownVehicle">차량 보유</Label>
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
  );
};
