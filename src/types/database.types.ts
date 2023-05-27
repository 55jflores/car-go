export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      NissanAltima: {
        Row: {
          contact: string | null
          created_at: string | null
          id: string
          pictures: string[] | null
          price: string | null
          year: string | null
        }
        Insert: {
          contact?: string | null
          created_at?: string | null
          id?: string
          pictures?: string[] | null
          price?: string | null
          year?: string | null
        }
        Update: {
          contact?: string | null
          created_at?: string | null
          id?: string
          pictures?: string[] | null
          price?: string | null
          year?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
