import React, { useState } from 'react';
import { Job } from '../../types';
import { Plus, MapPin, Calendar, Users, User } from 'lucide-react';

interface RecruiterDashboardProps {
  user: any;
  onNavigate?: (page: string) => void;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ user, onNavigate }) => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    type: 'weddings' as 'weddings' | 'corporate' | 'concerts' | 'college',
    location: '',
    datetime: '',
    canRehire: false,
    wages: {
      amount: 0,
      currency: 'INR',
      period: 'daily' as 'hourly' | 'daily' | 'event'
    }
  });

  const eventTypes = [
    { value: 'weddings', label: 'Weddings' },
    { value: 'corporate', label: 'Corporate Functions' },
    { value: 'concerts', label: 'Concerts' },
    { value: 'college', label: 'College Fests' }
  ];

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Math.random().toString(),
      ...jobForm,
      recruiter: user.name
    };
    setJobs([...jobs, newJob]);
    setShowJobForm(false);
    setJobForm({
      title: '',
      description: '',
      type: 'weddings',
      location: '',
      datetime: '',
      canRehire: false,
      wages: {
        amount: 0,
        currency: 'INR',
        period: 'daily'
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (name.startsWith('wages.')) {
      const wageField = name.split('.')[1];
      setJobForm({
        ...jobForm,
        wages: {
          ...jobForm.wages,
          [wageField]: wageField === 'amount' ? parseFloat(value) || 0 : value
        }
      });
    } else {
      setJobForm({
        ...jobForm,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      });
    }
  };

  return (
    <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('profile')}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center"
            >
              <User className="h-5 w-5 mr-2" />
              View Profile
            </button>
          </div>
        </div>

        {/* Event Types Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Types We Cover</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventTypes.map((type, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md border border-orange-100">
                <h3 className="font-medium text-gray-900">{type.label}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{jobs.length}</h3>
                <p className="text-gray-600">Active Jobs</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">0</h3>
                <p className="text-gray-600">Applications</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">0</h3>
                <p className="text-gray-600">Hired Workers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Management */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Your Job Posts</h2>
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Post New Job
              </button>
            </div>
          </div>

          <div className="p-6">
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No jobs posted yet. Create your first job posting!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600 capitalize">{job.type.replace('-', ' ')}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(job.datetime).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 font-semibold">
                          ₹{job.wages.amount}/{job.wages.period}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Job Form Modal */}
        {showJobForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 max-h-screen overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Post New Job</h3>

              <form onSubmit={handleJobSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={jobForm.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="e.g., Event Staff for Wedding"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    value={jobForm.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Describe the job requirements and responsibilities"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="type"
                    required
                    value={jobForm.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={jobForm.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Event location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="datetime"
                    required
                    value={jobForm.datetime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wage Amount (₹) *
                    </label>
                    <input
                      type="number"
                      name="wages.amount"
                      required
                      min="0"
                      step="50"
                      value={jobForm.wages.amount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter wage amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Period *
                    </label>
                    <select
                      name="wages.period"
                      required
                      value={jobForm.wages.period}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="hourly">Per Hour</option>
                      <option value="daily">Per Day</option>
                      <option value="event">Per Event</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="canRehire"
                    checked={jobForm.canRehire}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Enable rehiring for this position
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowJobForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;