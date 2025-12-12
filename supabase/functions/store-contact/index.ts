import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

interface ContactFormData {
  name: string
  email: string
  message: string
}

serve(async (req) => {
  console.log(`[store-contact] ${req.method} ${req.url}`)
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('[store-contact] Handling CORS preflight')
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('[store-contact] Supabase client initialized')

    if (req.method === 'POST') {
      console.log('[store-contact] Processing POST request')
      
      const body = await req.json()
      console.log('[store-contact] Request body:', JSON.stringify(body, null, 2))

      const { name, email, message } = body as ContactFormData

      // Validate required fields
      if (!name || !email || !message) {
        console.log('[store-contact] Validation failed - missing required fields')
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Missing required fields: name, email, and message are required' 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        console.log('[store-contact] Invalid email format:', email)
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: 'Invalid email format' 
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      console.log('[store-contact] Inserting contact message into database')
      const { data, error } = await supabase
        .from('contact_messages')
        .insert({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          status: 'unread',
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('[store-contact] Database error:', error)
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Database error: ${error.message}` 
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      console.log('[store-contact] Contact message saved successfully:', data)
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Contact message saved successfully',
          data 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Handle other methods
    console.log(`[store-contact] Method ${req.method} not allowed`)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Method ${req.method} not allowed` 
      }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('[store-contact] Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})