import { useState } from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  ClipboardList,
  FileText,
  ChevronDown
} from 'lucide-react';
import clsx from 'clsx';

interface MenuItem {
  name: string;
  icon?: React.ReactNode;
  href: string;
  children?: MenuItem[];
}

export default function StudentSidebar() {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: '/dashboard'
    },
    {
      name: 'Enrollment',
      icon: <GraduationCap className="h-5 w-5" />,
      href: '#',
      children: [
        { name: 'Entrance Exams Fees', href: '/enrollment/exam-fees' },
        { name: 'Entrance Exams', href: '/enrollment/exams' },
        { name: 'Application Fees', href: '/enrollment/application-fees' },
        { name: 'Application', href: '/enrollment/application' }
      ]
    },
    {
      name: 'Registration',
      icon: <ClipboardList className="h-5 w-5" />,
      href: '#',
      children: [
        { name: 'Course Planning', href: '/registration/course-planning' },
        { name: 'Billing', href: '/registration/billing' },
        { name: 'Curriculum', href: '/registration/curriculum' }
      ]
    },
    {
      name: 'Request Transcript',
      icon: <FileText className="h-5 w-5" />,
      href: '/transcript'
    }
  ];

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => 
      prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const renderMenuItem = (item: MenuItem) => {
    const isOpen = openMenus.includes(item.name);

    return (
      <div key={item.name}>
        <button
          onClick={() => item.children && toggleMenu(item.name)}
          className={clsx(
            'w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md',
            'hover:bg-gray-700 hover:text-white',
            'focus:outline-none focus:ring-2 focus:ring-gray-500',
            item.children ? 'text-gray-300' : 'text-gray-100'
          )}
        >
          <div className="flex items-center">
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </div>
          {item.children && (
            <ChevronDown
              className={clsx(
                'ml-auto h-5 w-5 transform transition-transform duration-200',
                isOpen ? 'rotate-180' : ''
              )}
            />
          )}
        </button>

        {item.children && isOpen && (
          <div className="mt-1 space-y-1 pl-11">
            {item.children.map(child => (
              <a
                key={child.name}
                href={child.href}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
              >
                {child.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-800 w-64 fixed left-0 top-16">
      <nav className="mt-5 space-y-1 px-2">
        {menuItems.map(renderMenuItem)}
      </nav>
    </div>
  );
}