import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'TUS_DATOS_DE_SUPABASE_URL'
const SUPABASE_ANON_KEY = 'TUS_DATOS_DE_SUPABASE_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)