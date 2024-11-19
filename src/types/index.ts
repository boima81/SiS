export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: number;
}

export interface User {
  email: string;
  role: 'student' | 'admin';
  name: string;
}

export interface ExamFee {
  id: string;
  studentId: string;
  studentName: string;
  email: string;
  amount: number;
  receipt: File | null;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
}