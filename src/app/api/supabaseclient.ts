import { createClient } from '@supabase/supabase-js'
import {Database} from '../../types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Creating supabase client for use in other components (will be using same client in each component as oppose to re-initializing client)
const supabaseClient = createClient<Database>(supabaseUrl as string, supabaseAnonKey as string)

export default supabaseClient;