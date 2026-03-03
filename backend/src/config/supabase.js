const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Pull the variables from your .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Fail fast if the environment variables are missing
if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials. Check your .env file.");
    process.exit(1); 
}

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase client initialized successfully.");

module.exports = supabase;