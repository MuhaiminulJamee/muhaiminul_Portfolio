import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, ExternalLink, Briefcase } from 'lucide-react';
import { experience } from '../mock';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const experienceRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D Timeline Animation
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current && isVisible) {
        const rect = timelineRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));
        
        timelineRef.current.style.transform = `perspective(1000px) rotateX(${scrollProgress * 10 - 5}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const ExperienceCard = ({ exp, index }) => {
    const cardRef = useRef(null);
    const isActive = activeExperience === index;

    useEffect(() => {
      const handleMouseMove = (e) => {
        if (cardRef.current && isActive) {
          const card = cardRef.current;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
        }
      };

      const handleMouseLeave = () => {
        if (cardRef.current) {
          cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
        }
      };

      const card = cardRef.current;
      if (card) {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      }

      return () => {
        if (card) {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }, [isActive]);

    return (
      <div
        ref={cardRef}
        className={`relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border transition-all duration-500 cursor-pointer ${
          isActive 
            ? 'border-cyan-500 dark:border-cyan-400 shadow-2xl shadow-cyan-500/20' 
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => setActiveExperience(index)}
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 transition-opacity duration-300 blur-xl ${
          isActive ? 'opacity-100' : ''
        }`}></div>

        {/* Company Icon */}
        <div className={`inline-flex p-3 rounded-lg mb-4 transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white scale-110' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}>
          <Briefcase className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className={`text-xl font-bold mb-2 transition-all duration-300 ${
            isActive 
              ? 'text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text' 
              : 'text-gray-900 dark:text-white'
          }`}>
            {exp.position}
          </h3>
          
          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="font-medium">{exp.company}</span>
          </div>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">{exp.duration}</span>
          </div>

          <p className={`text-gray-600 dark:text-gray-300 mb-4 leading-relaxed transition-all duration-300 ${
            isActive ? 'text-gray-700 dark:text-gray-200' : ''
          }`}>
            {exp.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3D Floating Elements */}
        {isActive && (
          <>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"></div>
          </>
        )}
      </div>
    );
  };

  return (
    <section id="experience" ref={experienceRef} className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Professional Experience
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            A journey through research, development, and innovation in AI and technology
          </p>
        </div>

        {/* 3D Timeline */}
        <div ref={timelineRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 opacity-30" style={{ height: `${experience.length * 300}px` }}></div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`flex flex-col md:flex-row items-center transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
                }`}
              >
                {/* Timeline Node */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-8 h-8 rounded-full border-4 transition-all duration-500 ${
                    activeExperience === index
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-white dark:border-slate-900 scale-125 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600 border-white dark:border-slate-900'
                  }`}>
                    {activeExperience === index && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-ping opacity-30"></div>
                    )}
                  </div>
                </div>

                {/* Card Container */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <ExperienceCard exp={exp} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { number: "4+", label: "Years of Experience", icon: <Calendar className="w-8 h-8" /> },
            { number: "5+", label: "Organizations", icon: <Briefcase className="w-8 h-8" /> },
            { number: "50+", label: "Projects Completed", icon: <ExternalLink className="w-8 h-8" /> }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-cyan-500 group-hover:text-blue-500 transition-colors duration-300">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;