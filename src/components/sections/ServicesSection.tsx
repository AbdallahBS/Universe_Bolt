import React from 'react';
import { 
  Briefcase, 
  BookOpen, 
  PlayCircle, 
  Users, 
  Target, 
  TrendingUp,
  CheckCircle 
} from 'lucide-react';
import { translations, Translation } from '../../utils/translations';

interface ServicesSectionProps {
  language: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ language }) => {
  const t: Translation = translations[language];

  const services = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: t.internshipPortal,
      description: t.internshipDescription,
      features: [t.smartJobMatching, t.applicationTracking, t.interviewPrep],
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: t.academicSupport,
      description: t.academicDescription,
      features: [t.studyMaterials, t.academicGuidance, t.progressTracking],
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      icon: <PlayCircle className="w-8 h-8" />,
      title: t.videoTutorials,
      description: t.videoDescription,
      features: [t.hdTutorials, t.downloadGuides, t.techSupport],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t.studentCommunity,
      description: t.communityDescription,
      features: [t.studyGroups, t.peerSupport, t.networking],
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t.careerPlanning,
      description: t.careerDescription,
      features: [t.goalTracking, t.careerRoadmaps, t.mentorship],
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t.skillsDevelopment,
      description: t.skillsDescription,
      features: [t.skillAssessment, t.onlineCourses, t.certifications],
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2" />
            {t.servicesTagline}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {t.servicesTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.servicesDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10`}>
                <div className="text-white">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-indigo-700 transition-colors relative z-10">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed relative z-10">{service.description}</p>
              <ul className="space-y-3 relative z-10">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm text-slate-500">
                    <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;