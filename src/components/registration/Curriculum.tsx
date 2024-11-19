import { useState } from 'react';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import clsx from 'clsx';

interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  semester: number;
  prerequisites: string[];
  status: 'completed' | 'in_progress' | 'available' | 'locked';
}

export default function Curriculum() {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      code: 'CS101',
      title: 'Introduction to Computer Science',
      credits: 3,
      semester: 1,
      prerequisites: [],
      status: 'completed'
    },
    {
      id: '2',
      code: 'CS201',
      title: 'Data Structures',
      credits: 4,
      semester: 2,
      prerequisites: ['CS101'],
      status: 'in_progress'
    },
    {
      id: '3',
      code: 'CS301',
      title: 'Algorithms',
      credits: 4,
      semester: 3,
      prerequisites: ['CS201'],
      status: 'locked'
    },
  ]);

  const semesters = Array.from(
    new Set(courses.map(course => course.semester))
  ).sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Program Curriculum</h1>
          <p className="mt-2 text-sm text-gray-700">
            View your program curriculum and track your progress.
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed Credits
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {courses
                      .filter(course => course.status === 'completed')
                      .reduce((sum, course) => sum + course.credits, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    In Progress
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {courses
                      .filter(course => course.status === 'in_progress')
                      .reduce((sum, course) => sum + course.credits, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Required
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {courses.reduce((sum, course) => sum + course.credits, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum by Semester */}
      <div className="space-y-8">
        {semesters.map((semester) => (
          <div key={semester} className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Semester {semester}
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <ul role="list" className="divide-y divide-gray-200">
                {courses
                  .filter(course => course.semester === semester)
                  .map((course) => (
                    <li key={course.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={clsx(
                            'flex-shrink-0 h-2.5 w-2.5 rounded-full mr-4',
                            {
                              'bg-green-600': course.status === 'completed',
                              'bg-blue-600': course.status === 'in_progress',
                              'bg-gray-600': course.status === 'available',
                              'bg-red-600': course.status === 'locked',
                            }
                          )} />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {course.code} - {course.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {course.credits} credits
                              {course.prerequisites.length > 0 && (
                                <span className="ml-2">
                                  Prerequisites: {course.prerequisites.join(', ')}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className={clsx(
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            {
                              'bg-green-100 text-green-800': course.status === 'completed',
                              'bg-blue-100 text-blue-800': course.status === 'in_progress',
                              'bg-gray-100 text-gray-800': course.status === 'available',
                              'bg-red-100 text-red-800': course.status === 'locked',
                            }
                          )}>
                            {course.status.replace('_', ' ').charAt(0).toUpperCase() + 
                             course.status.slice(1).replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}