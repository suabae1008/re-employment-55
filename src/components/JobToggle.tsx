
import React from 'react';
import { Sparkles, List } from 'lucide-react';

interface JobToggleProps {
  activeTab: 'recommended' | 'all';
  setActiveTab: (tab: 'recommended' | 'all') => void;
}

const JobToggle: React.FC<JobToggleProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-2 mx-auto max-w-xl my-4">
      <button
        onClick={() => setActiveTab('recommended')}
        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium ${
          activeTab === 'recommended'
            ? 'bg-app-blue text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        <Sparkles size={16} />
        <span>추천 구직 공고</span>
      </button>
      <button
        onClick={() => setActiveTab('all')}
        className={`flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium ${
          activeTab === 'all'
            ? 'bg-app-blue text-white'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        <List size={16} />
        <span>전체 구직 공고</span>
      </button>
    </div>
  );
};

export default JobToggle;
