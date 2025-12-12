import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-green-500/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-green-400">&lt;Dev/&gt;</h3>
            <p className="text-gray-400 text-sm mt-2">Full Stack Developer</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-green-500/10 text-center">
          <p className="text-gray-500 text-sm">
            Designed & Developed with{' '}
            <span className="text-green-400">❤</span> by a passionate developer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;