import React, { useEffect, useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import ResourcesSection from '../components/sections/ResourcesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';

interface HomePageProps {
  language: string;
}

const HomePage: React.FC<HomePageProps> = ({ language }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'resources', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <HeroSection language={language} />
      <ServicesSection language={language} />
      <ResourcesSection language={language} />
      <TestimonialsSection language={language} />
      <CTASection language={language} />
    </div>
  );
};

export default HomePage;