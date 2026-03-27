# Supabase Integration Guide

## Step 1: Setup Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Go to Project Settings > API
4. Copy your Project URL and anon key
5. Create `.env.local` file in project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 2: Database Schema

### Tables to Create:

#### 1. users table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2. vendors table
```sql
CREATE TABLE vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  business_name VARCHAR(255),
  category VARCHAR(255),
  social_media_url VARCHAR(500),
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'vendor',
  rating DECIMAL(3,2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  profile_views INTEGER DEFAULT 0,
  platform_verified BOOLEAN DEFAULT FALSE,
  community_verified BOOLEAN DEFAULT FALSE,
  scam BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. reviews table
```sql
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  reviewer_name VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  verified_purchase BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 4. user_activity table
```sql
CREATE TABLE user_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(100),
  text TEXT,
  time VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 5. user_searches table
```sql
CREATE TABLE user_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  search_query VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Step 3: Delete and Recreate Tables

### Option A: Using Supabase Dashboard
1. Go to your Supabase project
2. Click on "Table Editor" in the left sidebar
3. Select each table (users, vendors, reviews, etc.)
4. Click the three dots menu and select "Delete"
5. Confirm deletion
6. Go to "SQL Editor" and run the CREATE TABLE statements above

### Option B: Using SQL Script
```sql
-- Drop all tables in correct order (due to foreign keys)
DROP TABLE IF EXISTS user_searches CASCADE;
DROP TABLE IF EXISTS user_activity CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Recreate all tables
-- (Paste the CREATE TABLE statements from Step 2 here)
```

## Step 4: Create Supabase Client

Create `src/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Step 5: Create Auth Context

Create `src/contexts/AuthContext.jsx`:

```javascript
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    loading,
    signUp: async (email, password, options) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options
      })
      return { data, error }
    },
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      return { data, error }
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      return { error }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

## Step 6: Update App.jsx

```javascript
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

// Your existing imports...

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Your existing App content */}
      </AuthProvider>
    </BrowserRouter>
  )
}
```

## Step 7: Migrate Components

Example migration for Login component:

```javascript
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      // Check user role and navigate accordingly
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()
      
      const role = profile?.role || 'user'
      if (role === 'vendor') navigate('/vendor')
      else if (role === 'admin') navigate('/admin')
      else navigate('/user')
    }
    
    setLoading(false)
  }

  // Rest of your component...
}
```

## Step 8: Database Functions

Create helper functions for database operations:

```javascript
// src/utils/database.js
import { supabase } from '../supabase'

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
  }
}
```

## Next Steps

1. Follow Steps 1-3 to set up Supabase and database
2. Create the authentication system (Steps 4-6)
3. Migrate components gradually (Step 7)
4. Test each component as you migrate
5. Remove localStorage dependencies

Would you like me to help you implement any specific step?
