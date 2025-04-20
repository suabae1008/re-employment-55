
import React, { useState } from 'react';
import { ArrowLeft, Download, Plus, Edit2, Trash, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
import BottomNavigation from '../components/BottomNavigation';

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
  const [jobCategories] = useState(['의료', '간호', '요양']);
  const navigate = useNavigate();

  React.useEffect(() => {
    const hasCoverLetters = localStorage.getItem('hasCoverLetters') === 'true';
    setShowEmptyState(!hasCoverLetters);
    
    if (hasCoverLetters) {
      setCoverLetters([{
        id: '1',
        company: '방문간호사',
        position: '주식회사웰페어스테이션',
        title: '방문간호사 모집 공고 (파트 타임)',
        date: '2025.03.26 작성'
      }]);
    }
  }, []);

  const handleCreateCoverLetter = () => {
    navigate('/cover-letter/create');
  };

  const handleCreateAICoverLetter = () => {
    navigate('/cover-letter/ai-create');
  };
  
  const handleDeleteCoverLetter = (id: string) => {
    setCoverLetters(prev => prev.filter(letter => letter.id !== id));
    
    if (coverLetters.length <= 1) {
      localStorage.setItem('hasCoverLetters', 'false');
      setShowEmptyState(true);
    }
    
    toast.success("자기소개서가 삭제되었습니다.");
  };

  return (
    <div className="max-w-none w-[412px] h-[917px] flex flex-col items-center bg-white mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <header className="flex flex-col items-start gap-3.5 w-[346px] mt-[17px]">
        <Link to="/" className="mb-2">
          <ArrowLeft size={24} />
        </Link>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f50b1e03a1fea690ea1c5626170f7597a96442e?placeholderIfAbsent=true" 
          alt="logo" 
          className="w-[61px] h-[50px]" 
        />
        <h1 className="text-[28px] leading-10 text-black font-normal">
          <span>더 성장하는 나,</span>
          <br />
          <span>나의 관심 직무는</span>
        </h1>
        <div className="text-[28px] leading-10 text-[#4B9FF8] font-bold">
          {jobCategories.map(category => `#${category}`).join(' ')}
        </div>
        
        <div className="w-[169px] h-0 border-t-[3px] border-[#D9D9D9] border-opacity-30 mt-3.5" />
        
        <p className="text-[15px] leading-[30px] text-[#212121]">
          자기소개서를 작성해보세요.
        </p>
      </header>

      <main className="mt-[35px]">
        {showEmptyState ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 mb-10">작성된 자기소개서가 없습니다.</p>
            <div className="space-y-4 w-full max-w-md">
              <Button 
                onClick={handleCreateAICoverLetter}
                className="bg-[#FFE14D] hover:bg-[#FFD700] text-black rounded-full py-3 px-6 flex items-center w-full justify-center"
              >
                <Sparkles size={20} className="mr-2" />
                AI 자기소개서 작성하기
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {coverLetters.map(letter => (
              <Card key={letter.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">{letter.position}</div>
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
                              이 자기소개서를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
                      onClick={() => navigate(`/cover-letter/edit/${letter.id}`)}
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
                className="bg-[#FFE14D] hover:bg-[#FFD700] text-black rounded-full py-3 px-6 flex items-center w-full max-w-md justify-center"
              >
                <Sparkles size={20} className="mr-2" />
                AI 자기소개서 작성하기
              </Button>
            </div>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CoverLetter;
