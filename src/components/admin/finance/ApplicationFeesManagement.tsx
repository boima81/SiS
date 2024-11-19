import { useState } from 'react';
import Table from '../../Table';
import { DollarSign, Download, CheckCircle, XCircle } from 'lucide-react';

interface ApplicationFee {
  id: string;
  studentName: string;
  email: string;
  amount: number;
  receiptUrl: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function ApplicationFeesManagement() {
  const [fees] = useState<ApplicationFee[]>([
    {
      id: '1',
      studentName: 'Jane Smith',
      email: 'jane@example.com',
      amount: 250.00,
      receiptUrl: '#',
      submissionDate: '2024-03-02',
      status: 'pending'
    },
    // Add more sample data as needed
  ]);

  const handleApprove = (id: string) => {
    // Handle approval logic
  };

  const handleReject = (id: string) => {
    // Handle rejection logic
  };

  const columns = [
    { key: 'studentName', header: 'Student Name' },
    { key: 'email', header: 'Email' },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { key: 'submissionDate', header: 'Submission Date' },
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
                : 'bg-yellow-100 text-yellow-800'
            }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row: ApplicationFee) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.open(row.receiptUrl, '_blank')}
            className="text-gray-600 hover:text-gray-900"
          >
            <Download className="h-5 w-5" />
          </button>
          {row.status === 'pending' && (
            <>
              <button
                onClick={() => handleApprove(row.id)}
                className="text-green-600 hover:text-green-900"
              >
                <CheckCircle className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleReject(row.id)}
                className="text-red-600 hover:text-red-900"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Application Fees Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Review and manage application fee payments.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Update Fee Amount
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <Table columns={columns} data={fees} />
      </div>
    </div>
  );
}