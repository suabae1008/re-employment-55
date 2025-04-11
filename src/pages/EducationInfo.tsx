
import React from 'react';
import { ArrowLeft, School } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEducationData } from '../services/jobService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import BottomNavigation from '../components/BottomNavigation';

// Define the education program type
interface EducationProgram {
  id: number;
  title: string;
  provider: string;
  duration: string;
  startDate: string;
  category: string;
}

const EducationInfo = () => {
  const { data: educationPrograms, isLoading } = useQuery<EducationProgram[]>({
    queryKey: ['education'],
    queryFn: () => getEducationData(),
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">취업 준비 교육 정보</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {isLoading ? (
          <p className="text-center py-4">로딩 중...</p>
        ) : educationPrograms && educationPrograms.length > 0 ? (
          <div className="space-y-4">
            {educationPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <School className="text-app-blue mr-2" size={20} />
                    <CardTitle>{program.title}</CardTitle>
                  </div>
                  <CardDescription>{program.provider}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="font-medium">기간</p>
                      <p>{program.duration}</p>
                    </div>
                    <div>
                      <p className="font-medium">시작일</p>
                      <p>{program.startDate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-medium">분야</p>
                      <p>{program.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center py-4">교육 정보가 없습니다.</p>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default EducationInfo;
