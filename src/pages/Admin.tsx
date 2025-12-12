import React from 'react';
import ExperienceManager from '../components/ExperienceManager';
import DatabaseDebugger from '../components/DatabaseDebugger';

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Admin Panel
            </span>
          </h1>
          <p className="text-gray-400">Manage your portfolio content</p>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-900 border border-green-500/20 rounded-lg">
            <DatabaseDebugger />
          </div>
          
          <div className="bg-gray-900 border border-green-500/20 rounded-lg">
            <ExperienceManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;