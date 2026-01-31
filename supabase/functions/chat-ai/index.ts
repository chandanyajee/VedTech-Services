import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get the integration API key from environment
    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Build conversation contents for Gemini API
    const contents = [];
    
    // Add system context as first user message
    contents.push({
      role: "user",
      parts: [{
        text: "You are a helpful customer support assistant for VedTech Services, an IT services company in India. VedTech Services provides comprehensive IT solutions including software development, hardware repair, networking, IT support, and AMC services. Our contact: Phone: +91 7858971869, +91 7370057723, Email: vedtechservice@gmail.com, Location: Samastipur, Bihar, India. Founder: Chandan Kumar Yajee. Co-founder: Arpit Singh Parihar. Be professional, helpful, and concise. If asked about services, mention our website pages: Services, Support (for raising tickets), Contact. Always be polite and customer-focused."
      }]
    });

    contents.push({
      role: "model",
      parts: [{
        text: "Hello! I'm the VedTech Services AI assistant. I'm here to help you with any questions about our IT services, support, or to guide you to the right resources. How can I assist you today?"
      }]
    });

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: any) => {
        contents.push({
          role: msg.type === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call Gemini API
    const apiUrl = 'https://app-99gjdx4fbuv5-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Gateway-Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to get AI response',
          details: errorText 
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse SSE stream response
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.candidates && parsed.candidates[0]?.content?.parts) {
                const text = parsed.candidates[0].content.parts[0]?.text;
                if (text) {
                  fullText += text;
                }
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    }

    // Return the complete response
    return new Response(
      JSON.stringify({ 
        response: fullText || 'I apologize, but I could not generate a response. Please try again or contact us directly at +91 7370057723.',
        success: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
