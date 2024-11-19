import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function ExamInstructions() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [agreed, setAgreed] = useState(false);

  // This would normally come from an API call using examId
  const exam = {
    id: examId,
    title: 'General Aptitude Test',
    duration: 120,
    totalQuestions: 100,
    instructions: [
      'Read each question carefully before answering.',
      'You cannot pause the exam once started.',
      'Ensure you have a stable internet connection.',
      'Do not refresh the page during the exam.',
      'You can review questions before final submission.',
      'The exam will auto-submit when the time expires.',
      'Do not switch tabs or windows during the exam.',
      'Ensure you are in a quiet environment.',
    ]
  };

  const handleStartExam = () => {
    if (agreed) {
      // Navigate to the exam page in fullscreen mode
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen()
          .then(() => {
            navigate(`/exam/${examId}/take`);
          })
          .catch((err) => {
            console.error('Error attempting to enable fullscreen:', err);
          });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
          <p className="mt-2 text-sm text-gray-600">
            Please read all instructions carefully before starting the exam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <Clock className="h-6 w-6 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-900">Duration</p>
              <p className="text-lg font-semibold text-blue-600">
                {exam.duration} minutes
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-900">Total Questions</p>
              <p className="text-lg font-semibold text-purple-600">
                {exam.totalQuestions} questions
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Exam Instructions
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-3">
              {exam.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <span className="ml-3 text-sm text-gray-700">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="agreement"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
            <label htmlFor="agreement" className="ml-3 text-sm text-gray-600">
              I have read and understood all the instructions. I agree to start the exam in fullscreen mode
              and understand that leaving fullscreen may result in automatic submission.
            </label>
          </div>

          <button
            onClick={handleStartExam}
            disabled={!agreed}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
}