import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  Plus,
  Edit2,
  Trash,
  Sparkles,
} from "lucide-react";
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
import Header from "../components/Header";

interface CoverLetter {
  id: string;
  company: string;
  position: string;
  title: string;
  date: string;
}

const CoverLetter = () => {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [showEmptyState, setShowEmptyState] = useState(true);
  const [jobCategories] = useState(["의료", "간호", "요양"]);
  const navigate = useNavigate();

  // In a real app, this would fetch from a backend
  // Here we're just simulating for the UI demonstration
  React.useEffect(() => {
    // Simulate checking if user has cover letters
    const hasCoverLetters = localStorage.getItem("hasCoverLetters") === "true";
    setShowEmptyState(!hasCoverLetters);

    if (hasCoverLetters) {
      // Mock data
      setCoverLetters([
        {
          id: "1",
          company: "방문간호사",
          position: "주식회사웰페어스테이션",
          title: "방문간호사 모집 공고 (파트 타임)",
          date: "2025.03.26 작성",
        },
      ]);
    }
  }, []);

  const handleCreateCoverLetter = () => {
    // Navigate to cover letter creation form
    navigate("/cover-letter/create");
  };

  const handleCreateAICoverLetter = () => {
    // Navigate to AI cover letter creation page
    navigate("/cover-letter/ai-create");
  };

  const handleDeleteCoverLetter = (id: string) => {
    // Remove the cover letter from the state
    setCoverLetters((prev) => prev.filter((letter) => letter.id !== id));

    // If no cover letters left, update the empty state and localStorage
    if (coverLetters.length <= 1) {
      localStorage.setItem("hasCoverLetters", "false");
      setShowEmptyState(true);
    }

    toast.success("자기소개서가 삭제되었습니다.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="자기소개서" />

      {/* Main Content */}
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
            <p className="text-gray-500 mb-10">작성된 자기소개서가 없습니다.</p>

            <div className="w-full max-w-md flex justify-center">
              <Button
                onClick={handleCreateAICoverLetter}
                className="bg-[#FFE376] hover:bg-[#FFE376] text-black rounded-full py-3 px-6 flex items-center gap-2"
              >
                <img
                  src="/buttons/Plus.svg"
                  alt="AI로 자기소개서 작성"
                  className="w-5 h-5"
                />
                <span className="font-bold">AI로 자기소개서 작성</span>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {coverLetters.map((letter) => (
              <Card key={letter.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">
                        {letter.position}
                      </div>
                      <h3 className="font-semibold text-lg">{letter.title}</h3>
                    </div>
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
                            <AlertDialogTitle>자기소개서 삭제</AlertDialogTitle>
                            <AlertDialogDescription>
                              이 자기소개서를 삭제하시겠습니까? 이 작업은 되돌릴
                              수 없습니다.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600"
                              onClick={() => handleDeleteCoverLetter(letter.id)}
                            >
                              삭제
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{letter.date}</p>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() =>
                        navigate(`/cover-letter/edit/${letter.id}`)
                      }
                    >
                      <Edit2 size={16} className="mr-1" />
                      수정
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="mt-8 space-y-4 flex flex-col items-center">
              <Button
                onClick={handleCreateAICoverLetter}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-6 flex items-center w-full max-w-md justify-center"
              >
                <Sparkles size={20} className="mr-2" />
                AI 자기소개서 작성하기
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default CoverLetter;
