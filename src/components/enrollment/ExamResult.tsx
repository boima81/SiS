import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExamResultProps {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  passingScore: number;
}

export default function ExamResult() {
  const navigate = useNavigate();
  
  // This would normally come from props
  const result = {
    score: 85,
    totalQuestions: 100,
    timeTaken: 110,
    passingScore: 70
  };

  const isPassed = result.score >= result.passingScore;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-8">
          {isPassed ? (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          ) : (
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          )}
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {isPassed ? 'Congratulations!' : 'Exam Not Passed'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isPassed
              ? 'You have successfully passed the entrance examination.'
              : 'Unfortunately, you did not meet the passing score requirement.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Score</p>
              <p className="text-lg font-semibold text-gray-900">
                {result.score}/{result.totalQuestions}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Passing Score</p>
              <p className="text-lg font-semibold text-gray-900">
                {result.passingScore}%
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <Clock className="h-6 w-6 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Time Taken</p>
              <p className="text-lg font-semibold text-gray-900">
                {result.timeTaken} minutes
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          {isPassed ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                You can now proceed with your application. The next step is to pay the application fees.
              </p>
              <button
                onClick={() => navigate('/enrollment/application-fees')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Continue to Application Fees
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                You can retake the exam after 30 days. Please review the study materials and try again.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}