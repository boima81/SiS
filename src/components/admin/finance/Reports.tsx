import { useState } from 'react';
import { BarChart, DollarSign, TrendingUp, Download } from 'lucide-react';

export default function Reports() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Financial Reports</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and generate financial reports.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:ring-primary focus:border-primary"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-sm text-gray-500">Chart will be implemented</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="ml-2 text-sm font-medium text-gray-900">Total Revenue</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">$52,420</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="ml-2 text-sm font-medium text-gray-900">Growth Rate</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">+12.5%</span>
            </div>
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Reports</h2>
          <div className="space-y-4">
            {[
              'Revenue Summary',
              'Fee Collections',
              'Outstanding Payments',
              'Payment History'
            ].map((report) => (
              <div
                key={report}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-900">{report}</span>
                <button
                  className="inline-flex items-center text-sm text-primary hover:text-gray-900"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}