export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'recruiter' | 'worker';
}

export interface Job {
  id: string;
  title: string;
  description: string;
  type: 'weddings' | 'corporate' | 'concerts' | 'college';
  location: string;
  datetime: string;
  recruiter: string;
  canRehire: boolean;
  wages: {
    amount: number;
    currency: string;
    period: 'hourly' | 'daily' | 'event';
  };
}

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}