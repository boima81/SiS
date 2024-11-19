import { useState } from 'react';
import Table from '../../Table';
import { DollarSign, Download, CheckCircle, XCircle } from 'lucide-react';

interface Bill {
  id: string;
  studentName: string;
  email: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
}

export default function BillingManagement() {
  const [bills] = useState<Bill[]>([
    {
      id: '1',
      studentName: 'Alice Johnson',
      email: 'alice@example.com',
      totalAmount: 5000.00,
      paidAmount: 2500.00,
      dueDate: '2024-04-01',
      status: 'partial'
    },
    // Add more sample data as needed
  ]);

  const columns = [
    { key: 'studentName', header: 'Student Name' },
    { key: 'email', header: 'Email' },
    { 
      key: 'totalAmount', 
      header: 'Total Amount',
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { 
      key: 'paidAmount', 
      header: 'Paid Amount',
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { key: 'dueDate', header: 'Due Date' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${
              value === 'paid'
                ? 'bg-green-100 text-green-800'
                : value === 'overdue'
                ? 'bg-red-100 text-red-800'
                : value === 'partial'
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
      render: (_, row: Bill) => (
        <div className="flex items-center space-x-2">
          <button
            className="text-primary hover:text-gray-900"
            onClick={() => {/* Handle view details */}}
          >
            View Details
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Billing Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage student billing and payments.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Generate Bills
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <Table columns={columns} data={bills} />
      </div>
    </div>
  );
}