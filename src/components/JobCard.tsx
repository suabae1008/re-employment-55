
import React from 'react';
import { MapPin, Calendar, Briefcase, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface JobCardProps {
  id?: string | number;
  title: string;
  company: string;
  location?: string;
  imageUrl?: string;
  category?: string;
  highlight?: string;
  onClick?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  imageUrl,
  category,
  highlight,
  onClick,
}) => {
  const navigate = useNavigate();
  
  // Generate a pastel background color based on the company name
  const generateBackgroundColor = (name: string) => {
    const colors = [
      'bg-blue-50', 'bg-indigo-50', 'bg-purple-50', 
      'bg-pink-50', 'bg-red-50', 'bg-orange-50',
      'bg-amber-50', 'bg-yellow-50', 'bg-lime-50',
      'bg-green-50', 'bg-emerald-50', 'bg-teal-50',
      'bg-cyan-50', 'bg-sky-50'
    ];
    
    // Create a simple hash from the company name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash + name.charCodeAt(i)) % colors.length;
    }
    
    return colors[hash];
  };
  
  const bgColor = generateBackgroundColor(company);
  
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (id) {
      navigate(`/job/${id}`);
    }
  };
  
  const cardContent = (
    <>
      <div className={`p-5 ${imageUrl ? '' : bgColor} rounded-t-lg`}>
        {imageUrl ? (
          <div className="w-full h-32 overflow-hidden rounded-t-lg mb-3">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-12 flex items-center">
            <Briefcase className="text-gray-500 mr-2" size={18} />
            <span className="text-gray-700 font-medium">{company}</span>
          </div>
        )}
        <div className="space-y-2">
          <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
          
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {category && (
              <div className="inline-flex items-center bg-app-light-blue text-app-blue px-2 py-1 rounded-full text-xs">
                {category}
              </div>
            )}
            {highlight && (
              <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                {highlight}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-3 border-t border-gray-100 rounded-b-lg">
        <div className="flex flex-col gap-1.5">
          {location && (
            <div className="flex items-center text-gray-500 text-xs">
              <MapPin size={14} className="mr-1 flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar size={14} className="mr-1 flex-shrink-0" />
            <span>마감 {new Date().toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer animate-fade-in"
      onClick={handleCardClick}
    >
      {cardContent}
    </div>
  );
};

export default JobCard;
