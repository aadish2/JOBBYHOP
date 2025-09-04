import React from 'react';
import { 
  FileX, 
  Zap, 
  Shield, 
  MapPin, 
  RotateCcw, 
  Calendar, 
  Gift, 
  Smartphone 
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: FileX,
      title: "No Resumes Required",
      description: "Skip the paperwork. Your profile is your resume with skill-based matching."
    },
    {
      icon: Zap,
      title: "Instant Job Matching",
      description: "Get matched with relevant jobs instantly based on your skills and location."
    },
    {
      icon: Shield,
      title: "Aadhar OTP Verification",
      description: "Secure authentication ensures all users are verified and trustworthy."
    },
    {
      icon: MapPin,
      title: "Auto-Location Detection",
      description: "Smart location services help you find jobs nearby automatically."
    },
    {
      icon: RotateCcw,
      title: "Easy Rehiring",
      description: "Recruiters can quickly rehire workers they've worked with before."
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Advanced scheduling tools help manage multiple events efficiently."
    },
    {
      icon: Gift,
      title: "Referral Rewards",
      description: "Earn rewards by referring skilled workers to join our platform."
    },
    {
      icon: Smartphone,
      title: "Progressive Web App",
      description: "Works offline and installs like a native app on any device."
    }
  ];

  return (
    <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline event staffing, from instant matching 
            to secure payments and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-orange-200 transition-colors">
                  <IconComponent className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Secure & Compliant</h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Your data is protected with enterprise-grade security. We comply with all 
            data protection regulations and ensure your information stays private and secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;