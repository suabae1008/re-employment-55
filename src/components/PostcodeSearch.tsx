
import React from 'react';
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    daum: any;
  }
}

interface PostcodeSearchProps {
  onComplete: (data: any) => void;
}

export const PostcodeSearch: React.FC<PostcodeSearchProps> = ({ onComplete }) => {
  const handleClick = () => {
    new window.daum.Postcode({
      oncomplete: onComplete,
      width: '100%',
      height: '100%'
    }).open();
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      className="w-full h-12"
    >
      우편번호 검색
    </Button>
  );
};
