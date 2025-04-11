
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "공고를 검색해주세요." }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search size={20} className="text-app-blue" />
        </div>
        <input
          type="search"
          className="w-full p-4 pl-12 text-sm border border-app-blue rounded-full focus:outline-none focus:ring-2 focus:ring-app-blue"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default SearchBar;
