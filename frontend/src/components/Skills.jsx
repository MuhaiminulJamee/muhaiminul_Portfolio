import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Cpu, Brain, Globe, Wrench } from 'lucide-react';
import { skills } from '../mock';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const skillsRef = useRef(null);
  const floatingElementsRef = useRef([]);

  const skillIcons = {
    "Programming": <Code className="w-6 h-6" />,
    "ML/AI Frameworks": <Brain className="w-6 h-6" />,
    "Web Development": <Globe className="w-6 h-6" />,
    "Robotics & IoT": <Cpu className="w-6 h-6" />,
    "Tools & Software": <Wrench className="w-6 h-6" />,
    "Specializations": <Database className="w-6 h-6" />
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D floating animation for background elements
  useEffect(() => {
    const animateFloatingElements = () => {
      floatingElementsRef.current.forEach((element, index) => {
        if (element) {
          const time = Date.now() * 0.001;
          const amplitude = 20 + index * 5;
          const frequency = 0.5 + index * 0.2;
          const x = Math.sin(time * frequency) * amplitude;
          const y = Math.cos(time * frequency * 0.8) * amplitude;
          const z = Math.sin(time * frequency * 0.6) * 10;
          
          element.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotate(${time * 20 + index * 45}deg)`;
        }
      });
    };

    const interval = setInterval(animateFloatingElements, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" ref={skillsRef} className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            ref={el => floatingElementsRef.current[index] = el}
            className="absolute w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg"
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + (index % 2) * 40}%`,
              opacity: 0.1 - index * 0.01
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Skills & Expertise
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            A comprehensive toolkit spanning AI research, software development, and cutting-edge technologies
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <div
              key={skillCategory.category}
              className={`group relative bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 transition-all duration-1000 delay-${index * 100} hover:shadow-2xl hover:-translate-y-4 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              onMouseEnter={() => setHoveredSkill(skillCategory.category)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                transform: hoveredSkill === skillCategory.category 
                  ? 'perspective(1000px) rotateX(-5deg) rotateY(5deg) translateZ(20px)' 
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              
              {/* Header */}
              <div className="flex items-center mb-6 relative z-10">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                  {skillIcons[skillCategory.category]}
                </div>
                <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                  {skillCategory.category}
                </h3>
              </div>

              {/* Progress Bar */}
              <div className="mb-4 relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{skillCategory.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000 delay-500 relative"
                    style={{ 
                      width: isVisible ? `${skillCategory.level}%` : '0%',
                      boxShadow: '0 0 10px rgba(34, 197, 243, 0.4)'
                    }}
                  >
                    {/* Animated shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-2 relative z-10">
                {skillCategory.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-300"
                    style={{ transitionDelay: `${itemIndex * 50}ms` }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium hover:text-cyan-500 transition-colors duration-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* 3D Floating Badge */}
              <div 
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  transform: hoveredSkill === skillCategory.category 
                    ? 'translateZ(30px) rotate(360deg)' 
                    : 'translateZ(0px) rotate(0deg)'
                }}
              >
                {skillCategory.level}
              </div>

              {/* Interactive Particles */}
              {hoveredSkill === skillCategory.category && (
                <>
                  {Array.from({ length: 3 }).map((_, particleIndex) => (
                    <div
                      key={particleIndex}
                      className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
                      style={{
                        left: `${20 + particleIndex * 30}%`,
                        top: `${30 + particleIndex * 20}%`,
                        animationDelay: `${particleIndex * 200}ms`,
                        animationDuration: '1s'
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Always learning and exploring new technologies to stay at the forefront of innovation
          </p>
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            View My Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;