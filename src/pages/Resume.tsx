
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, Plus, Edit2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BottomNavigation from '../components/BottomNavigation';

interface Resume {
  id: string;
  title: string;
  date: string;
  content?: string;
}

const Resume = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [showEmptyState, setShowEmptyState] = useState(true);
  const navigate = useNavigate();

  // In a real app, this would fetch from a backend
  // Here we're just simulating for the UI demonstration
  useEffect(() => {
    // Simulate checking if user has resumes
    const hasResumes = localStorage.getItem('hasResumes') === 'true';
    setShowEmptyState(!hasResumes);
    
    if (hasResumes) {
      // Mock data
      setResumes([{
        id: '1',
        title: '기본 이력서',
        date: '2025.03.26 작성',
        content: '경력 및 학력 정보...'
      }]);
    }
  }, []);

  const handleCreateResume = () => {
    // Navigate to the resume form page
    navigate('/resume/create');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">이력서</h1>
        </div>

        <div className="text-center text-gray-500 border-b pb-4">
          이력서를 작성해보세요.
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {showEmptyState ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 mb-10">작성된 이력서가 없습니다.</p>
            <Button 
              onClick={handleCreateResume}
              className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full py-3 px-6 flex items-center"
            >
              <Plus size={20} className="mr-2" />
              이력서 작성하기
            </Button>
          </div>
        ) : (
          <div>
            {resumes.map(resume => (
              <Card key={resume.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{resume.title}</h3>
                    <Button variant="ghost" size="icon">
                      <Download size={20} className="text-blue-500" />
                    </Button>
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
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Resume;
