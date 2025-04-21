import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { createResume } from "../services/resumeService";
import { PersonalInfoForm } from "../components/resume/PersonalInfoForm";
import { EducationForm } from "../components/resume/EducationForm";
import { ExperienceForm } from "../components/resume/ExperienceForm";
import { SkillsForm } from "../components/resume/SkillsForm";
import ResumePreview from "../components/ResumePreview";
import Header from "@/components/Header";

const ResumeForm: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);

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

    experiences: [
      {
        companyName: "",
        jobTitle: "",
        customJobTitle: "",
        contractType: "",
        employmentStatus: "",
        startYear: "",
        startMonth: "",
        endYear: "",
        endMonth: "",
        responsibilities: "",
      },
    ],

    certificates: [
      {
        name: "",
        grade: "",
        issueDate: "",
        organization: "",
      },
    ],

    computerSkills: {
      documentCreation: false,
      spreadsheet: false,
      presentation: false,
      accounting: false,
      other: "",
    },

    drivingAbility: {
      license: false,
      vehicle: false,
    },
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressComplete = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      postcode: data.zonecode,
      address: data.address,
    }));
    setFormErrors((prev) => ({ ...prev, address: false }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, [fieldName]: file }));
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
    return !Object.values(errors).some((error) => error);
  };

  const handleTabChange = (value: string) => {
    if (value !== "personal" || validateBasicInfo()) {
      setActiveTab(value);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const resumeData = Object.values(formData) as string[];
      await createResume(resumeData);
      navigate("/resume");
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  const handleNext = () => {
    if (activeTab === "personal" && !validateBasicInfo()) {
      return;
    }

    switch (activeTab) {
      case "personal":
        setActiveTab("education");
        break;
      case "education":
        setActiveTab("experience");
        break;
      case "experience":
        setActiveTab("skills");
        break;
      case "skills":
        setShowPreview(true);
        break;
      default:
        break;
    }
  };

  const handlePrevious = () => {
    switch (activeTab) {
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

  const addNewExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          companyName: "",
          jobTitle: "",
          customJobTitle: "",
          contractType: "",
          employmentStatus: "",
          startYear: "",
          startMonth: "",
          endYear: "",
          endMonth: "",
          responsibilities: "",
        },
      ],
    }));
  };

  const deleteExperience = (indexToDelete: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };

  const years = Array.from(
    { length: 86 },
    (_, i) => new Date().getFullYear() - 15 - i
  ).reverse();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const jobTitles = [
    "개발자",
    "디자이너",
    "기획자",
    "마케터",
    "영업",
    "인사",
    "회계",
    "직접 입력",
  ];

  const contractTypes = ["정규직", "계약직", "인턴", "파견직", "프리랜서"];

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          name: "",
          grade: "",
          issueDate: "",
          organization: "",
        },
      ],
    }));
  };

  const updateCertificate = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const deleteCertificate = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }));
  };

  if (showPreview) {
    return (
      <ResumePreview
        formData={formData}
        onEdit={() => setShowPreview(false)}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="이력서" />
      {/* <header className="bg-white py-6 px-6 sticky top-0 z-10 shadow-sm border-b"> */}
      {/* <div className="max-w-[800px] mx-auto">
          <div className="flex flex-col items-start">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f50b1e03a1fea690ea1c5626170f7597a96442e?placeholderIfAbsent=true"
              className="w-[61px] h-[50px] mb-2.5"
              alt="Logo"
            /> */}
      {/* <h1 className="text-[28px] text-black mb-2.5">김현숙님,</h1>
            <p className="text-[15px] text-[#5A5A5A]">
              기본 정보를 확인해주세요.
            </p> */}
      {/* </div>
        </div>
      </header> */}

      <Tabs
        defaultValue="personal"
        value={activeTab}
        onValueChange={handleTabChange}
        className="max-w-[800px] mx-auto px-6 py-8"
      >
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="personal" className="text-sm">
            기본 정보
          </TabsTrigger>
          <TabsTrigger value="education" className="text-sm">
            학력 사항
          </TabsTrigger>
          <TabsTrigger value="experience" className="text-sm">
            경력 사항
          </TabsTrigger>
          <TabsTrigger value="skills" className="text-sm">
            자격증 & 기타
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
            handleFileChange={handleFileChange}
            handleAddressComplete={handleAddressComplete}
            handleNext={handleNext}
          />
        </TabsContent>

        <TabsContent value="education">
          <EducationForm
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceForm
            formData={formData}
            handleExperienceChange={handleExperienceChange}
            addNewExperience={addNewExperience}
            deleteExperience={deleteExperience}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsForm
            formData={formData}
            setFormData={setFormData}
            updateCertificate={updateCertificate}
            addCertificate={addCertificate}
            deleteCertificate={deleteCertificate}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeForm;
