'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

// 질문 텍스트 (설문 페이지와 동일)
const questionTexts: Record<number, string> = {
  1: '하루 평균 근로 시간은 얼마나 되시나요?',
  2: '근무에 필요한 물품은 누가 제공하나요?',
  3: '근무 장소는 어떻게 정해지나요?',
  4: '업무 지시는 어떻게 받으시나요?',
  5: '급여는 어떤 방식으로 받으시나요?',
};

const optionTexts: Record<string, string> = {
  'A': '선택지 A',
  'B': '선택지 B',
  'C': '선택지 C',
  'D': '선택지 D',
};

function ResultContent() {
  const searchParams = useSearchParams();
  const answersParam = searchParams.get('answers');

  // URL 파라미터에서 답변 파싱
  const answers: Record<number, string> = {};
  if (answersParam) {
    answersParam.split(',').forEach((item) => {
      const [qId, answer] = item.split(':');
      answers[parseInt(qId)] = answer;
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <main className="w-full max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
              <svg className="w-16 h-16 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              테스트 완료!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              설문에 응답해 주셔서 감사합니다
            </p>
          </div>

          {/* 답변 결과 */}
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              📊 설문 결과
            </h2>
            
            {Object.entries(answers).map(([qId, answer]) => (
              <div 
                key={qId}
                className="border-l-4 border-indigo-600 bg-gray-50 dark:bg-gray-700 p-6 rounded-r-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    {qId}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {questionTexts[parseInt(qId)]}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full font-medium">
                        선택: {answer}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {optionTexts[answer]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 통계 정보 */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
                  {Object.keys(answers).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  응답한 질문 수
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
                  100%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  완료율
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
                  ✓
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  테스트 완료
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors text-center"
            >
              처음으로 돌아가기
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-4 px-8 rounded-xl transition-colors"
            >
              다시 테스트하기
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-8">
          © 2025 KUALP x ASC. All rights reserved.
        </p>
      </main>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
