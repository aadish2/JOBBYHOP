import React from 'react';
import { User, Briefcase } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, user, onLogout }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <Briefcase className="h-8 w-8 text-orange-500 mr-2" />
            <span className="text-xl font-bold text-orange-600">JobbyHop</span>
          </div>

          {/* Center - Brand */}
          <div className="hidden md:flex flex-col items-center">
            <h1 className="text-lg font-bold text-gray-800">JobbyHop</h1>
            <p className="text-sm text-gray-600">Connecting Skills to Opportunity</p>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {!user && (
              <>
                <button
                  onClick={() => onNavigate('home')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === 'home' ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600'
                    }`}
                >
                  Home
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === 'about' ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600'
                    }`}
                >
                  About
                </button>
                <button
                  onClick={() => onNavigate('features')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === 'features' ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600'
                    }`}
                >
                  Features
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === 'contact' ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-orange-600'
                    }`}
                >
                  Contact
                </button>
                <button
                  onClick={() => onNavigate('recruiter-auth')}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-600 transition-colors"
                >
                  Recruiter
                </button>
                <button
                  onClick={() => onNavigate('worker-auth')}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700 transition-colors"
                >
                  Worker
                </button>
              </>
            )}

            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={() => onNavigate('profile')}
                  className="text-orange-600 hover:text-orange-700 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={onLogout}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;