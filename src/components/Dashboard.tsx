import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  GraduationCap,
  Users,
  FileText,
  TrendingUp,
  Bell,
  MessageSquare
} from 'lucide-react';

const stats = [
  { label: 'Courses', value: '4', icon: BookOpen, color: 'text-blue-600' },
  { label: 'Assignments', value: '12', icon: FileText, color: 'text-indigo-600' },
  { label: 'Events', value: '3', icon: Calendar, color: 'text-purple-600' },
  { label: 'Messages', value: '5', icon: MessageSquare, color: 'text-pink-600' }
];

const activities = [
  {
    id: 1,
    title: 'Assignment Due',
    description: 'Business Case Analysis',
    date: 'Due in 2 days',
    icon: FileText,
    color: 'text-amber-600'
  },
  {
    id: 2,
    title: 'Upcoming Event',
    description: 'Career Fair 2024',
    date: 'March 15, 2024',
    icon: Calendar,
    color: 'text-blue-600'
  },
  {
    id: 3,
    title: 'New Announcement',
    description: 'Spring Break Schedule',
    date: 'Posted 2 hours ago',
    icon: Bell,
    color: 'text-purple-600'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <dt>
              <div className={`absolute rounded-lg p-3 ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.label}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
            <div className="mt-6 flow-root">
              <ul className="-mb-8">
                {activities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== activities.length - 1 ? (
                        <span
                          className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex items-start space-x-3">
                        <div className={`relative rounded-lg p-2 ${activity.color} bg-opacity-10`}>
                          <activity.icon className={`h-5 w-5 ${activity.color}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            {activity.description}
                          </p>
                          <p className="mt-2 text-xs text-gray-400">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">Quick Actions</h2>
            <div className="mt-6 grid grid-cols-1 gap-4">
              <Link
                to="/courses"
                className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50"
              >
                <div className="rounded-lg bg-blue-600/10 p-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">View Courses</p>
                  <p className="text-sm text-gray-500">Access your current courses</p>
                </div>
              </Link>
              <Link
                to="/assignments"
                className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50"
              >
                <div className="rounded-lg bg-indigo-600/10 p-2">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Assignments</p>
                  <p className="text-sm text-gray-500">View pending assignments</p>
                </div>
              </Link>
              <Link
                to="/calendar"
                className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-gray-50"
              >
                <div className="rounded-lg bg-purple-600/10 p-2">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Calendar</p>
                  <p className="text-sm text-gray-500">Check upcoming events</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}