import { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2 } from 'lucide-react';
import Table from '../../Table';

interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'essay' | 'true_false';
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
}

export default function QuestionBank() {
  const [questions] = useState<Question[]>([
    {
      id: '1',
      question: 'What is the capital of France?',
      type: 'multiple_choice',
      subject: 'Geography',
      difficulty: 'easy',
      createdAt: '2024-03-01'
    },
    // Add more sample questions
  ]);

  const columns = [
    { 
      key: 'question',
      header: 'Question',
      render: (value: string) => (
        <div className="max-w-md truncate">{value}</div>
      )
    },
    { 
      key: 'type',
      header: 'Type',
      render: (value: string) => (
        <span className="capitalize">{value.replace('_', ' ')}</span>
      )
    },
    { key: 'subject', header: 'Subject' },
    {
      key: 'difficulty',
      header: 'Difficulty',
      render: (value: string) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${
              value === 'easy'
                ? 'bg-green-100 text-green-800'
                : value === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}
        >
          {value}
        </span>
      ),
    },
    { key: 'createdAt', header: 'Created At' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row: Question) => (
        <div className="flex items-center space-x-2">
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
          <h1 className="text-xl font-semibold text-gray-900">Question Bank</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage examination questions and answers.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <Table columns={columns} data={questions} />
      </div>
    </div>
  );
}