/* src/utils/database.js */
import { supabase } from '../supabase'

export { supabase } // Export supabase for use in other components
export const db = {
  // Users
  async createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
    return { data, error }
  },

  async getUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async getUserByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    return { data, error }
  },

  // Vendors
  async createVendor(vendorData) {
    const { data, error } = await supabase
      .from('vendors')
      .insert(vendorData)
      .select()
      .single()
    return { data, error }
  },

  async getVendors() {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getVendor(vendorId) {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('id', vendorId)
      .single()
    return { data, error }
  },

  async getVendorByEmail(email) {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('email', email)
      .single()
    return { data, error }
  },

  async updateVendor(vendorId, updates) {
    const { data, error } = await supabase
      .from('vendors')
      .update(updates)
      .eq('id', vendorId)
      .select()
      .single()
    return { data, error }
  },

  // Reviews
  async createReview(reviewData) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single()
    return { data, error }
  },

  async getVendorReviews(vendorId) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getAllReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // User Activity
  async logActivity(activityData) {
    const { data, error } = await supabase
      .from('user_activity')
      .insert(activityData)
      .select()
      .single()
    return { data, error }
  },

  async getUserActivity(userId) {
    const { data, error } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    .limit(50)
    return { data, error }
  },

  // User Searches
  async logSearch(searchData) {
    const { data, error } = await supabase
      .from('user_searches')
      .insert(searchData)
      .select()
      .single()
    return { data, error }
  },

  async getUserSearches(userId) {
    const { data, error } = await supabase
      .from('user_searches')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    .limit(20)
    return { data, error }
  }
}
