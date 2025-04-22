
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import QualificationItem from "./QualificationItem";

interface Qualification {
  id: string;
  name: string;
  isMatched: boolean;
}

interface QualificationsSectionProps {
  title: string;
  qualifications: Qualification[];
}

const QualificationsSection: React.FC<QualificationsSectionProps> = ({
  title,
  qualifications,
}) => {
  return (
    <Collapsible>
      <Card>
        <CollapsibleTrigger className="w-full text-left p-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">{title}</span>
            <span className="text-sm text-gray-600">
              {qualifications.filter((q) => q.isMatched).length}개 중{" "}
              {qualifications.length}개를 만족했어요
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid gap-3 py-4">
              {qualifications.map((qual) => (
                <QualificationItem
                  key={qual.id}
                  name={qual.name}
                  isMatched={qual.isMatched}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default QualificationsSection;

