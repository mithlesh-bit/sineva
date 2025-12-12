import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

interface Experience {
  id?: string
  company: string
  position: string
  duration: string
  description: string
  skills: string[]
  logo_url?: string
  is_current: boolean
  start_date: string
  end_date?: string
}

serve(async (req) => {
  console.log(`[store-experience] ${new Date().toISOString()} - ${req.method} ${req.url}`)
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('[store-experience] Handling CORS preflight')
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const isTest = url.searchParams.get('test')
    
    console.log(`[store-experience] Processing ${req.method} request, id: ${id}, test: ${isTest}`)

    // Test endpoint
    if (isTest) {
      console.log('[store-experience] Test endpoint called')
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'API connection successful',
          timestamp: new Date().toISOString(),
          method: req.method
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    switch (req.method) {
      case 'GET': {
        console.log('[store-experience] Fetching experiences')
        
        const { data, error } = await supabaseClient
          .from('experiences')
          .select('*')
          .order('start_date', { ascending: false })
        
        if (error) {
          console.error('[store-experience] Database error:', error)
          throw error
        }
        
        console.log(`[store-experience] Retrieved ${data?.length || 0} experiences`)
        
        // Parse skills JSON strings back to arrays
        const processedData = data?.map(exp => ({
          ...exp,
          skills: typeof exp.skills === 'string' ? JSON.parse(exp.skills) : exp.skills || []
        })) || []
        
        return new Response(
          JSON.stringify({ success: true, data: processedData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      case 'POST': {
        console.log('[store-experience] Creating new experience')
        
        const body = await req.json()
        console.log('[store-experience] Request body:', body)
        
        // Validation
        if (!body.company || !body.position || !body.description || !body.start_date) {
          console.error('[store-experience] Missing required fields')
          return new Response(
            JSON.stringify({ success: false, error: 'Missing required fields' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400
            }
          )
        }
        
        // Process skills
        let skillsArray: string[] = []
        if (body.skills) {
          skillsArray = typeof body.skills === 'string' 
            ? body.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
            : body.skills
        }
        
        const experienceData = {
          company: body.company,
          position: body.position,
          duration: body.duration,
          description: body.description,
          skills: JSON.stringify(skillsArray),
          logo_url: body.logo_url || null,
          is_current: body.is_current || false,
          start_date: body.start_date,
          end_date: body.is_current ? null : body.end_date || null,
        }
        
        console.log('[store-experience] Inserting data:', experienceData)
        
        const { data, error } = await supabaseClient
          .from('experiences')
          .insert(experienceData)
          .select()
        
        if (error) {
          console.error('[store-experience] Insert error:', error)
          throw error
        }
        
        console.log('[store-experience] Experience created successfully:', data)
        
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      case 'PUT': {
        if (!id) {
          console.error('[store-experience] PUT request missing ID')
          return new Response(
            JSON.stringify({ success: false, error: 'Experience ID required for update' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400
            }
          )
        }
        
        console.log(`[store-experience] Updating experience ${id}`)
        
        const body = await req.json()
        console.log('[store-experience] Update body:', body)
        
        // Process skills
        let skillsArray: string[] = []
        if (body.skills) {
          skillsArray = typeof body.skills === 'string' 
            ? body.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
            : body.skills
        }
        
        const updateData = {
          company: body.company,
          position: body.position,
          duration: body.duration,
          description: body.description,
          skills: JSON.stringify(skillsArray),
          logo_url: body.logo_url || null,
          is_current: body.is_current || false,
          start_date: body.start_date,
          end_date: body.is_current ? null : body.end_date || null,
        }
        
        const { data, error } = await supabaseClient
          .from('experiences')
          .update(updateData)
          .eq('id', id)
          .select()
        
        if (error) {
          console.error('[store-experience] Update error:', error)
          throw error
        }
        
        console.log('[store-experience] Experience updated successfully:', data)
        
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      case 'DELETE': {
        if (!id) {
          console.error('[store-experience] DELETE request missing ID')
          return new Response(
            JSON.stringify({ success: false, error: 'Experience ID required for deletion' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400
            }
          )
        }
        
        console.log(`[store-experience] Deleting experience ${id}`)
        
        const { error } = await supabaseClient
          .from('experiences')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('[store-experience] Delete error:', error)
          throw error
        }
        
        console.log('[store-experience] Experience deleted successfully')
        
        return new Response(
          JSON.stringify({ success: true, message: 'Experience deleted successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      
      default: {
        console.error(`[store-experience] Method ${req.method} not allowed`)
        return new Response(
          JSON.stringify({ success: false, error: 'Method not allowed' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 405
          }
        )
      }
    }
  } catch (error) {
    console.error('[store-experience] Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error',
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})