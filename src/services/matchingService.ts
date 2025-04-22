
interface RequiredQualification {
  id: string;
  name: string;
  isMatched: boolean;
}

interface PreferredQualification {
  id: string;
  name: string;
  isMatched: boolean;
}

interface Experience {
  id: string;
  title: string;
  duration: number; // in months
  similarity: number; // 0, 10, 20, or 30
}

export interface MatchAnalysis {
  requiredScore: number;
  preferredScore: number;
  totalScore: number;
  requiredQualifications: RequiredQualification[];
  preferredQualifications: PreferredQualification[];
  experiences: Experience[];
}

// Calculate score for job matching analysis
export const calculateMatchScore = (
  requiredQualifications: RequiredQualification[],
  experiences: Experience[],
  preferredQualifications: PreferredQualification[]
): MatchAnalysis => {
  // Calculate required qualifications score (70 points max)
  const matchedRequired = requiredQualifications.filter(q => q.isMatched).length;
  const requiredScore = requiredQualifications.length > 0
    ? Math.round((matchedRequired / requiredQualifications.length) * 70)
    : 70; // If no required qualifications, give full score

  // Calculate preferred qualifications score (30 points max)
  const matchedPreferred = preferredQualifications.filter(q => q.isMatched).length;
  const preferredScore = preferredQualifications.length > 0
    ? Math.round((matchedPreferred / preferredQualifications.length) * 30)
    : 30; // If no preferred qualifications, give full score

  // Calculate total score
  const totalScore = requiredScore + preferredScore;

  return {
    requiredScore,
    preferredScore,
    totalScore,
    requiredQualifications,
    preferredQualifications,
    experiences
  };
};

// Mock data function for demonstration
export const getMockMatchAnalysis = (jobId: string | number): MatchAnalysis => {
  // In a real app, this would fetch actual user profile data and compare with job requirements
  const requiredQualifications: RequiredQualification[] = [
    { id: '1', name: '대상 운영 경험 보유자', isMatched: true },
    { id: '2', name: '대상 운영 경험 보유자', isMatched: true },
    { id: '3', name: '간호조무사 자격증', isMatched: true },
    { id: '4', name: '대상 운영 경험 보유자', isMatched: false }
  ];
  
  const experiences: Experience[] = [
    { id: '1', title: '요양보호사', duration: 36, similarity: 30 }, // 3 years, same role
    { id: '2', title: '간호조무사', duration: 9, similarity: 20 }, // 9 months, similar role
  ];
  
  const preferredQualifications: PreferredQualification[] = [
    { id: '1', name: '근처 거주자', isMatched: true },
    { id: '2', name: '대상 운영 경험 보유자', isMatched: true },
    { id: '3', name: '대상 운영 경험 보유자', isMatched: true },
    { id: '4', name: '대상 운영 경험 보유자', isMatched: false }
  ];
  
  return calculateMatchScore(requiredQualifications, experiences, preferredQualifications);
};
