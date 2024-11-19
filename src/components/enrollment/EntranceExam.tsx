import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

interface Exam {
  id: string;
  title: string;
  duration: number;
  totalQuestions: number;
  description: string;
  status: 'available' | 'completed' | 'locked';
}

export default function EntranceExam() {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, approved, rejected
  const [exams, setExams] = useState<Exam[]>([
    {
      id: '1',
      title: 'General Aptitude Test',
      duration: 120,
      totalQuestions: 100,
      description: 'This exam tests your logical reasoning, mathematical ability, and verbal comprehension.',
      status: 'locked'
    },
    {
      id: '2',
      title: 'Subject Knowledge Test',
      duration: 90,
      totalQuestions: 75,
      description: 'This exam evaluates your knowledge in your chosen field of study.',
      status: 'locked'
    }
  ]);

  // Simulate checking payment status
  useEffect(() => {
    // In a real app, this would be an API call
    const checkPaymentStatus = async () => {
      // Simulating API response
      const status = 'approved'; // This would come from your API
      setPaymentStatus(status);
      
      if (status === 'approved') {
        setExams(exams.map(exam => ({
          ...exam,
          status: 'available'
        })));
      }
    };

    checkPaymentStatus();
  }, []);

  const handleStartExam = (exam: Exam) => {
    navigate(`/exam/${exam.id}/instructions`);
  };

  if (paymentStatus === 'pending') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Payment Pending</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your exam fee payment is still under review. Please wait for approval.
          </p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'rejected') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Payment Rejected</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your exam fee payment was rejected. Please submit a new payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Entrance Examinations</h2>
        </div>

        <div className="prose max-w-none mb-8">
          <p>
            Welcome to the University Entrance Examination portal. Please read all instructions
            carefully before starting any exam. Each exam has specific time limits and cannot
            be paused once started.
          </p>
        </div>

        <div className="space-y-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className={clsx(
                'border rounded-lg p-6',
                exam.status === 'locked' ? 'bg-gray-50' : 'bg-white'
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{exam.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{exam.description}</p>
                </div>
                {exam.status === 'completed' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{exam.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span>{exam.totalQuestions} questions</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleStartExam(exam)}
                  disabled={exam.status !== 'available'}
                  className={clsx(
                    'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium',
                    exam.status === 'available'
                      ? 'text-white bg-primary hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                      : exam.status === 'completed'
                      ? 'bg-green-100 text-green-800 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  )}
                >
                  {exam.status === 'completed' ? 'Completed' : 'Start Exam'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}