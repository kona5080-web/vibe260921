import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tables = {
  posts: {
    Row: {
      id: number
      title: string
      content: string
      author: string
      created_at: string
      updated_at: string
      views: number
    }
    Insert: {
      title: string
      content: string
      author: string
    }
    Update: {
      title?: string
      content?: string
      author?: string
    }
  }
}
