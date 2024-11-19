import { useState } from 'react';
import Table from '../Table';

interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
}

export default function EnrolledStudents() {
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Jane Smith',
      email: 'jane@example.com',
      program: 'Computer Science',
      enrollmentDate: '2024-01-15',
      status: 'active'
    },
    // Add more sample data as needed
  ]);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'program', header: 'Program' },
    { key: 'enrollmentDate', header: 'Enrollment Date' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${
              value === 'active'
                ? 'bg-green-100 text-green-800'
                : value === 'inactive'
                ? 'bg-gray-100 text-gray-800'
                : value === 'graduated'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-red-100 text-red-800'
            }`}
        >
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Enrolled Students</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all students currently enrolled in various programs.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <Table columns={columns} data={students} />
      </div>
    </div>
  );
}