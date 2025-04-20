
import React from 'react';
import { Download, Edit2, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ResumeCardProps {
  title: string;
  date: string;
  onDelete?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  date,
  onDelete,
  onDownload,
  onEdit,
}) => {
  return (
    <Card className="w-[346px]">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex gap-2">
            {onDownload && (
              <Button variant="ghost" size="icon" onClick={onDownload}>
                <Download size={20} className="text-blue-500" />
              </Button>
            )}
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash size={20} className="text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>이력서 삭제</AlertDialogTitle>
                    <AlertDialogDescription>
                      이 이력서를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-500 hover:bg-red-600"
                      onClick={onDelete}
                    >
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500">{date}</p>
        {onEdit && (
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center"
              onClick={onEdit}
            >
              <Edit2 size={16} className="mr-1" />
              이력서 수정
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
