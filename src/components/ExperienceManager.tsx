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

interface ExperienceFormData {
  company: string;
  position: string;
  duration: string;
  description: string;
  skills: string;
  logo_url: string;
  is_current: boolean;
  start_date: string;
  end_date: string;
}

const ExperienceManager: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExperienceFormData>({
    company: '',
    position: '',
    duration: '',
    description: '',
    skills: '',
    logo_url: '',
    is_current: false,
    start_date: '',
    end_date: '',
  });

  console.log('[ExperienceManager] Component mounted, loading from Supabase');

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('[ExperienceManager] Loading experiences from Supabase...');
      
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[ExperienceManager] Supabase error:', error);
        throw error;
      }

      console.log('[ExperienceManager] Successfully loaded from Supabase:', data);
      setExperiences(data || []);
    } catch (error) {
      console.error('[ExperienceManager] Error loading experiences:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load experiences';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      duration: '',
      description: '',
      skills: '',
      logo_url: '',
      is_current: false,
      start_date: '',
      end_date: '',
    });
    setEditingId(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      
      const experienceData = {
        company: formData.company.trim(),
        position: formData.position.trim(),
        duration: formData.duration.trim(),
        description: formData.description.trim(),
        skills: formData.skills.trim().split(',').map(s => s.trim()).filter(s => s.length > 0),
        logo_url: formData.logo_url.trim() || null,
        is_current: formData.is_current,
        start_date: formData.start_date,
        end_date: formData.is_current ? null : formData.end_date || null
      };

      console.log('[ExperienceManager] Saving experience to Supabase:', experienceData);
      
      if (editingId) {
        // Update existing experience
        const { error } = await supabase
          .from('experiences')
          .update(experienceData)
          .eq('id', editingId);
        
        if (error) throw error;
        console.log('[ExperienceManager] Experience updated successfully');
      } else {
        // Insert new experience
        const { error } = await supabase
          .from('experiences')
          .insert([experienceData]);
        
        if (error) throw error;
        console.log('[ExperienceManager] Experience inserted successfully');
      }
      
      // Reload experiences and close modal
      await loadExperiences();
      setShowModal(false);
      resetForm();
      alert(editingId ? 'Experience updated successfully!' : 'Experience added successfully!');
    } catch (error) {
      console.error('[ExperienceManager] Error saving experience:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save experience';
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (experience: Experience) => {
    setFormData({
      company: experience.company,
      position: experience.position,
      duration: experience.duration,
      description: experience.description,
      skills: experience.skills.join(', '),
      logo_url: experience.logo_url || '',
      is_current: experience.is_current,
      start_date: experience.start_date,
      end_date: experience.end_date || '',
    });
    setEditingId(experience.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      setError(null);
      console.log('[ExperienceManager] Deleting experience ID:', id);
      
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      console.log('[ExperienceManager] Experience deleted successfully');
      await loadExperiences();
      alert('Experience deleted successfully!');
    } catch (error) {
      console.error('[ExperienceManager] Error deleting:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete experience';
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };

  const testConnection = async () => {
    console.log('[ExperienceManager] Testing Supabase connection...');
    try {
      const { count, error } = await supabase
        .from('experiences')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      alert(`Supabase connection successful! Found ${count || 0} experiences in database.`);
    } catch (error) {
      console.error('[ExperienceManager] Connection test failed:', error);
      alert('Connection failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
          <span className="ml-3 text-gray-300">Loading experiences from database...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Experience Management</h2>
        <div className="flex gap-2">
          <button
            onClick={testConnection}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
          >
            Test Supabase Connection
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Add Experience
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          <strong>Error:</strong> {error}
          <button 
            onClick={loadExperiences}
            className="ml-4 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      )}

      <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-300 text-sm">
        <strong>Status:</strong> Connected to Supabase Database
        <br />Experiences Count: {experiences.length}
        <br />Loading: {loading.toString()}
        <br />Submitting: {submitting.toString()}
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No experience entries found in database. Add your first experience!
        </div>
      ) : (
        <div className="grid gap-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-gray-800 border border-green-500/20 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{exp.position}</h3>
                  <p className="text-green-400">{exp.company}</p>
                  <p className="text-gray-400 text-sm">{exp.duration}</p>
                  {exp.is_current && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 border border-green-500/40 rounded text-green-400 text-xs">
                      Current Position
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
              
              {exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 text-green-400 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Experience' : 'Add New Experience'}
            </h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration (display) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Jan 2022 - Present"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Logo URL (optional)</label>
                  <input
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    disabled={formData.is_current}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.is_current}
                    onChange={(e) => setFormData({...formData, is_current: e.target.checked})}
                    className="rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500"
                  />
                  <span>This is my current position</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma-separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, TypeScript, etc."
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-green-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving to Database...' : (editingId ? 'Update' : 'Add')} Experience
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={submitting}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;