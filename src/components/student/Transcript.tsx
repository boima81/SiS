import { useState } from 'react';
import { FileText } from 'lucide-react';

export default function Transcript() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Request Transcript</h2>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-500">Transcript request functionality will be implemented soon.</p>
        </div>
      </div>
    </div>
  );
}