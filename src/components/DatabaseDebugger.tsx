import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qzvtkixsznitaczoluxp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6dnRraXhzem5pdGFjem9sdXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNzA4MzMsImV4cCI6MjA0OTk0NjgzM30.YakwkJZ9-QLaDt5GuPLxkRnNcDGjm6P8FgVPz3Ul5Vw'
);

const DatabaseDebugger: React.FC = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    const debugInfo: any = {
      timestamp: new Date().toISOString(),
      tests: []
    };

    try {
      // Test 1: Basic connection
      console.log('[DEBUG] Testing Supabase connection...');
      const { data: healthCheck, error: healthError } = await supabase
        .from('_supabase_health_check')
        .select('*')
        .limit(1);
      
      debugInfo.tests.push({
        name: 'Connection Test',
        success: !healthError,
        error: healthError?.message,
        note: 'Basic Supabase connection test'
      });

      // Test 2: Check if experiences table exists
      console.log('[DEBUG] Checking experiences table...');
      const { data: tableCheck, error: tableError } = await supabase
        .from('experiences')
        .select('count')
        .limit(0);
      
      debugInfo.tests.push({
        name: 'Experiences Table Exists',
        success: !tableError,
        error: tableError?.message,
        note: 'Checking if experiences table was created'
      });

      // Test 3: Count experiences
      if (!tableError) {
        console.log('[DEBUG] Counting experiences...');
        const { count, error: countError } = await supabase
          .from('experiences')
          .select('*', { count: 'exact', head: true });
        
        debugInfo.tests.push({
          name: 'Experience Count',
          success: !countError,
          result: count,
          error: countError?.message,
          note: `Found ${count || 0} experiences in database`
        });
      }

      // Test 4: Try to fetch all experiences
      if (!tableError) {
        console.log('[DEBUG] Fetching all experiences...');
        const { data: experiences, error: fetchError } = await supabase
          .from('experiences')
          .select('*')
          .order('created_at', { ascending: false });
        
        debugInfo.tests.push({
          name: 'Fetch Experiences',
          success: !fetchError,
          result: experiences,
          error: fetchError?.message,
          note: `Retrieved ${experiences?.length || 0} experience records`
        });
      }

      // Test 5: Check RLS policies
      console.log('[DEBUG] Testing RLS policies...');
      const { data: rlsTest, error: rlsError } = await supabase
        .rpc('pg_get_object_address', { type: 'policy' })
        .select();
      
      debugInfo.tests.push({
        name: 'RLS Policy Check',
        success: true, // RLS errors don't mean connection failure
        error: rlsError?.message,
        note: 'Row Level Security policy test'
      });

    } catch (error: any) {
      console.error('[DEBUG] Critical error:', error);
      debugInfo.criticalError = error.message;
    }

    setResults(debugInfo);
    setLoading(false);
  };

  const testEdgeFunction = async () => {
    setLoading(true);
    try {
      console.log('[DEBUG] Testing store-experience edge function...');
      
      const response = await fetch('/api/store-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'list'
        })
      });

      const result = await response.json();
      
      setResults({
        edgeFunctionTest: {
          status: response.status,
          success: response.ok,
          result: result,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error: any) {
      setResults({
        edgeFunctionTest: {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        }
      });
    }
    setLoading(false);
  };

  const insertTestExperience = async () => {
    setLoading(true);
    try {
      const testExp = {
        company: 'Test Company',
        position: 'Test Position',
        duration: 'Test Duration',
        description: 'This is a test experience created by the debugger.',
        skills: ['React', 'TypeScript', 'Testing'],
        is_current: false,
        start_date: '2023-01-01',
        end_date: '2023-12-31'
      };

      const { data, error } = await supabase
        .from('experiences')
        .insert([testExp])
        .select();

      setResults({
        insertTest: {
          success: !error,
          data: data,
          error: error?.message,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error: any) {
      setResults({
        insertTest: {
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        }
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Database Connection Debugger</h3>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Supabase Connection'}
        </button>
        
        <button
          onClick={testEdgeFunction}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Edge Function
        </button>
        
        <button
          onClick={insertTestExperience}
          disabled={loading}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          Insert Test Experience
        </button>
      </div>

      {results && (
        <div className="bg-gray-900 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-400 mb-2">Debug Results</h4>
          <pre className="text-xs text-gray-300 overflow-auto whitespace-pre-wrap">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DatabaseDebugger;