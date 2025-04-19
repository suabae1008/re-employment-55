
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
      activeIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/9094916cee54a5a42f9ac69646c4477bda6b547b?placeholderIfAbsent=true",
      inactiveIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/82944890bae6f44e37a096d79a02f8a7c16e86e6?placeholderIfAbsent=true"
    },
    {
      path: '/cover-letter',
      label: '자기소개서',
      activeIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/63ca21358c20967f240b8652e02c8e19a4490889?placeholderIfAbsent=true",
      inactiveIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/04b0ce064fdd8e73ac4a1b375a65b8bdd63f66e8?placeholderIfAbsent=true"
    },
    {
      path: '/resume',
      label: '이력서',
      activeIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/3e15976ce7d6a0654fd074c74d016c895777c838?placeholderIfAbsent=true",
      inactiveIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/82fa7bfcb69a0d9dec7c099bf2267640d27d0d2e?placeholderIfAbsent=true"
    },
    {
      path: '/profile',
      label: '내 정보',
      activeIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/4ad13807fda677fec2d16450af2a883297572cad?placeholderIfAbsent=true",
      inactiveIcon: "https://cdn.builder.io/api/v1/image/assets/082d62779b2d409c8433b3897df90f5e/2401eb6ca9effa7cadc1231ff4591712cd76d071?placeholderIfAbsent=true"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[rgba(252,252,252,1)] border-t border-[rgba(217,217,217,1)] py-3 px-4 flex justify-between items-center max-w-lg mx-auto z-50">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={`flex flex-col items-center flex-1 min-w-0 transition-colors ${
            path === item.path ? 'text-[#4B9FF8]' : 'text-[#888888] hover:text-[#4B9FF8]'
          }`}
        >
          <img 
            src={path === item.path ? item.activeIcon : item.inactiveIcon}
            className="w-[42px] h-[42px] object-contain transition-transform hover:scale-105"
            alt={item.label}
          />
          <span className="text-sm mt-[5px] whitespace-nowrap">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
