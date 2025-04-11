
import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCardProps {
  id?: string | number;
  title: string;
  company: string;
  location?: string;
  imageUrl?: string;
  category?: string;
  highlight?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  imageUrl,
  category,
  highlight,
}) => {
  const cardContent = (
    <>
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        {category && (
          <div className="inline-block bg-app-light-blue text-app-blue px-3 py-1 rounded-full text-xs mb-2">
            {category}
          </div>
        )}
        {highlight && (
          <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs mb-2 ml-2">
            {highlight}
          </div>
        )}
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 mb-2">{company}</p>
        {location && (
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4 hover:shadow-lg transition-shadow">
      {id ? (
        <Link to={`/job/${id}`}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
};

export default JobCard;
