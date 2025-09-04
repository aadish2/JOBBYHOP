import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gthqtabzzstwrxsyinov.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHF0YWJ6enN0d3J4c3lpbm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5OTk5NjksImV4cCI6MjA3MjU3NTk2OX0.T36GSpqarjcvPkITxpTm8n1hk526nPpNu0jJ0lZ6M7A"
export const supabase = createClient(supabaseUrl, supabaseKey)
