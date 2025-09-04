import React, { useState, useEffect } from 'react';
import { User } from './types';
import { getStoredUser, setStoredUser, removeStoredUser } from './utils/auth';

// Components
import Header from './components/Layout/Header';
import AnimatedBackground from './components/Layout/AnimatedBackground';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Features from './components/Pages/Features';
import Contact from './components/Pages/Contact';
import Profile from './components/Pages/Profile';
import RecruiterAuth from './components/Auth/RecruiterAuth';
import WorkerAuth from './components/Auth/WorkerAuth';
import RecruiterDashboard from './components/Dashboard/RecruiterDashboard';
import WorkerDashboard from './components/Dashboard/WorkerDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Check for stored user
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      setCurrentPage(storedUser.type === 'recruiter' ? 'recruiter-dashboard' : 'worker-dashboard');
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setStoredUser(loggedInUser);
    setCurrentPage(loggedInUser.type === 'recruiter' ? 'recruiter-dashboard' : 'worker-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    removeStoredUser();
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    setStoredUser(updatedUser);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'features':
        return <Features />;
      case 'contact':
        return <Contact />;
      case 'profile':
        if (!user) {
          return <Home onNavigate={handleNavigate} />;
        }
        return (
          <Profile
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onBack={() => handleNavigate(user.type === 'recruiter' ? 'recruiter-dashboard' : 'worker-dashboard')}
          />
        );
      case 'recruiter-auth':
        return <RecruiterAuth onLogin={handleLogin} onBack={() => handleNavigate('home')} />;
      case 'worker-auth':
        return <WorkerAuth onLogin={handleLogin} onBack={() => handleNavigate('home')} />;
      case 'recruiter-dashboard':
        return <RecruiterDashboard user={user} onNavigate={handleNavigate} />;
      case 'worker-dashboard':
        return <WorkerDashboard user={user} onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Arial, sans-serif' }}>
      <AnimatedBackground />
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;