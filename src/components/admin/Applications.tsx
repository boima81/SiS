import { useState } from 'react';
import Table from '../Table';
import { Eye } from 'lucide-react';

interface Application {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  program: string;
  semester: string;
  gender: string;
  submissionDate: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
}

export default function Applications() {
  const [applications] = useState<Application[]>([
    {
      id: '1',
      studentName: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1234567890',
      program: 'Business Administration',
      semester: 'Fall 2024',
      gender: 'Female',
      submissionDate: '2024-03-01',
      status: 'pending'
    },
    // Add more sample data as needed
  ]);

  const columns = [
    { key: 'studentName', header: 'Student Name' },
    { key: 'email', header: 'Email' },
    { key: 'program', header: 'Program' },
    { key: 'semester', header: 'Semester' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${
              value === 'approved'
                ? 'bg-green-100 text-green-800'
                : value === 'rejected'
                ? 'bg-red-100 text-red-800'
                : value === 'reviewing'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <button
          className="text-primary hover:text-gray-900"
          onClick={() => {/* Handle view action */}}
        >
          <Eye className="h-5 w-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Enrollment Applications</h1>
          <p className="mt-2 text-sm text-gray-700">
            Review and manage student enrollment applications.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
          >
            Add Application
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <Table columns={columns} data={applications} />
      </div>
    </div>
  );
}