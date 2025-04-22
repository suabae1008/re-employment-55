
import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  text: string;
}

interface QualificationQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (answers: boolean[]) => void;
}

const questions: Question[] = [
  { id: 1, text: "즉시 출근이 가능하신가요?" },
  { id: 2, text: "경력 2년 이상이신가요?" },
  { id: 3, text: "자격증을 보유하고 계신가요?" },
];

const QualificationQuestionDialog: React.FC<QualificationQuestionDialogProps> = ({
  open,
  onOpenChange,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(newAnswers);
      onOpenChange(false);
      setCurrentQuestion(0);
      setAnswers([]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            잠깐,
            <br />몇 가지를 물어볼게요
          </DialogTitle>
        </DialogHeader>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="py-6">
          <p className="text-center text-lg mb-8">
            {questions[currentQuestion].text}
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => handleAnswer(true)}
              className="w-24 h-24 rounded-2xl bg-blue-100 hover:bg-blue-200 text-blue-600"
            >
              O
            </Button>
            <Button
              onClick={() => handleAnswer(false)}
              className="w-24 h-24 rounded-2xl bg-red-100 hover:bg-red-200 text-red-600"
            >
              X
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QualificationQuestionDialog;
