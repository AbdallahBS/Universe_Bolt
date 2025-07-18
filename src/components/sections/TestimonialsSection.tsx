import React from 'react';
import { Star } from 'lucide-react';
import { translations, Translation } from '../../utils/translations';

interface TestimonialsSectionProps {
  language: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  const t: Translation = translations[language];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "Universe helped me land my dream internship at a tech company. The platform's resources and guidance were invaluable for my career development!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Ahmed Hassan",
      role: "Engineering Student",
      content: "The video tutorials saved me hours of struggling with software installations. Clear, comprehensive, and professionally crafted content.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Emma Wilson",
      role: "Business Student",
      content: "The career planning tools helped me map out my future and connect with industry professionals. Highly recommended for ambitious students!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            {t.testimonialsTagline}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            {t.testimonialsTitle}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.testimonialsDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-500 hover:transform hover:scale-105"
            >
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;