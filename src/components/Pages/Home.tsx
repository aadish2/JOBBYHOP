import React, { useState } from 'react';
import { ArrowRight, Users, Target, Clock } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find Trusted Workers
                  <span className="text-orange-500"> Instantly</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Hire skilled event staff nearby in seconds.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('recruiter-auth')}
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
                >
                  I'm a Recruiter
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('worker-auth')}
                  className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
                >
                  I'm a Worker
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="relative">
                {!imageError ? (
                  <img
                    src="/hero-image.svg"
                    alt="Team working together"
                    className="rounded-xl shadow-2xl w-full h-96 object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="rounded-xl shadow-2xl w-full h-96 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Users className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-xl font-semibold">Team Collaboration</p>
                      <p className="text-sm opacity-90">Working together for success</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Users className="h-8 w-8 text-orange-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">+10K</h3>
                  <p className="text-gray-600">Jobs Posted</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">95%</h3>
                  <p className="text-gray-600">Match Rate</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                  <p className="text-gray-600">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;