import React, { useRef, useEffect, useState } from 'react';
import { Code, Brain, Cpu, Zap } from 'lucide-react';
import { personalInfo, researchInterests } from '../mock';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      }
    };

    const handleMouseLeave = () => {
      if (cardRef.current) {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
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
  }, []);

  const highlights = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "6+ published research papers in top-tier conferences",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Robotics & IoT",
      description: "Advanced robotic systems with real-world applications",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Full-Stack Development",
      description: "Modern web applications with Python, React, and Django",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation Leadership",
      description: "National champion in multiple technical competitions",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-gray-50 dark:bg-slate-800/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            About Me
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Passionate researcher and developer bridging the gap between cutting-edge AI research and practical applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Card */}
          <div 
            ref={cardRef}
            className={`bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Researcher & Full-Stack Developer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Currently pursuing B.Sc. in Electronics & Telecommunication Engineering at RUET while working as 
                Operational Manager & Full-Stack Developer at ZeroxaDT. My research focuses on the intersection of 
                AI, robotics, and real-world applications.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                With 6+ published research papers in top conferences and multiple national championships, I'm passionate 
                about translating complex AI concepts into practical solutions that make a real-world impact.
              </p>
            </div>

            {/* Research Interests */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Research Interests</h4>
              <div className="flex flex-wrap gap-2">
                {researchInterests.slice(0, 8).map((interest, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium border border-cyan-200 dark:border-cyan-700 hover:scale-105 transition-transform duration-200"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className={`group relative bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-1000 delay-${index * 100} hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${highlight.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {highlight.icon}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                  {highlight.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {highlight.description}
                </p>
                
                {/* Floating elements */}
                <div className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br ${highlight.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { number: "6+", label: "Research Papers" },
            { number: "15+", label: "Technical Awards" },
            { number: "4+", label: "Years Experience" },
            { number: "10+", label: "Projects Completed" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
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

export default About;