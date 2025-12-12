import React from 'react';
import ExperienceManager from '../components/ExperienceManager';
import DatabaseDebugger from '../components/DatabaseDebugger';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Admin </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Panel
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto"></div>
        </div>

        {/* Database Debugger */}
        <div className="mb-8">
          <DatabaseDebugger />
        </div>

        {/* Experience Manager */}
        <div className="bg-gray-900 rounded-lg border border-green-500/20">
          <ExperienceManager />
        </div>
      </div>
    </div>
  );
};

export default Admin;