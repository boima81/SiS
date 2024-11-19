import { useState } from 'react';
import Table from '../Table';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
}

export default function ProspectiveStudents() {
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      registrationDate: '2024-03-01',
      status: 'pending'
    },
    // Add more sample data as needed
  ]);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'registrationDate', header: 'Registration Date' },
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
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Prospective Students</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all prospective students who have registered but haven't submitted an application.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <Table columns={columns} data={students} />
      </div>
    </div>
  );
}