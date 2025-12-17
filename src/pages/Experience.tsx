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
      setLoading(true);
      setError(null);
      
      console.log('[Experience Page] Loading experiences from Supabase...');
      
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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-400 text-xl mb-4">â ï¸ Error Loading Experiences</div>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={loadExperiences}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">My </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Experience
            </span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A journey through my professional development and growth in the tech industry.
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">ð No Experience Added Yet</div>
            <p className="text-gray-500">Experience entries will appear here once added through the admin panel.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-400 to-cyan-400 hidden md:block"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative flex items-start gap-8">
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-16 h-16 bg-gray-800 border-4 border-green-400 rounded-full items-center justify-center flex-shrink-0 relative z-10">
                    {exp.logo_url ? (
                      <img 
                        src={exp.logo_url} 
                        alt={exp.company}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {exp.company.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* Experience card */}
                  <div className="flex-1 bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                        <h4 className="text-lg text-green-400 mb-2">{exp.company}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            ð {exp.duration}
                          </span>
                          {exp.is_current && (
                            <span className="px-2 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-xs font-medium">
                              Current Position
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-4">{exp.description}</p>
                    
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-gray-700/50 border border-green-500/30 rounded-full text-green-400 text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Debug info */}
        <div className="mt-16 p-4 bg-gray-800/30 rounded-lg text-center">
          <p className="text-gray-500 text-sm">
            Found {experiences.length} experience{experiences.length !== 1 ? 's' : ''} in database
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;