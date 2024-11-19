import { useState } from 'react';
import { Download } from 'lucide-react';
import Table from '../../Table';

interface ExamResult {
  id: string;
  studentName: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  completedAt: string;
  status: 'passed' | 'failed';
}

export default function Results() {
  const [results] = useState<ExamResult[]>([
    {
      id: '1',
      studentName: 'John Doe',
      examTitle: 'General Aptitude Test',
      score: 85,
      totalQuestions: 100,
      timeTaken: 110,
      completedAt: '2024-03-01',
      status: 'passed'
    },
    // Add more sample results
  ]);

  const columns = [
    { key: 'studentName', header: 'Student Name' },
    { key: 'examTitle', header: 'Exam' },
    { 
      key: 'score',
      header: 'Score',
      render: (value: number) => `${value}%`
    },
    { key: 'totalQuestions', header: 'Questions' },
    { 
      key: 'timeTaken',
      header: 'Time Taken',
      render: (value: number) => `${value} minutes`
    },
    { key: 'completedAt', header: 'Completed At' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${
              value === 'passed'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row: ExamResult) => (
        <button
          onClick={() => {/* Handle download */}}
          className="text-primary hover:text-gray-900"
        >
          <Download className="h-4 w-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Exam Results</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage student examination results.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <Table columns={columns} data={results} />
      </div>
    </div>
  );
}