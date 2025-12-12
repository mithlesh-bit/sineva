import React from 'react';

const Hero: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-950">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Hi, I'm a </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 animate-gradient">
              Full Stack Developer
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Crafting exceptional web experiences with
            <span className="text-green-400 font-semibold"> Next.js</span> and
            <span className="text-green-400 font-semibold"> Node.js</span>
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <span className="px-4 py-2 bg-gray-800/50 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
              Next.js
            </span>
            <span className="px-4 py-2 bg-gray-800/50 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
              Node.js
            </span>
            <span className="px-4 py-2 bg-gray-800/50 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
              TypeScript
            </span>
            <span className="px-4 py-2 bg-gray-800/50 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
              React
            </span>
            <span className="px-4 py-2 bg-gray-800/50 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
              2+ Years Experience
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </button>
            <a
              href="#projects"
              className="px-8 py-3 border-2 border-green-500 text-green-400 font-semibold rounded-lg hover:bg-green-500/10 transform hover:scale-105 transition-all duration-300"
            >
              View My Work
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-green-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;