import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, MicOff, Plus, Edit2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import BottomNavigation from '../components/BottomNavigation';

interface Keyword {
  id: string;
  text: string;
  selected: boolean;
  color: BadgeVariant;
}

const INITIAL_KEYWORDS: Keyword[] = [
  { id: '1', text: '위기 대처 능력', selected: false, color: "default" },
  { id: '2', text: '의사소통 능력', selected: false, color: "secondary" },
  { id: '3', text: '협업 능력', selected: false, color: "default" },
  { id: '4', text: '문제해결 능력', selected: false, color: "secondary" },
  { id: '5', text: '도전정신', selected: false, color: "outline" },
  { id: '6', text: '책임감', selected: false, color: "destructive" },
  { id: '7', text: '성실함', selected: false, color: "default" },
  { id: '8', text: '리더십', selected: false, color: "secondary" },
  { id: '9', text: '창의성', selected: false, color: "outline" },
  { id: '10', text: '전문성', selected: false, color: "destructive" },
];

const CoverLetterAIForm = () => {
  const location = useLocation();
  const jobData = location.state || {};
  
  const [company, setCompany] = useState(jobData.company || '');
  const [position, setPosition] = useState(jobData.position || '');
  const [keywords, setKeywords] = useState<Keyword[]>(INITIAL_KEYWORDS);
  const [refreshCount, setRefreshCount] = useState(0);
  const [questions, setQuestions] = useState(
    location.state?.questions || [
      '지원 동기에 대하여 말씀해주세요.',
      '관련 경험 또는 유사 활동을 말씀해주세요.',
      '직무 관련 강점에 대해 말씀해주세요.'
    ]
  );
  const [isRecording, setIsRecording] = useState(Array(3).fill(false));
  const navigate = useNavigate();
  
  const recognitionRefs = useRef<(SpeechRecognition | null)[]>([null, null, null]);
  
  const handleKeywordClick = (id: string) => {
    const selectedCount = keywords.filter(k => k.selected).length;
    
    setKeywords(prevKeywords => 
      prevKeywords.map(keyword => {
        if (keyword.id === id) {
          if (keyword.selected) {
            return { ...keyword, selected: false };
          } 
          else if (selectedCount < 3) {
            return { ...keyword, selected: true };
          }
          return keyword;
        }
        return keyword;
      })
    );
  };
  
  const handleRefreshKeywords = () => {
    if (refreshCount >= 3) {
      toast.error("키워드는 최대 3회까지만 새로고침이 가능합니다.");
      return;
    }
    
    const shuffledKeywords = [...INITIAL_KEYWORDS]
      .sort(() => Math.random() - 0.5)
      .map((keyword, index) => {
        const colors: Array<"default" | "secondary" | "outline" | "destructive"> = ["default", "secondary", "outline", "destructive"];
        return { 
          ...keyword, 
          selected: false,
          color: colors[index % colors.length] 
        };
      });
    
    setKeywords(shuffledKeywords);
    setRefreshCount(prev => prev + 1);
    toast.success(`키워드 새로고침 (${refreshCount + 1}/3)`);
  };
  
  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };
  
  const toggleRecording = (index: number) => {
    stopAllRecordings();
    
    const newRecordingState = Array(3).fill(false);
    
    if (!isRecording[index]) {
      newRecordingState[index] = true;
      startRecording(index);
    }
    
    setIsRecording(newRecordingState);
  };
  
  const startRecording = (index: number) => {
    try {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognitionAPI) {
        toast.error("음성 인식이 지원되지 않는 브라우저입니다.");
        return;
      }
      
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'ko-KR';
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        handleQuestionChange(index, transcript);
      };
      
      recognition.onend = () => {
        setIsRecording(prev => {
          const newState = [...prev];
          newState[index] = false;
          return newState;
        });
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        toast.error(`음성 인식 오류: ${event.error}`);
        setIsRecording(prev => {
          const newState = [...prev];
          newState[index] = false;
          return newState;
        });
      };
      
      recognition.start();
      recognitionRefs.current[index] = recognition;
      toast.success("음성 인식을 시작합니다. 말씀해주세요.");
    } catch (error) {
      console.error('Speech recognition error:', error);
      toast.error("음성 인식 시작 중 오류가 발생했습니다.");
      setIsRecording(prev => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
    }
  };
  
  const stopAllRecordings = () => {
    recognitionRefs.current.forEach((recognition, index) => {
      if (recognition) {
        recognition.stop();
        recognitionRefs.current[index] = null;
      }
    });
  };
  
  const handleGenerateCoverLetter = () => {
    if (!company.trim()) {
      toast.error("회사명을 입력해주세요.");
      return;
    }
    
    if (!position.trim()) {
      toast.error("채용 직무를 입력해주세요.");
      return;
    }
    
    if (!questions[0].trim() && !questions[1].trim() && !questions[2].trim()) {
      toast.error("적어도 하나의 질문을 입력해주세요.");
      return;
    }
    
    const selectedKeywords = keywords
      .filter(k => k.selected)
      .map(k => k.text);
      
    if (selectedKeywords.length === 0) {
      toast.error("강조하고 싶은 단어를 선택해주세요.");
      return;
    }
    
    toast.success("자기소개서 생성 중입니다...");
    
    setTimeout(() => {
      localStorage.setItem('hasCoverLetters', 'true');
      navigate('/cover-letter');
    }, 2000);
  };
  
  const handleEditQuestions = () => {
    navigate('/cover-letter/questions/edit', { state: { questions } });
  };

  React.useEffect(() => {
    return () => {
      stopAllRecordings();
    };
  }, []);
  
  const questionPlaceholders = [
    "지원 동기에 대하여 말씀해주세요.",
    "관련 경험 또는 유사 활동을 말씀해주세요.",
    "직무 관련 강점에 대해 말씀해주세요."
  ];
  
  return (
    <div className="max-w-none w-[412px] h-[917px] flex flex-col items-center bg-white mx-auto max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <header className="w-full bg-white px-4 pt-4">
        <Link to="/cover-letter" className="mb-4 block">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex flex-col items-start max-w-[351px] mx-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f50b1e03a1fea690ea1c5626170f7597a96442e?placeholderIfAbsent=true"
            alt="NAVI logo"
            className="w-[61px] h-[50px]"
          />
          <div className="text-2xl font-normal mt-[53px] mb-6">
            <div>자기소개서에 강점 쏙!</div>
            <div>NAVI가 도와드릴게요</div>
          </div>
          <Progress value={33} className="w-full h-1 mb-6" />
        </div>
      </header>

      <main className="w-full px-4 flex-1 overflow-y-auto">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block">회사명</label>
                <Input 
                  placeholder="회사명을 입력하세요" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 block">채용 직무</label>
                <Input 
                  placeholder="채용 직무 내용" 
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4 text-center">
            강조하고 싶은 단어를 선택해주세요.(최대 3개)
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <Badge
                key={keyword.id}
                variant={keyword.selected ? "default" : keyword.color}
                className={`text-sm py-1 px-3 cursor-pointer transition-colors ${
                  keyword.selected 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleKeywordClick(keyword.id)}
              >
                {keyword.text}
              </Badge>
            ))}
          </div>
          <div className="text-right text-xs text-red-500 mt-2">
            {refreshCount}/3
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm text-gray-600">{question}</h3>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="간단하게 50자 이내로 입력"
                    value={question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    maxLength={50}
                    className="resize-none pr-10"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className={isRecording[index] ? "bg-red-100" : ""}
                    onClick={() => toggleRecording(index)}
                  >
                    {isRecording[index] ? (
                      <MicOff size={20} className="text-red-500" />
                    ) : (
                      <Mic size={20} className="text-blue-500" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 mt-8 mb-20">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleEditQuestions}
          >
            질문 수정
          </Button>
          <Button
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={handleGenerateCoverLetter}
          >
            자기소개서 생성
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CoverLetterAIForm;
