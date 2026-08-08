import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fvdaqwyludcgclaktjtr.supabase.co/rest/v1/'
const SUPABASE_ANON_KEY = 'sb_publishable_Akn2W_RpStKe1GBh_HEtqw_Z7eDBd9g'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
