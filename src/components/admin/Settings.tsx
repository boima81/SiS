import { useState } from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'University Portal',
    contactEmail: 'admin@university.edu',
    supportPhone: '+1234567890',
    maintenanceMode: false,
    allowRegistration: true,
    examTimeLimit: 120,
    maxFileSize: 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle settings update
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">System Settings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage system-wide settings and configurations.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 bg-white shadow-sm rounded-lg p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">General Settings</h3>
            <p className="mt-1 text-sm text-gray-500">
              Basic system configuration options.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                id="contactEmail"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="supportPhone" className="block text-sm font-medium text-gray-700">
                Support Phone
              </label>
              <input
                type="text"
                name="supportPhone"
                id="supportPhone"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="examTimeLimit" className="block text-sm font-medium text-gray-700">
                Default Exam Time Limit (minutes)
              </label>
              <input
                type="number"
                name="examTimeLimit"
                id="examTimeLimit"
                value={settings.examTimeLimit}
                onChange={(e) => setSettings({ ...settings, examTimeLimit: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="maxFileSize" className="block text-sm font-medium text-gray-700">
                Max File Upload Size (MB)
              </label>
              <input
                type="number"
                name="maxFileSize"
                id="maxFileSize"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({ ...settings, maxFileSize: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                  Maintenance Mode
                </label>
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="allowRegistration"
                  id="allowRegistration"
                  checked={settings.allowRegistration}
                  onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="allowRegistration" className="ml-2 block text-sm text-gray-700">
                  Allow New Registrations
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}