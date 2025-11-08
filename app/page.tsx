import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 px-8 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            근로환경 진단 테스트
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            KUALP x ASC 협업 프로젝트
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            간단한 설문을 통해 현재 근로 환경 및 지위를 진단해보세요.
            <br />
            질문에 답변하시면 결과를 확인하실 수 있습니다.
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                테스트 시작하기
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                약 5분 정도 소요됩니다
              </p>
            </div>

            <Link 
              href="/survey"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors text-center text-lg"
            >
              시작하기
            </Link>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
          © 2025 KUALP x ASC. All rights reserved.
        </p>
      </main>
    </div>
  );
}
