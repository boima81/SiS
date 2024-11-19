import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  BookOpen,
  Settings,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import clsx from 'clsx';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  children?: Omit<MenuItem, 'icon'>[];
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const studentMenuItems: MenuItem[] = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: 'Enrollment',
      children: [
        { label: 'Entrance Exams Fees', path: '/enrollment/exam-fees' },
        { label: 'Entrance Exams', path: '/enrollment/exams' },
        { label: 'Application Fees', path: '/enrollment/application-fees' },
        { label: 'Application', path: '/enrollment/application' }
      ]
    },
    {
      icon: <ClipboardList className="w-5 h-5" />,
      label: 'Registration',
      children: [
        { label: 'Course Planning', path: '/registration/course-planning' },
        { label: 'Billing', path: '/registration/billing' },
        { label: 'Curriculum', path: '/registration/curriculum' }
      ]
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Request Transcript',
      path: '/transcript'
    }
  ];

  const adminMenuItems: MenuItem[] = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
      path: '/admin/dashboard'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'All Prospective Students',
      path: '/admin/prospective-students'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'All Enrolled Students',
      path: '/admin/enrolled-students'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Enrollment Applications',
      path: '/admin/applications'
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      label: 'Finance',
      children: [
        { label: 'Entrance Exam Fees', path: '/admin/finance/exam-fees' },
        { label: 'Application Fees', path: '/admin/finance/application-fees' },
        { label: 'Billing', path: '/admin/finance/billing' },
        { label: 'Exam Fees Management', path: '/admin/finance/exam-fees-management' },
        { label: 'Application Fees Management', path: '/admin/finance/app-fees-management' },
        { label: 'Course Fees Management', path: '/admin/finance/course-fees-management' },
        { label: 'Registration Additional Fees', path: '/admin/finance/additional-fees' },
        { label: 'Reports', path: '/admin/finance/reports' }
      ]
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Exam Management',
      children: [
        { label: 'Question Bank', path: '/admin/exams/question-bank' },
        { label: 'Exam', path: '/admin/exams/manage' },
        { label: 'Results', path: '/admin/exams/results' }
      ]
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'System Settings',
      path: '/admin/settings'
    }
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : studentMenuItems;

  const toggleSection = (label: string) => {
    setExpandedSections(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const isExpanded = expandedSections.includes(item.label);
    const isActive = location.pathname === item.path;

    return (
      <div key={item.label}>
        {item.children ? (
          <button
            onClick={() => toggleSection(item.label)}
            className={clsx(
              'w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md',
              'text-gray-100 hover:bg-gray-700',
              isExpanded && 'bg-gray-700'
            )}
          >
            <div className="flex items-center">
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        ) : (
          <Link
            to={item.path || '#'}
            className={clsx(
              'flex items-center px-4 py-2 text-sm font-medium rounded-md',
              isActive
                ? 'bg-gray-900 text-white'
                : 'text-gray-100 hover:bg-gray-700'
            )}
            onClick={() => onClose()}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </Link>
        )}

        {item.children && isExpanded && (
          <div className="ml-11 mt-1 space-y-1">
            {item.children.map(child => (
              <Link
                key={child.label}
                to={child.path || '#'}
                className={clsx(
                  'block px-4 py-2 text-sm font-medium rounded-md',
                  location.pathname === child.path
                    ? 'text-white bg-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                )}
                onClick={() => onClose()}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed top-16 bottom-0 w-64 bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="mt-5 space-y-1 px-2">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>
    </>
  );
}