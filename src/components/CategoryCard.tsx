
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  backgroundColor?: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  icon: Icon,
  backgroundColor = 'bg-app-light-blue',
  onClick,
}) => {
  return (
    <div 
      className={`${backgroundColor} p-4 rounded-lg flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity`}
      onClick={onClick}
    >
      <Icon className="text-app-blue" size={24} />
      <span className="font-medium">{title}</span>
    </div>
  );
};

export default CategoryCard;
