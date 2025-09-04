import React, { useState } from 'react';
import { Job, Application } from '../../types';
import { MapPin, Calendar, Clock, CheckCircle, XCircle, Eye, User } from 'lucide-react';

interface WorkerDashboardProps {
  user: any;
  onNavigate?: (page: string) => void;
}

const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ user, onNavigate }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Mock jobs data
  const availableJobs: Job[] = [
    {
      id: '1',
      title: 'Wedding Event Staff',
      description: 'Looking for experienced event staff for a wedding celebration. Responsibilities include guest coordination, setup assistance, and general event support.',
      type: 'weddings',
      location: 'Mumbai, Maharashtra',
      datetime: '2024-12-25T18:00',
      recruiter: 'Wedding Planners Co.',
      canRehire: true,
      wages: {
        amount: 1500,
        currency: 'INR',
        period: 'daily'
      }
    },
    {
      id: '2',
      title: 'Corporate Function Helper',
      description: 'Need reliable staff for corporate annual function. Tasks include registration desk, crowd management, and logistics support.',
      type: 'corporate',
      location: 'Delhi, NCR',
      datetime: '2024-12-30T14:00',
      recruiter: 'Corporate Events Ltd.',
      canRehire: false,
      wages: {
        amount: 800,
        currency: 'INR',
        period: 'hourly'
      }
    },
    {
      id: '3',
      title: 'Concert Security Staff',
      description: 'Security personnel needed for live music concert. Experience in crowd control preferred.',
      type: 'concerts',
      location: 'Bangalore, Karnataka',
      datetime: '2024-12-28T20:00',
      recruiter: 'Music Events India',
      canRehire: true,
      wages: {
        amount: 2500,
        currency: 'INR',
        period: 'event'
      }
    }
  ];

  const handleApply = (jobId: string) => {
    const existingApplication = applications.find(app => app.jobId === jobId);
    if (existingApplication) {
      alert('You have already applied for this job!');
      return;
    }

    const newApplication: Application = {
      id: Math.random().toString(),
      jobId,
      workerId: user.id,
      status: 'pending',
      appliedAt: new Date().toISOString()
    };

    setApplications([...applications, newApplication]);
    alert('Application submitted successfully!');
  };

  const getApplicationStatus = (jobId: string) => {
    return applications.find(app => app.jobId === jobId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Worker Dashboard</h1>
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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{availableJobs.length}</h3>
                <p className="text-gray-600">Available Jobs</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{applications.length}</h3>
                <p className="text-gray-600">Applications</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {applications.filter(app => app.status === 'accepted').length}
                </h3>
                <p className="text-gray-600">Jobs Accepted</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Available Jobs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Available Jobs</h2>
            </div>
            <div className="p-6">
              {availableJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No jobs available at the moment.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {availableJobs.map((job) => {
                    const application = getApplicationStatus(job.id);
                    return (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                            <p className="text-gray-600">{job.recruiter}</p>
                            <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium mt-1 capitalize">
                              {job.type.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="bg-green-100 text-green-800 px-3 py-2 rounded-lg mb-2">
                              <span className="text-lg font-bold">₹{job.wages.amount}</span>
                              <span className="text-sm">/{job.wages.period}</span>
                            </div>
                            {application && (
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(application.status)}
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(job.datetime).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                          >
                            View Details
                          </button>
                          {!application ? (
                            <button
                              onClick={() => handleApply(job.id)}
                              className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                            >
                              Apply Now
                            </button>
                          ) : (
                            <button
                              disabled
                              className="flex-1 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                            >
                              Applied
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* My Applications */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
            </div>
            <div className="p-6">
              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No applications yet. Start applying to jobs!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => {
                    const job = availableJobs.find(j => j.id === application.jobId);
                    if (!job) return null;

                    return (
                      <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{job.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{job.recruiter}</p>
                        <p className="text-gray-500 text-xs">
                          Applied on {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job Details Modal */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h3>
                  <p className="text-gray-600">{selectedJob.recruiter}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Event Type</h4>
                    <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {selectedJob.type.replace('-', ' ')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Rehire Available</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedJob.canRehire ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {selectedJob.canRehire ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 mr-2" />
                    {selectedJob.location}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Date & Time</h4>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(selectedJob.datetime).toLocaleString()}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Estimated Wages</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700 font-medium">Payment</span>
                      <span className="text-2xl font-bold text-green-800">
                        ₹{selectedJob.wages.amount}
                        <span className="text-sm font-normal">/{selectedJob.wages.period}</span>
                      </span>
                    </div>
                    <p className="text-green-600 text-sm mt-1">
                      {selectedJob.wages.period === 'hourly' && 'Paid per hour worked'}
                      {selectedJob.wages.period === 'daily' && 'Paid per day of work'}
                      {selectedJob.wages.period === 'event' && 'Fixed payment for entire event'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                  {!getApplicationStatus(selectedJob.id) ? (
                    <button
                      onClick={() => {
                        handleApply(selectedJob.id);
                        setSelectedJob(null);
                      }}
                      className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                    >
                      Apply for This Job
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-gray-300 text-gray-500 px-4 py-3 rounded-lg font-medium cursor-not-allowed"
                    >
                      Already Applied
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;