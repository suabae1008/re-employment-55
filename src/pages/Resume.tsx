import React, { useState, useEffect } from "react";
import { ArrowLeft, Download, Plus, Edit2, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import BottomNavigation from "../components/BottomNavigation";
import Header from "@/components/Header";

interface Resume {
  id: string;
  title: string;
  date: string;
  content?: string;
}

const Resume = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [showEmptyState, setShowEmptyState] = useState(true);
  const [jobCategories] = useState(["의료", "간호", "요양"]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking if user has resumes
    const hasResumes = localStorage.getItem("hasResumes") === "true";
    setShowEmptyState(!hasResumes);

    if (hasResumes) {
      // Mock data
      setResumes([
        {
          id: "1",
          title: "기본 이력서",
          date: "2025.03.26 작성",
          content: "경력 및 학력 정보...",
        },
      ]);
    }
  }, []);

  const handleCreateResume = () => {
    // Navigate to the resume form page
    navigate("/resume/create");
  };

  const handleDeleteResume = (id: string) => {
    // Remove the resume from the state
    setResumes((prev) => prev.filter((resume) => resume.id !== id));

    // If no resumes left, update the empty state and localStorage
    if (resumes.length <= 1) {
      localStorage.setItem("hasResumes", "false");
      setShowEmptyState(true);
    }

    toast.success("이력서가 삭제되었습니다.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header title="이력서" />

      <main className="px-4 py-6">
        <section className=" bg-white px-4 py-6 flex flex-col items-start text-left mb-6 rounded-lg shadow-sm">
          <p className="text-xl font-bold leading-relaxed text-gray-900">
            더 성장하는 나, <br />
            나의 관심 직무는
          </p>
          <div className="mt-2 flex flex-wrap justify-end gap-2 text-app-blue font-bold text-2xl">
            <span>#의료</span>
            <span>#간호</span>
            <span>#요양</span>
          </div>
        </section>
        {showEmptyState ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 mb-10">작성된 이력서가 없습니다.</p>
            <Button
              onClick={handleCreateResume}
              className="bg-[#FFE376] hover:bg-[#FFE376] text-black rounded-full py-3 px-6 flex items-center gap-2"
            >
              <img
                src="/buttons/Plus.svg"
                alt="이력서 작성하기"
                className="w-5 h-5"
              />
              <span className="font-bold">이력서 작성하기</span>
            </Button>
          </div>
        ) : (
          <div>
            {resumes.map((resume) => (
              <Card key={resume.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{resume.title}</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Download size={20} className="text-blue-500" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash size={20} className="text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>이력서 삭제</AlertDialogTitle>
                            <AlertDialogDescription>
                              이 이력서를 삭제하시겠습니까? 이 작업은 되돌릴 수
                              없습니다.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleDeleteResume(resume.id)}
                            >
                              삭제
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{resume.date}</p>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => navigate(`/resume/edit/${resume.id}`)}
                    >
                      <Edit2 size={16} className="mr-1" />
                      이력서 수정
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleCreateResume}
                className="bg-[#FFE376] hover:bg-[#FFE376] text-black rounded-full py-3 px-6 flex items-center"
              >
                <Plus size={20} className="mr-2" />새 이력서 작성하기
              </Button>
            </div>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Resume;
