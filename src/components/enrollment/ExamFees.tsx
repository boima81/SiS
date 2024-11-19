import { useState } from 'react';
import { DollarSign, Upload, CheckCircle } from 'lucide-react';

export default function ExamFees() {
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const examFees = {
    amount: 150.00,
    bankDetails: {
      bankName: 'University Bank',
      accountNumber: '1234567890',
      accountName: 'University Exam Account',
      swiftCode: 'UNIVXX22'
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <DollarSign className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-gray-900">Entrance Exam Fees</h2>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Exam Fee Amount:</span>
            <span className="text-lg font-semibold text-primary">${examFees.amount.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Bank Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Bank Name:</p>
                <p className="font-medium">{examFees.bankDetails.bankName}</p>
              </div>
              <div>
                <p className="text-gray-600">Account Number:</p>
                <p className="font-medium">{examFees.bankDetails.accountNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Account Name:</p>
                <p className="font-medium">{examFees.bankDetails.accountName}</p>
              </div>
              <div>
                <p className="text-gray-600">Swift Code:</p>
                <p className="font-medium">{examFees.bankDetails.swiftCode}</p>
              </div>
            </div>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Payment Receipt
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="receipt" className="relative cursor-pointer rounded-md font-medium text-primary hover:text-gray-900">
                      <span>Upload a file</span>
                      <input
                        id="receipt"
                        name="receipt"
                        type="file"
                        className="sr-only"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
              {receipt && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {receipt.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!receipt || isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Payment Receipt'}
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Payment Receipt Submitted</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your payment receipt has been submitted and is pending review by the finance department.
              You will be notified once it's approved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}