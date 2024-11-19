import { useState } from 'react';
import { BookOpen, Plus, Edit, Eye, Trash2 } from 'lucide-react';
import Table from '../../Table';

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  totalQuestions: number;
  passingScore: number;
  status: 'draft' | 'published' | 'archived';
  startDate: string;
}

export default function ExamManagement() {
  const [exams] = useState<Exam[]>([
    {
      id: '1',
      title: 'General Aptitude Test',
      subject: 'General Knowledge',
      duration: 120,
      totalQuestions: 100,
      passingScore: 70,
      status: 'published',
      startDate: '2024-03-15'
    },
    // Add more sample exams
  ]);

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'subject', header: 'Subject' },
    { 
      key: 'duration',
      header: 'Duration',
      render: (value: number) => `${value} minutes`
    },
    { key: 'totalQuestions', header: 'Questions' },
    { 
      key: 'passingScore',
      header: 'Passing Score',
      render: (value: number) => `${value}%`
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${
              value === 'published'
                ? 'bg-green-100 text-green-800'
                : value === 'draft'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}
        >
          {value}
        </span>
      ),
    },
    { key: 'startDate', header: 'Start Date' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row: Exam) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {/* Handle view */}}
            className="text-gray-600 hover:text-gray-900"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Handle edit */}}
            className="text-blue-600 hover:text-blue-900"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Handle delete */}}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Exam Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage entrance examinations.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Exam
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <Table columns={columns} data={exams} />
      </div>
    </div>
  );
}