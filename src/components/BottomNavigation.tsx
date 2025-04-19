
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    {
      path: '/',
      label: '홈',
      activeIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/2c74051e64a059578f83187554113e1ae4e4b0d4?placeholderIfAbsent=true",
      inactiveIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/2c74051e64a059578f83187554113e1ae4e4b0d4?placeholderIfAbsent=true"
    },
    {
      path: '/favorites',
      label: '관심 공고',
      activeIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/82944890bae6f44e37a096d79a02f8a7c16e86e6?placeholderIfAbsent=true",
      inactiveIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/82944890bae6f44e37a096d79a02f8a7c16e86e6?placeholderIfAbsent=true"
    },
    {
      path: '/cover-letter',
      label: '자기소개서',
      activeIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/04b0ce064fdd8e73ac4a1b375a65b8bdd63f66e8?placeholderIfAbsent=true",
      inactiveIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/04b0ce064fdd8e73ac4a1b375a65b8bdd63f66e8?placeholderIfAbsent=true"
    },
    {
      path: '/resume',
      label: '이력서',
      activeIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/82fa7bfcb69a0d9dec7c099bf2267640d27d0d2e?placeholderIfAbsent=true",
      inactiveIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/82fa7bfcb69a0d9dec7c099bf2267640d27d0d2e?placeholderIfAbsent=true"
    },
    {
      path: '/profile',
      label: '내 정보',
      activeIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/2401eb6ca9effa7cadc1231ff4591712cd76d071?placeholderIfAbsent=true",
      inactiveIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/2401eb6ca9effa7cadc1231ff4591712cd76d071?placeholderIfAbsent=true"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[rgba(252,252,252,1)] border-t border-[rgba(217,217,217,1)] py-3 px-4 flex justify-between items-center max-w-lg mx-auto z-50">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={`flex flex-col items-center flex-1 min-w-0 ${path === item.path ? 'text-[rgba(75,159,248,1)]' : 'text-[rgba(136,136,136,1)]'}`}
        >
          <img 
            src={path === item.path ? item.activeIcon : item.inactiveIcon}
            className="w-[42px] h-[42px] object-contain"
            alt={item.label}
          />
          <span className="text-sm mt-[5px]">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
