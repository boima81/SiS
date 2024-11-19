import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  User, 
  FileText, 
  Target, 
  MessageSquare,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Upload,
  CheckCircle
} from 'lucide-react';
import clsx from 'clsx';

interface Step {
  id: string;
  name: string;
  icon: React.ElementType;
}

const steps: Step[] = [
  { id: 'academic', name: 'Academic Program', icon: GraduationCap },
  { id: 'personal', name: 'Personal Information', icon: User },
  { id: 'transcript', name: 'Transcript', icon: FileText },
  { id: 'goal', name: 'Goal Statement', icon: Target },
  { id: 'recommendation', name: 'Recommendation', icon: MessageSquare },
  { id: 'resume', name: 'Resume/CV', icon: Briefcase },
  { id: 'review', name: 'Review', icon: CheckCircle },
];

interface FormData {
  // Academic Program
  program: string;
  semester: string;

  // Personal Information
  profilePicture: File | null;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  countryOfResidence: string;
  cityOfResidence: string;
  nationality: string;
  dateOfBirth: string;
  nationalId: File | null;

  // Documents
  transcript: File | null;
  goalStatement: File | null;
  recommendation: File | null;
  resume: File | null;
}

const programs = [
  { value: 'cs', label: 'Computer Science' },
  { value: 'business', label: 'Business Administration' },
  { value: 'engineering', label: 'Engineering' },
];

const semesters = [
  { value: 'fall2024', label: 'Fall 2024' },
  { value: 'spring2025', label: 'Spring 2025' },
  { value: 'fall2025', label: 'Fall 2025' },
];

export default function ApplicationWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    program: '',
    semester: '',
    profilePicture: null,
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    countryOfResidence: '',
    cityOfResidence: '',
    nationality: '',
    dateOfBirth: '',
    nationalId: null,
    transcript: null,
    goalStatement: null,
    recommendation: null,
    resume: null,
  });

  const handleFileChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const FileUploadField = ({ 
    label, 
    field, 
    accept = ".pdf,.doc,.docx",
    required = true
  }: { 
    label: string; 
    field: keyof FormData; 
    accept?: string;
    required?: boolean;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {!required && <span className="text-gray-500">(Optional)</span>}
      </label>
      <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer rounded-md font-medium text-primary hover:text-gray-900">
              <span>Upload a file</span>
              <input
                type="file"
                className="sr-only"
                accept={accept}
                onChange={handleFileChange(field)}
                required={required}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            {formData[field] 
              ? `Selected: ${(formData[field] as File).name}`
              : `${accept.split(',').join(', ')} up to 10MB`
            }
          </p>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Academic Program
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Program
              </label>
              <select
                value={formData.program}
                onChange={handleInputChange('program')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              >
                <option value="">Select a program</option>
                {programs.map(program => (
                  <option key={program.value} value={program.value}>
                    {program.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expected Enrollment Semester
              </label>
              <select
                value={formData.semester}
                onChange={handleInputChange('semester')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              >
                <option value="">Select a semester</option>
                {semesters.map(semester => (
                  <option key={semester.value} value={semester.value}>
                    {semester.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 1: // Personal Information
        return (
          <div className="space-y-6">
            <FileUploadField 
              label="Profile Picture" 
              field="profilePicture" 
              accept=".jpg,.jpeg,.png"
            />
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={handleInputChange('middleName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={handleInputChange('gender')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country of Residence
                </label>
                <input
                  type="text"
                  value={formData.countryOfResidence}
                  onChange={handleInputChange('countryOfResidence')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City of Residence
                </label>
                <input
                  type="text"
                  value={formData.cityOfResidence}
                  onChange={handleInputChange('cityOfResidence')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nationality
                </label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={handleInputChange('nationality')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange('dateOfBirth')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  required
                />
              </div>
            </div>

            <FileUploadField 
              label="National ID Card" 
              field="nationalId" 
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        );

      case 2: // Transcript
        return (
          <div className="space-y-6">
            <FileUploadField 
              label="Academic Transcript" 
              field="transcript" 
              accept=".pdf"
            />
          </div>
        );

      case 3: // Goal Statement
        return (
          <div className="space-y-6">
            <FileUploadField 
              label="Goal Statement" 
              field="goalStatement" 
              accept=".pdf,.doc,.docx"
            />
          </div>
        );

      case 4: // Recommendation
        return (
          <div className="space-y-6">
            <FileUploadField 
              label="Recommendation Letter" 
              field="recommendation" 
              accept=".pdf"
            />
          </div>
        );

      case 5: // Resume/CV
        return (
          <div className="space-y-6">
            <FileUploadField 
              label="Resume/CV" 
              field="resume" 
              accept=".pdf,.doc,.docx"
              required={false}
            />
          </div>
        );

      case 6: // Review
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Academic Program</h3>
              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Program</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {programs.find(p => p.value === formData.program)?.label}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Expected Enrollment</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {semesters.find(s => s.value === formData.semester)?.label}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {`${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.gender}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {`${formData.cityOfResidence}, ${formData.countryOfResidence}`}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nationality</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.nationality}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formData.dateOfBirth}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Documents</h3>
              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                {[
                  { label: 'Profile Picture', field: 'profilePicture' },
                  { label: 'National ID', field: 'nationalId' },
                  { label: 'Transcript', field: 'transcript' },
                  { label: 'Goal Statement', field: 'goalStatement' },
                  { label: 'Recommendation', field: 'recommendation' },
                  { label: 'Resume/CV', field: 'resume' },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <dt className="text-sm font-medium text-gray-500">{label}</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formData[field as keyof FormData]
                        ? (formData[field as keyof FormData] as File).name
                        : 'Not uploaded'}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    // Handle form submission
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Steps */}
        <nav aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
            {steps.map((step, index) => (
              <li key={step.id} className="md:flex-1">
                <button
                  className={clsx(
                    'group flex w-full flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0',
                    index < currentStep
                      ? 'border-primary hover:border-gray-900'
                      : index === currentStep
                      ? 'border-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                  onClick={() => setCurrentStep(index)}
                >
                  <span className="text-sm font-medium text-primary">
                    Step {index + 1}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* Step content */}
        <div className="mt-8">{renderStepContent()}</div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </button>
          <button
            type="button"
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {currentStep === steps.length - 1 ? 'Submit Application' : 'Next'}
            {currentStep !== steps.length - 1 && (
              <ChevronRight className="h-4 w-4 ml-2" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}