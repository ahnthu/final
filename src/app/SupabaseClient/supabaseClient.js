// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and API Key
const SUPABASE_URL = 'https://cczjxsivuykwpfeqohbq.supabase.co'; // Your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjemp4c2l2dXlrd3BmZXFvaGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMzUwNzUsImV4cCI6MjA0MjgxMTA3NX0.nodRUAFedA_a9GcF-suMSGZ4GjqazE1q_3urKkugXVs'; // Your Supabase anon/public API key

export const supabasex = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
