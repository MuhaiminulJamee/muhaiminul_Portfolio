import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Bot, User } from 'lucide-react';
import { personalInfo } from '../mock';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', message: 'Hello! I\'m Muhaiminul\'s AI assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatTyping, setIsChatTyping] = useState(false);
  
  const contactRef = useRef(null);
  const chatEndRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission - replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
    }, 2000);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), type: 'user', message: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatTyping(true);

    // Mock AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Muhaiminul has extensive experience in AI and robotics. Would you like to know more about his specific projects?",
        "Muhaiminul has published 6+ research papers in top conferences. I can share details about his latest publications in AI and robotics.",
        "He's currently working on several exciting projects including smart waste management robots and AI-powered systems. What interests you most?",
        "Muhaiminul is available for research collaboration and consulting. Would you like me to connect you directly?",
        "His expertise spans Machine Learning, Computer Vision, Robotics, and IoT. Which area would you like to explore?"
      ];
      
      const botMessage = { 
        id: Date.now(), 
        type: 'bot', 
        message: responses[Math.floor(Math.random() * responses.length)]
      };
      
      setChatMessages(prev => [...prev, botMessage]);
      setIsChatTyping(false);
    }, 1500);
  };

  return (
    <section id="contact" ref={contactRef} className="py-20 bg-gray-50 dark:bg-slate-800/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Let's Connect
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Ready to collaborate on innovative AI and robotics projects? Let's discuss how we can work together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors duration-200"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {/* Contact Details */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="text-gray-600 dark:text-gray-300">{personalInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                    <p className="text-gray-600 dark:text-gray-300">{personalInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Location</p>
                    <p className="text-gray-600 dark:text-gray-300">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Connect</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:scale-105 transition-transform duration-300"
                >
                  LinkedIn
                </a>
                
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:scale-105 transition-transform duration-300"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Widget */}
      {showChat && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-40">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`p-2 rounded-full ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  )}
                </div>
                <div className={`max-w-[70%] p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
            
            {isChatTyping && (
              <div className="flex items-start space-x-2">
                <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                  <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:scale-105 transition-transform duration-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Contact;