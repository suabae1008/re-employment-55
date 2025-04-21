import React from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  subText?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onRefresh,
  refreshing,
  subText,
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white py-4 px-4 border-b">
      <div className="flex justify-center mb-6">
        <Link to="/">
          <img src="/Navi-linear-logo.svg" alt="Navi Logo" className="h-6" />
        </Link>
      </div>

      {/* 뒤로가기 + 타이틀 + 리프레시 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <button onClick={onBack || (() => navigate(-1))} className="mr-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>

        {onRefresh ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            disabled={refreshing}
          >
            <RefreshCw size={20} className={refreshing ? "animate-spin" : ""} />
          </Button>
        ) : (
          <div className="w-6" /> // 버튼 없을 때 공간 유지용
        )}
      </div>

      {subText && <div className="text-center text-gray-500">{subText}</div>}
    </header>
  );
};

export default Header;
