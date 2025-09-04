import { User } from '../types';

export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('jobby-user');
  return stored ? JSON.parse(stored) : null;
};

export const setStoredUser = (user: User): void => {
  localStorage.setItem('jobby-user', JSON.stringify(user));
};

export const removeStoredUser = (): void => {
  localStorage.removeItem('jobby-user');
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const validateAadhar = (aadhar: string): boolean => {
  return /^\d{12}$/.test(aadhar);
};