import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        {/* Floating Icons */}
        <div className="animate-float-1 absolute top-20 left-10 text-orange-200 text-4xl">💼</div>
        <div className="animate-float-2 absolute top-40 right-20 text-orange-200 text-3xl">🎯</div>
        <div className="animate-float-3 absolute bottom-40 left-20 text-orange-200 text-3xl">⚡</div>
        <div className="animate-float-1 absolute bottom-20 right-10 text-orange-200 text-4xl">🤝</div>
        <div className="animate-float-2 absolute top-60 left-1/4 text-orange-200 text-2xl">📱</div>
        <div className="animate-float-3 absolute top-80 right-1/3 text-orange-200 text-3xl">🌟</div>
        
        {/* Geometric Shapes */}
        <div className="animate-pulse absolute top-32 right-1/4 w-16 h-16 bg-orange-100/30 rounded-full"></div>
        <div className="animate-bounce-slow absolute bottom-32 left-1/3 w-20 h-20 bg-amber-100/20 rounded-lg rotate-45"></div>
        <div className="animate-pulse absolute top-1/2 left-10 w-12 h-12 bg-yellow-100/25 rounded-full"></div>
      </div>
      
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;