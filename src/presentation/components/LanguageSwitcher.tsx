import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="relative">
      <button
        onClick={() => onLanguageChange(currentLanguage === 'en' ? 'ar' : 'en')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600 hover:text-indigo-600"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage === 'en' ? 'العربية' : 'English'}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;