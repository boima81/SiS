import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import StudentDashboard from './components/student/Dashboard';
import ExamFees from './components/enrollment/ExamFees';
import EntranceExam from './components/enrollment/EntranceExam';
import ExamInstructions from './components/enrollment/ExamInstructions';
import ExamQuestion from './components/enrollment/ExamQuestion';
import ExamResult from './components/enrollment/ExamResult';
import ApplicationFees from './components/enrollment/ApplicationFees';
import Application from './components/enrollment/Application';
import CoursePlanning from './components/registration/CoursePlanning';
import Billing from './components/registration/Billing';
import Curriculum from './components/registration/Curriculum';
import Transcript from './components/student/Transcript';
import { useAuth } from './context/AuthContext';

// Admin components
import AdminDashboard from './components/admin/Dashboard';
import ProspectiveStudents from './components/admin/ProspectiveStudents';
import EnrolledStudents from './components/admin/EnrolledStudents';
import Applications from './components/admin/Applications';
import ExamFeesManagement from './components/admin/finance/ExamFeesManagement';
import ApplicationFeesManagement from './components/admin/finance/ApplicationFeesManagement';
import BillingManagement from './components/admin/finance/BillingManagement';
import Reports from './components/admin/finance/Reports';
import QuestionBank from './components/admin/exams/QuestionBank';
import ExamManagement from './components/admin/exams/ExamManagement';
import Results from './components/admin/exams/Results';
import Settings from './components/admin/Settings';

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user?.role || '')) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        {/* Student Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute roles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/enrollment/exam-fees" element={
          <ProtectedRoute roles={['student']}>
            <ExamFees />
          </ProtectedRoute>
        } />
        <Route path="/enrollment/exams" element={
          <ProtectedRoute roles={['student']}>
            <EntranceExam />
          </ProtectedRoute>
        } />
        <Route path="/exam/:examId/instructions" element={
          <ProtectedRoute roles={['student']}>
            <ExamInstructions />
          </ProtectedRoute>
        } />
        <Route path="/exam/:examId/take" element={
          <ProtectedRoute roles={['student']}>
            <ExamQuestion />
          </ProtectedRoute>
        } />
        <Route path="/exam/:examId/result" element={
          <ProtectedRoute roles={['student']}>
            <ExamResult />
          </ProtectedRoute>
        } />
        <Route path="/enrollment/application-fees" element={
          <ProtectedRoute roles={['student']}>
            <ApplicationFees />
          </ProtectedRoute>
        } />
        <Route path="/enrollment/application" element={
          <ProtectedRoute roles={['student']}>
            <Application />
          </ProtectedRoute>
        } />
        <Route path="/registration/course-planning" element={
          <ProtectedRoute roles={['student']}>
            <CoursePlanning />
          </ProtectedRoute>
        } />
        <Route path="/registration/billing" element={
          <ProtectedRoute roles={['student']}>
            <Billing />
          </ProtectedRoute>
        } />
        <Route path="/registration/curriculum" element={
          <ProtectedRoute roles={['student']}>
            <Curriculum />
          </ProtectedRoute>
        } />
        <Route path="/transcript" element={
          <ProtectedRoute roles={['student']}>
            <Transcript />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/prospective-students" element={
          <ProtectedRoute roles={['admin']}>
            <ProspectiveStudents />
          </ProtectedRoute>
        } />
        <Route path="/admin/enrolled-students" element={
          <ProtectedRoute roles={['admin']}>
            <EnrolledStudents />
          </ProtectedRoute>
        } />
        <Route path="/admin/applications" element={
          <ProtectedRoute roles={['admin']}>
            <Applications />
          </ProtectedRoute>
        } />
        <Route path="/admin/finance/exam-fees-management" element={
          <ProtectedRoute roles={['admin']}>
            <ExamFeesManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/finance/app-fees-management" element={
          <ProtectedRoute roles={['admin']}>
            <ApplicationFeesManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/finance/billing" element={
          <ProtectedRoute roles={['admin']}>
            <BillingManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/finance/reports" element={
          <ProtectedRoute roles={['admin']}>
            <Reports />
          </ProtectedRoute>
        } />
        <Route path="/admin/exams/question-bank" element={
          <ProtectedRoute roles={['admin']}>
            <QuestionBank />
          </ProtectedRoute>
        } />
        <Route path="/admin/exams/manage" element={
          <ProtectedRoute roles={['admin']}>
            <ExamManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/exams/results" element={
          <ProtectedRoute roles={['admin']}>
            <Results />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute roles={['admin']}>
            <Settings />
          </ProtectedRoute>
        } />

        {/* Default redirect */}
        <Route path="*" element={
          <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} />
        } />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}