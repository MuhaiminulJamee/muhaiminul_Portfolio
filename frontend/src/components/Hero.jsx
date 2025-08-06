import React, { useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../mock';

const Hero = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroElement = heroRef.current;
      const nameElement = nameRef.current;
      const titleElement = titleRef.current;
      
      if (heroElement && nameElement && titleElement) {
        // Parallax effect for background
        heroElement.style.transform = `translateY(${scrollY * 0.5}px)`;
        
        // 3D rotation effects
        nameElement.style.transform = `perspective(1000px) rotateX(${scrollY * 0.02}deg) rotateY(${scrollY * 0.01}deg)`;
        titleElement.style.transform = `perspective(1000px) rotateX(${-scrollY * 0.01}deg) rotateY(${scrollY * 0.02}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      {/* Animated Background */}
      <div ref={heroRef} className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400/20 transform rotate-45 animate-spin delay-200" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-400/20 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-indigo-400/20 transform rotate-12 animate-bounce delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,.2) 2px, transparent 0), 
                           radial-gradient(circle at 75px 75px, rgba(255,255,255,.1) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="mb-8">
          <h1 
            ref={nameRef}
            className="text-5xl md:text-7xl font-bold text-white mb-4 transform transition-all duration-1000 hover:scale-105"
            style={{ 
              textShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
              background: 'linear-gradient(45deg, #fff, #00bcd4, #2196f3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {personalInfo.name}
          </h1>
          
          <div 
            ref={titleRef}
            className="text-xl md:text-2xl text-gray-300 mb-6 font-light tracking-wide transform transition-all duration-1000 hover:text-cyan-300"
          >
            {personalInfo.title}
          </div>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-in-up delay-500">
            {personalInfo.bio}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          <a 
            href={personalInfo.github}
            className="group relative p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </a>
          
          <a 
            href={personalInfo.linkedin}
            className="group relative p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-full bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </a>
          
          <a 
            href={`mailto:${personalInfo.email}`}
            className="group relative p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-green-400/50 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
          >
            <Mail className="w-6 h-6 text-gray-300 group-hover:text-green-400 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-full bg-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </a>
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 active:scale-95"
        >
          <span className="relative z-10">Explore My Work</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        </button>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
        >
          <ChevronDown className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
        </button>
      </div>

      {/* Animated CSS */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Hero;