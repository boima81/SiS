import { 
  BookOpen, 
  Calendar, 
  GraduationCap,
  DollarSign,
  TrendingUp,
  Bell,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  code: string;
  title: string;
  instructor: string;
  schedule: string;
  progress: number;
}

export default function Dashboard() {
  // Sample data - in a real app, this would come from your backend
  const academicInfo = {
    gpa: 3.75,
    totalCredits: 45,
    currentSemester: 'Spring 2024',
    standing: 'Good Standing'
  };

  const financialInfo = {
    totalBalance: 2500.00,
    dueDate: '2024-04-15',
    breakdown: {
      tuition: 2000.00,
      fees: 500.00
    }
  };

  const enrolledCourses: Course[] = [
    {
      code: 'CS301',
      title: 'Database Systems',
      instructor: 'Dr. Smith',
      schedule: 'Mon/Wed 10:00-11:30',
      progress: 75
    },
    {
      code: 'CS302',
      title: 'Software Engineering',
      instructor: 'Dr. Johnson',
      schedule: 'Tue/Thu 13:00-14:30',
      progress: 60
    },
    {
      code: 'MATH201',
      title: 'Linear Algebra',
      instructor: 'Prof. Williams',
      schedule: 'Mon/Wed 14:00-15:30',
      progress: 80
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Mid-term Schedule',
      message: 'Mid-term examinations will begin next week',
      date: 'Today'
    },
    {
      id: 2,
      title: 'Course Registration',
      message: 'Summer semester registration opens soon',
      date: '2 days ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Academic Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Current GPA</p>
                <p className="text-2xl font-semibold text-gray-900">{academicInfo.gpa}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Credits</p>
                <p className="text-2xl font-semibold text-gray-900">{academicInfo.totalCredits}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Balance Due</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${financialInfo.totalBalance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Standing</p>
                <p className="text-2xl font-semibold text-gray-900">{academicInfo.standing}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Current Courses */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Current Courses</h2>
            <div className="mt-6 flow-root">
              <ul className="divide-y divide-gray-200">
                {enrolledCourses.map((course) => (
                  <li key={course.code} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {course.code} - {course.title}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {course.instructor} • {course.schedule}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block text-primary">
                                {course.progress}% Complete
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-primary-100 mt-1">
                            <div
                              style={{ width: `${course.progress}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Financial Summary</h2>
              <Link
                to="/registration/billing"
                className="text-sm font-medium text-primary hover:text-gray-900"
              >
                View Details
              </Link>
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Payment Due</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>Balance: ${financialInfo.totalBalance.toFixed(2)}</p>
                      <p>Due Date: {financialInfo.dueDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Tuition</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${financialInfo.breakdown.tuition.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Fees</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${financialInfo.breakdown.fees.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total Balance</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${financialInfo.totalBalance.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Announcements</h2>
          <div className="mt-6 flow-root">
            <ul className="divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <li key={announcement.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Bell className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {announcement.title}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {announcement.message}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-gray-500">
                      {announcement.date}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}