
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-app-yellow rounded-full"></div>
        <div className="absolute top-2 left-0 w-8 h-8 bg-app-blue rounded-full opacity-80"></div>
        <div className="absolute top-2 right-0 w-8 h-8 bg-app-blue rounded-full opacity-80"></div>
      </div>
    </Link>
  );
};

export default Logo;
