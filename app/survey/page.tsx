'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// 임시 설문 데이터 (나중에 실제 질문으로 교체 가능)
const questions = [
  {
    id: 1,
    question: '하루 평균 근로 시간은 얼마나 되시나요?',
    options: [
      { id: 'A', text: '4시간 미만' },
      { id: 'B', text: '4~8시간' },
      { id: 'C', text: '8~12시간' },
      { id: 'D', text: '12시간 이상' },
    ],
  },
  {
    id: 2,
    question: '근무에 필요한 물품은 누가 제공하나요?',
    options: [
      { id: 'A', text: '회사에서 모두 제공' },
      { id: 'B', text: '일부는 회사, 일부는 본인 부담' },
      { id: 'C', text: '대부분 본인이 준비' },
      { id: 'D', text: '전부 본인이 준비' },
    ],
  },
  {
    id: 3,
    question: '근무 장소는 어떻게 정해지나요?',
    options: [
      { id: 'A', text: '회사가 지정한 장소에서만 근무' },
      { id: 'B', text: '주로 회사 지정 장소, 가끔 변경 가능' },
      { id: 'C', text: '본인이 자유롭게 선택' },
      { id: 'D', text: '매번 다른 장소에서 근무' },
    ],
  },
  {
    id: 4,
    question: '업무 지시는 어떻게 받으시나요?',
    options: [
      { id: 'A', text: '구체적이고 상세한 지시를 받음' },
      { id: 'B', text: '기본 방향만 제시받고 진행' },
      { id: 'C', text: '전적으로 본인이 결정' },
      { id: 'D', text: '특별한 지시 없이 자율적으로 진행' },
    ],
  },
  {
    id: 5,
    question: '급여는 어떤 방식으로 받으시나요?',
    options: [
      { id: 'A', text: '고정 월급' },
      { id: 'B', text: '시급제' },
      { id: 'C', text: '성과급/프로젝트별' },
      { id: 'D', text: '기타/불규칙적' },
    ],
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (optionId: string) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: optionId,
    };
    setAnswers(newAnswers);

    // 마지막 질문이면 결과 페이지로 이동
    if (currentQuestion === questions.length - 1) {
      // 답변을 URL 파라미터로 전달
      const answerString = Object.entries(newAnswers)
        .map(([qId, answer]) => `${qId}:${answer}`)
        .join(',');
      router.push(`/result?answers=${encodeURIComponent(answerString)}`);
    } else {
      // 다음 질문으로
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <main className="w-full max-w-2xl">
        {/* 진행률 표시 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>질문 {currentQuestion + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-gray-700 ${
                  answers[question.id] === option.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-gray-700'
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    answers[question.id] === option.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}>
                    {option.id}
                  </div>
                  <span className="text-lg text-gray-800 dark:text-gray-200">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 이전 버튼 */}
          {currentQuestion > 0 && (
            <button
              onClick={handlePrevious}
              className="mt-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전 질문
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
