import { 
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

const stats = [
  { name: 'Total Students', value: '2,451', change: '+12%', icon: Users, color: 'text-blue-600' },
  { name: 'Applications', value: '148', change: '+24%', icon: FileText, color: 'text-indigo-600' },
  { name: 'Revenue', value: '$52,420', change: '+8.2%', icon: DollarSign, color: 'text-green-600' },
  { name: 'Exam Pass Rate', value: '85%', change: '+5.4%', icon: TrendingUp, color: 'text-purple-600' },
];

const recentApplications = [
  {
    id: 1,
    name: 'Sarah Wilson',
    program: 'Computer Science',
    status: 'pending',
    date: '2024-03-10',
  },
  {
    id: 2,
    name: 'Michael Brown',
    program: 'Business Administration',
    status: 'approved',
    date: '2024-03-09',
  },
  {
    id: 3,
    name: 'Emma Davis',
    program: 'Engineering',
    status: 'rejected',
    date: '2024-03-08',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm"
          >
            <dt>
              <div className={`absolute rounded-lg p-3 ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Applications */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">Recent Applications</h2>
            <div className="mt-6 flow-root">
              <ul className="divide-y divide-gray-200">
                {recentApplications.map((application) => (
                  <li key={application.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {application.name}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {application.program}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={clsx(
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            application.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : application.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          )}
                        >
                          {application.status}
                        </span>
                        <span className="text-xs text-gray-500">{application.date}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">Quick Stats</h2>
            <dl className="mt-6 grid grid-cols-1 gap-6">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                  <div className="ml-4">
                    <dt className="text-sm font-medium text-gray-500">Active Courses</dt>
                    <dd className="text-lg font-semibold text-gray-900">42</dd>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div className="ml-4">
                    <dt className="text-sm font-medium text-gray-500">Approved Applications</dt>
                    <dd className="text-lg font-semibold text-gray-900">89</dd>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                <div className="flex items-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <div className="ml-4">
                    <dt className="text-sm font-medium text-gray-500">Rejected Applications</dt>
                    <dd className="text-lg font-semibold text-gray-900">12</dd>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                  <div className="ml-4">
                    <dt className="text-sm font-medium text-gray-500">Pending Reviews</dt>
                    <dd className="text-lg font-semibold text-gray-900">47</dd>
                  </div>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}