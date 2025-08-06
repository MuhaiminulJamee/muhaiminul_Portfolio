import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, FileText, Calendar, Award, Copy } from 'lucide-react';
import { publications } from '../mock';
import { useToast } from '../hooks/use-toast';

const Publications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState('All');
  const publicationsRef = useRef(null);
  const { toast } = useToast();

  const years = ['All', ...new Set(publications.map(pub => pub.year.toString()))].sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    return b - a;
  });

  const filteredPublications = selectedYear === 'All' 
    ? publications 
    : publications.filter(pub => pub.year.toString() === selectedYear);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (publicationsRef.current) {
      observer.observe(publicationsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const copyDOI = (doi) => {
    navigator.clipboard.writeText(`https://doi.org/${doi}`);
    toast({
      title: "DOI Copied!",
      description: "Publication DOI link has been copied to clipboard.",
    });
  };

  const PublicationCard = ({ publication, index }) => {
    const cardRef = useRef(null);

    useEffect(() => {
      const handleMouseMove = (e) => {
        if (cardRef.current) {
          const card = cardRef.current;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 30;
          const rotateY = (centerX - x) / 30;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
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

    return (
      <div
        ref={cardRef}
        className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-cyan-500/30 transition-all duration-1000 delay-${index * 100} ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        
        {/* Year Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold">
            {publication.year}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="inline-flex p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
            <FileText className="w-6 h-6 text-cyan-500" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
            {publication.title}
          </h3>

          {/* Conference */}
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
            <Award className="w-4 h-4 mr-2" />
            <span className="font-medium text-sm">{publication.conference}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View Paper
            </a>
            
            <button
              onClick={() => copyDOI(publication.doi)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy DOI
            </button>
          </div>

          {/* DOI Display */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">DOI:</div>
            <div className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
              {publication.doi}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
        
        {/* Paper Corner Fold Effect */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-gray-200 dark:border-t-gray-600 opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>
    );
  };

  return (
    <section id="publications" ref={publicationsRef} className="py-20 bg-gray-50 dark:bg-slate-800/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {/* Floating academic symbols */}
        <div className="absolute top-1/3 left-1/4 text-6xl text-gray-200 dark:text-gray-700 opacity-20 animate-float">📚</div>
        <div className="absolute top-2/3 right-1/4 text-4xl text-gray-200 dark:text-gray-700 opacity-20 animate-float delay-1000">🎓</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Research Publications
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Peer-reviewed research contributions to top-tier conferences and journals in AI, Robotics, and Communication Systems
          </p>

          {/* Year Filter */}
          <div className={`flex flex-wrap justify-center gap-2 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  selectedYear === year
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredPublications.map((publication, index) => (
            <PublicationCard key={index} publication={publication} index={index} />
          ))}
        </div>

        {/* Statistics */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { number: publications.length, label: "Total Publications", icon: "📄" },
            { number: "6", label: "Conference Papers", icon: "🏆" },
            { number: "2024", label: "Latest Publication", icon: "📅" },
            { number: "100%", label: "Peer Reviewed", icon: "✅" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium mt-1 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Research Impact */}
        <div className={`mt-16 text-center bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Research Impact</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            My research focuses on bridging the gap between theoretical AI concepts and practical real-world applications, 
            with particular emphasis on robotics, computer vision, and communication systems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['AI & Machine Learning', 'Robotics & Automation', 'Computer Vision', 'IoT Systems', '5G Communications', 'Deep Learning'].map((area, index) => (
              <span key={index} className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium border border-cyan-200 dark:border-cyan-700 hover:scale-105 transition-transform duration-200">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;