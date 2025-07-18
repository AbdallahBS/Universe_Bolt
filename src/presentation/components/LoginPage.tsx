import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { translations, Translation } from '../utils/translations';

interface LoginPageProps {
  onBack: () => void;
  language: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack, language }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const t: Translation = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-6 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t.backToHome}
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{t.welcomeBack}</h1>
            <p className="text-slate-600">{t.signInAccount}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t.emailAddress}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder={t.enterEmail}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder={t.enterPassword}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="ml-2 text-sm text-slate-600">{t.rememberMe}</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
                {t.forgotPassword}
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
            >
              {t.signIn}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {t.dontHaveAccount}{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                {t.signUpHere}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;