
import React from "react";

interface MatchScoreGaugeProps {
  score: number;
}

const MatchScoreGauge: React.FC<MatchScoreGaugeProps> = ({ score }) => {
  // Calculate rotation angle based on score (0-100)
  // 0 score = -90 degrees, 100 score = 90 degrees
  const rotationAngle = (score / 100) * 180 - 90;
  
  // Determine color zones
  const getZoneColor = (zoneIndex: number) => {
    if (zoneIndex === 2) return "#4ADE80"; // green zone (right)
    if (zoneIndex === 1) return "#FDE047"; // yellow zone (middle)
    return "#FCA5A5"; // red zone (left)
  };

  return (
    <div className="relative w-40 h-32 mx-auto">
      {/* Semicircle gauge background */}
      <div className="relative w-full h-20 overflow-hidden">
        <div className="absolute w-full h-40 rounded-full overflow-hidden">
          {/* Left section (red) */}
          <div 
            className="absolute left-0 top-0 w-1/3 h-20 rounded-tl-full"
            style={{ backgroundColor: getZoneColor(0) }}
          />
          {/* Middle section (yellow) */}
          <div 
            className="absolute left-1/3 top-0 w-1/3 h-20"
            style={{ backgroundColor: getZoneColor(1) }}
          />
          {/* Right section (green) */}
          <div 
            className="absolute right-0 top-0 w-1/3 h-20 rounded-tr-full"
            style={{ backgroundColor: getZoneColor(2) }}
          />
        </div>
      </div>
      
      {/* Needle */}
      <div 
        className="absolute top-20 left-1/2 w-1 h-16 bg-gray-700 rounded-full origin-top"
        style={{ 
          transform: `translateX(-50%) rotate(${rotationAngle}deg)`,
          transformOrigin: 'top center',
          zIndex: 10
        }}
      >
        {/* Needle base circle */}
        <div className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-gray-700 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Score display */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <span className="text-lg font-medium">매칭 점수 {score}점</span>
      </div>
    </div>
  );
};

export default MatchScoreGauge;
