import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Check, DollarSign } from 'lucide-react';
import Table from '../Table';

interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  schedule: string;
  instructor: string;
  capacity: number;
  enrolled: number;
  pricePerCredit: number;
}

export default function CoursePlanning() {
  const navigate = useNavigate();
  const [courses] = useState<Course[]>([
    {
      id: '1',
      code: 'CS101',
      title: 'Introduction to Computer Science',
      credits: 3,
      schedule: 'Mon/Wed 10:00-11:30',
      instructor: 'Dr. Smith',
      capacity: 30,
      enrolled: 25,
      pricePerCredit: 350.00
    },
    {
      id: '2',
      code: 'MATH201',
      title: 'Calculus I',
      credits: 4,
      schedule: 'Tue/Thu 09:00-10:30',
      instructor: 'Dr. Johnson',
      capacity: 35,
      enrolled: 30,
      pricePerCredit: 350.00
    },
  ]);

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const calculateTotalPrice = (course: Course) => {
    return course.credits * course.pricePerCredit;
  };

  const handleContinueToBilling = () => {
    navigate('/registration/billing');
  };

  const columns = [
    { 
      key: 'course',
      header: 'Course',
      render: (_: any, row: Course) => (
        <div>
          <div className="font-medium text-gray-900">{row.code}</div>
          <div className="text-sm text-gray-500">{row.title}</div>
        </div>
      )
    },
    {
      key: 'details',
      header: 'Details',
      render: (_: any, row: Course) => (
        <div className="space-y-1 text-sm">
          <div className="text-gray-900">{row.schedule}</div>
          <div className="text-gray-500">{row.instructor}</div>
        </div>
      )
    },
    {
      key: 'pricing',
      header: 'Price',
      render: (_: any, row: Course) => (
        <div className="space-y-1">
          <div className="text-sm text-gray-500">
            {row.credits} credits × ${row.pricePerCredit}
          </div>
          <div className="font-medium text-gray-900">
            ${calculateTotalPrice(row).toFixed(2)}
          </div>
        </div>
      ),
    },
    {
      key: 'availability',
      header: 'Status',
      render: (_: any, row: Course) => (
        <div className="flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${row.enrolled < row.capacity ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {row.enrolled}/{row.capacity}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (_: any, row: Course) => (
        <button
          onClick={() => handleCourseSelect(row.id)}
          className={`inline-flex items-center px-2.5 py-1.5 border rounded-md text-sm font-medium
            ${selectedCourses.includes(row.id)
              ? 'border-primary text-primary bg-primary/5 hover:bg-primary/10'
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
        >
          {selectedCourses.includes(row.id) ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Selected
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Select
            </>
          )}
        </button>
      ),
    },
  ];

  const selectedCoursesDetails = courses.filter(course => selectedCourses.includes(course.id));
  const totalCredits = selectedCoursesDetails.reduce((sum, course) => sum + course.credits, 0);
  const totalAmount = selectedCoursesDetails.reduce((sum, course) => sum + calculateTotalPrice(course), 0);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Course Planning</h1>
          <p className="mt-2 text-sm text-gray-700">
            Select courses for the upcoming semester.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleContinueToBilling}
            disabled={selectedCourses.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Continue to Billing
          </button>
        </div>
      </div>

      {/* Selected Courses Summary */}
      {selectedCourses.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <BookOpen className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Selected Courses ({selectedCourses.length})
              </h3>
              <div className="mt-2 space-y-1 text-sm text-blue-700">
                <p>Total Credits: {totalCredits}</p>
                <p className="font-medium">Total Amount: ${totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg">
        <Table columns={columns} data={courses} />
      </div>
    </div>
  );
}