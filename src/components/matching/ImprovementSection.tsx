
import React from "react";

interface Qualification {
  id: string;
  name: string;
  isMatched: boolean;
}

interface ImprovementSectionProps {
  requiredQualifications: Qualification[];
  preferredQualifications: Qualification[];
}

const ImprovementSection: React.FC<ImprovementSectionProps> = ({
  requiredQualifications,
  preferredQualifications,
}) => {
  const unmetRequired = requiredQualifications.filter(q => !q.isMatched);
  const unmetPreferred = preferredQualifications.filter(q => !q.isMatched);

  if (unmetRequired.length === 0 && unmetPreferred.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 mb-8">
      <h3 className="text-lg font-semibold mb-4">이렇게 점수를 올려요</h3>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
          {unmetRequired.map((qual) => (
            <div key={`req-${qual.id}`} className="flex-shrink-0 w-60 p-4 rounded-lg" style={{ backgroundColor: "#D3E4FD" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="font-medium">자격 사항</div>
              </div>
              <p className="text-sm">{qual.name}</p>
            </div>
          ))}
          
          {unmetPreferred.map((qual) => (
            <div key={`pref-${qual.id}`} className="flex-shrink-0 w-60 p-4 rounded-lg" style={{ backgroundColor: "#E5DEFF" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <div className="font-medium">우대 사항</div>
              </div>
              <p className="text-sm">{qual.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImprovementSection;

