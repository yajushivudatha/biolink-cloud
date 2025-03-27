import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdcozsdcbiusjyifmrdb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkY296c2RjYml1c2p5aWZtcmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMzQyMjQsImV4cCI6MjA1NDkxMDIyNH0.YjZWzLxwFiZh-0FIzOHcRO5zBUPB5HoGRDy6UhSjemo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
