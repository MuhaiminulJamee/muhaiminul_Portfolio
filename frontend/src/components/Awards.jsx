import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Medal, Star, Users, Calendar } from 'lucide-react';
import { awards } from '../mock';

const Awards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredAward, setHoveredAward] = useState(null);
  const awardsRef = useRef(null);
  const floatingRef = useRef([]);

  const categories = ['All', 'Academic Excellence', 'Robotics', 'Programming', 'IoT Development', 'Mathematics, Science and Technology'];

  const filteredAwards = selectedCategory === 'All' 
    ? awards 
    : awards.filter(award => award.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (awardsRef.current) {
      observer.observe(awardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating animations for background elements
  useEffect(() => {
    const animateFloating = () => {
      floatingRef.current.forEach((element, index) => {
        if (element) {
          const time = Date.now() * 0.001;
          const amplitude = 15 + index * 3;
          const frequency = 0.3 + index * 0.1;
          const x = Math.sin(time * frequency) * amplitude;
          const y = Math.cos(time * frequency * 0.7) * amplitude;
          const rotation = Math.sin(time * frequency * 0.5) * 15;
          
          element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
        }
      });
    };

    const interval = setInterval(animateFloating, 50);
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      'Academic Excellence': <Trophy className="w-6 h-6" />,
      'Robotics': <Star className="w-6 h-6" />,
      'Programming': <Medal className="w-6 h-6" />,
      'IoT Development': <Trophy className="w-6 h-6" />,
      'Mathematics, Science and Technology': <Star className="w-6 h-6" />
    };
    return icons[category] || <Medal className="w-6 h-6" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Academic Excellence': 'from-yellow-500 to-orange-500',
      'Robotics': 'from-blue-500 to-indigo-500',
      'Programming': 'from-green-500 to-teal-500',
      'IoT Development': 'from-purple-500 to-pink-500',
      'Mathematics, Science and Technology': 'from-red-500 to-rose-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const AwardCard = ({ award, index }) => {
    const cardRef = useRef(null);
    const isHovered = hoveredAward === award.title;

    useEffect(() => {
      const handleMouseMove = (e) => {
        if (cardRef.current && isHovered) {
          const card = cardRef.current;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.05)`;
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
    }, [isHovered]);

    return (
      <div
        ref={cardRef}
        className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-1000 delay-${index * 100} ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={() => setHoveredAward(award.title)}
        onMouseLeave={() => setHoveredAward(null)}
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(award.category)} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl`}></div>
        
        {/* Rank Badge */}
        {award.participants && (
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold">
              #{index + 1}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className={`inline-flex p-3 bg-gradient-to-r ${getCategoryColor(award.category)} rounded-lg mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
            {getCategoryIcon(award.category)}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
            {award.title}
          </h3>

          {/* Organization */}
          <div className="text-gray-600 dark:text-gray-400 font-medium mb-3">
            {award.organization}
          </div>

          {/* Years */}
          <div className="flex items-center mb-4">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <div className="flex flex-wrap gap-1">
              {award.years.map((year, yearIndex) => (
                <span key={yearIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                  {year}
                </span>
              ))}
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(award.category)} text-white rounded-full text-xs font-medium`}>
              {award.category}
            </span>
          </div>

          {/* Participants Info */}
          {award.participants && (
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <Users className="w-4 h-4 mr-1" />
              <span>{award.participants}</span>
            </div>
          )}
        </div>

        {/* 3D Floating Elements */}
        {isHovered && (
          <>
            <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${getCategoryColor(award.category)} rounded-full animate-ping opacity-50`}></div>
            <div className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${getCategoryColor(award.category)} rounded-full animate-bounce`}></div>
            {/* Sparkle effects */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${15 + i * 20}%`,
                  animationDelay: `${i * 150}ms`
                }}
              />
            ))}
          </>
        )}

        {/* Award Ribbon Effect */}
        <div className="absolute top-0 left-4 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-yellow-400 opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>
    );
  };

  return (
    <section id="awards" ref={awardsRef} className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            ref={el => floatingRef.current[index] = el}
            className={`absolute text-4xl opacity-20 ${
              index % 4 === 0 ? 'text-yellow-400' :
              index % 4 === 1 ? 'text-orange-400' :
              index % 4 === 2 ? 'text-red-400' : 'text-pink-400'
            }`}
            style={{
              left: `${10 + (index % 4) * 25}%`,
              top: `${10 + Math.floor(index / 4) * 40}%`
            }}
          >
            {index % 3 === 0 ? '🏆' : index % 3 === 1 ? '🥇' : '🌟'}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Awards & Recognition
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Celebrating achievements in robotics, programming, mathematics, and academic excellence
          </p>

          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-2 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                {category === 'All' ? 'All Awards' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredAwards.map((award, index) => (
            <AwardCard key={index} award={award} index={index} />
          ))}
        </div>

        {/* Achievement Statistics */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { number: awards.length, label: "Total Awards", icon: "🏆", color: "text-yellow-500" },
            { number: "15+", label: "National Level", icon: "🥇", color: "text-orange-500" },
            { number: "3", label: "International", icon: "🌍", color: "text-blue-500" },
            { number: "8", label: "Years Active", icon: "📅", color: "text-green-500" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Timeline Highlight */}
        <div className={`mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-200 dark:border-cyan-800 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Achievement Highlights</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              From local competitions to international recognition, each achievement represents dedication to excellence in STEM fields
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="group cursor-pointer">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🤖</div>
                <h4 className="font-bold text-gray-900 dark:text-white">Robotics Excellence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">International Robot Olympiad Winner</p>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">💻</div>
                <h4 className="font-bold text-gray-900 dark:text-white">Programming Mastery</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">National Programming Champion</p>
              </div>
              <div className="group cursor-pointer">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🎓</div>
                <h4 className="font-bold text-gray-900 dark:text-white">Academic Scholar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">4-Year Technical Scholarship</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;