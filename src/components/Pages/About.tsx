import React, { useState } from 'react';
import { Users, MapPin, Star, Shield } from 'lucide-react';

const About: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About JobbyHop</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform seamlessly connects skilled event workers with recruiters,
            enabling direct job applications with comprehensive skill and location visibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">For Event Workers</h3>
                  <p className="text-gray-600">
                    Find and apply to event jobs instantly. Showcase your skills,
                    track applications, and get hired for weddings, corporate functions,
                    concerts, and college festivals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">For Recruiters</h3>
                  <p className="text-gray-600">
                    Post jobs and find qualified workers in your area. View detailed
                    profiles with skills and location data. Hire with confidence and
                    build your trusted worker network.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
                  <Shield className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Verified</h3>
                  <p className="text-gray-600">
                    All users are verified through Aadhar OTP authentication.
                    Your data is secure, and all transactions are protected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {!imageError ? (
              <img
                src="/hero-image.svg"
                alt="Team collaboration"
                className="rounded-xl shadow-2xl w-full h-96 object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="rounded-xl shadow-2xl w-full h-96 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Users className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-semibold">Team Collaboration</p>
                  <p className="text-sm opacity-90">Building success together</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-xl"></div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-100">
          <div className="text-center">
            <Star className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              To revolutionize the event staffing industry by creating a transparent,
              efficient, and secure platform that connects talented workers with
              opportunities while helping recruiters find the perfect match for their events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;