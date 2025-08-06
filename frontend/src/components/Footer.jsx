import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { personalInfo } from '../mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,.1) 2px, transparent 0), 
                           radial-gradient(circle at 75px 75px, rgba(255,255,255,.05) 2px, transparent 0)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                {personalInfo.name}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Passionate researcher and developer specializing in AI, Machine Learning, Robotics, and Computer Vision. 
                Bridging the gap between cutting-edge research and real-world applications.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300"
                >
                  <Github className="w-5 h-5 group-hover:text-cyan-400 transition-colors duration-300" />
                </a>
                
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-300" />
                </a>
                
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group p-3 bg-white/5 rounded-lg border border-white/10 hover:border-green-400/50 hover:bg-white/10 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 group-hover:text-green-400 transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-cyan-400">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Experience', href: '#experience' }
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-cyan-400">Research Areas</h4>
            <ul className="space-y-3">
              {[
                'Machine Learning',
                'Computer Vision',
                'Robotics & IoT',
                'Deep Learning',
                'AI Research'
              ].map((area) => (
                <li key={area} className="text-gray-300 text-sm">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-8 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-2xl font-bold text-cyan-400 group-hover:scale-110 transition-transform duration-300">6+</div>
              <div className="text-gray-400 text-sm mt-1">Research Papers</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-gray-400 text-sm mt-1">Awards Won</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform duration-300">4+</div>
              <div className="text-gray-400 text-sm mt-1">Years Experience</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-purple-400 group-hover:scale-110 transition-transform duration-300">10+</div>
              <div className="text-gray-400 text-sm mt-1">Projects</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>&copy; {currentYear} {personalInfo.name}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>using React & FastAPI</span>
            </span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <span className="text-sm font-medium">Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Inspirational Quote */}
        <div className="py-8 border-t border-gray-700 text-center">
          <blockquote className="text-gray-300 italic text-lg max-w-2xl mx-auto">
            "The future belongs to those who learn more skills and combine them in creative ways."
          </blockquote>
          <cite className="text-gray-500 text-sm mt-2 block">- Robert Greene</cite>
        </div>
      </div>

      {/* Scroll to top floating button */}
      <div className="absolute bottom-8 right-8">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
      </div>
    </footer>
  );
};

export default Footer;