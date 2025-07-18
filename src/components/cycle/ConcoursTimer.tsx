import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, AlertTriangle, LinkIcon } from 'lucide-react';

const ConcoursTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const targetDate = new Date('2025-07-29T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">حالة المناظرة</h3>
          <p className="text-sm text-slate-600">موعد المناظرة قريب</p>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 mb-4 border border-amber-200">
        <div className="flex items-center gap-3 text-amber-800">
          <Clock className="w-5 h-5" />
          <p className="font-medium">موقع المناظرة مازال ما تحلش</p>
        </div>
      </div>
      <div className="mt-4 bg-amber-100/50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-amber-800">
          <LinkIcon className="w-5 h-5" />
          <p className="font-medium">هذا لينك متاع الموقع:</p>
        </div>
        <a 
          href="https://csingenieur.inscription.tn/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-2 block text-indigo-600 hover:text-indigo-700 font-medium break-all"
        >
          https://csingenieur.inscription.tn/
        </a>
      </div>

    </div>
  );
};

export default ConcoursTimer;