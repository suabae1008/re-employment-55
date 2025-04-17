
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Briefcase, PenTool } from 'lucide-react';
import { toast } from 'sonner';

interface ApplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  company: string;
  onCreateCoverLetter: () => void;
}

const ApplyDialog: React.FC<ApplyDialogProps> = ({ 
  open, 
  onOpenChange, 
  jobTitle, 
  company, 
  onCreateCoverLetter 
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success('이력서 파일이 선택되었습니다.');
    }
  };

  const handleApplyWithFile = () => {
    if (selectedFile) {
      toast.success('지원이 완료되었습니다!');
      onOpenChange(false);
    } else {
      toast.error('이력서 파일을 선택해주세요.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{jobTitle} 지원하기</DialogTitle>
          <DialogDescription>
            {company}에 지원하는 방법을 선택해주세요.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="resume">이력서 파일 업로드</Label>
            <div className="flex items-center gap-2">
              <Input 
                id="resume" 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange}
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleApplyWithFile}
              >
                제출
              </Button>
            </div>
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                선택된 파일: {selectedFile.name}
              </p>
            )}
          </div>
          
          <Separator />
          
          <div className="grid gap-2">
            <Label>AI 자기소개서 작성</Label>
            <Button 
              className="w-full" 
              onClick={onCreateCoverLetter}
            >
              <PenTool size={16} className="mr-2" />
              자기소개서 생성하기
            </Button>
            <p className="text-sm text-muted-foreground">
              AI가 도와드리는 자기소개서 작성 툴을 이용해보세요.
            </p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => onOpenChange(false)}
          >
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDialog;
