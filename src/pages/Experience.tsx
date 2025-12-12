import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qzvtkixsznitaczoluxp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6dnRraXhzem5pdGFjem9sdXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNzA4MzMsImV4cCI6MjA0OTk0NjgzM30.YakwkJZ9-QLaDt5GuPLxkRnNcDGjm6P8FgVPz3Ul5Vw'
);

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  skills: string[];
  logo_url?: string;
  is_current: boolean;
  start_date: string;
  end_date?: string;
  created_at: string;
}

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      console.log('[Experience Page] Loading experiences from Supabase');
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) {
        throw error;
      }

      console.log('[Experience Page] Loaded experiences:', data);
      setExperiences(data || []);
    } catch (error) {
      console.error('[Experience Page] Error loading experiences:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load experiences';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">My </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Experience
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto"></div>
          </div>
          
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
            <span className="ml-4 text-gray-300 text-lg">Loading experiences...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">My </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                Experience
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto"></div>
          </div>
          
          <div className="text-center py-12">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-red-400 font-semibold text-lg mb-2">Error Loading Experiences</h3>
              <p className="text-red-300 text-sm mb-4">{error}</p>
              <button
                onClick={loadExperiences}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">My </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and the valuable experiences that shaped my career
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-800/50 border border-green-500/20 rounded-lg p-12 max-w-lg mx-auto">
              <div className="text-6xl mb-6">ð¼</div>
              <h3 className="text-xl font-semibold text-white mb-4">No Experience Added Yet</h3>
              <p className="text-gray-400 mb-6">
                Experience entries will appear here once they're added through the admin panel.
              </p>
              <div className="text-sm text-gray-500">
                Debug info: Found {experiences.length} experiences in database
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-400 to-cyan-400"></div>
            
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <div key={experience.id} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full border-4 border-gray-900 z-10"></div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                      {/* Company & Position */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-1">{experience.position}</h3>
                        <h4 className="text-green-400 font-semibold text-lg">{experience.company}</h4>
                        <p className="text-gray-400 text-sm mt-2">{experience.duration}</p>
                        {experience.is_current && (
                          <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-xs font-medium">
                            Current Position
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {experience.description}
                      </p>

                      {/* Skills */}
                      {experience.skills && experience.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-start">
                          {experience.skills.map((skill, skillIndex) => (
                            <span key={skillIndex} className="px-3 py-1 bg-gray-700/50 border border-gray-600 text-green-400 rounded-md text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Logo placeholder */}
                      {experience.logo_url && (
                        <div className="mt-4">
                          <img 
                            src={experience.logo_url} 
                            alt={`${experience.company} logo`}
                            className="w-12 h-12 object-contain opacity-80"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Debug info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-2">
            <span className="text-gray-500 text-xs">
              Loaded {experiences.length} experience{experiences.length !== 1 ? 's' : ''} from database
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;