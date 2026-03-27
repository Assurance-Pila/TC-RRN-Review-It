-- Supabase Database Reset Script
-- Run this in your Supabase SQL Editor to delete and recreate all tables

-- Step 1: Drop all existing tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS user_searches CASCADE;
DROP TABLE IF EXISTS user_activity CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS vendors CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Step 2: Recreate tables with proper structure

-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'vendor', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendors table  
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
  role VARCHAR(50) DEFAULT 'vendor' CHECK (role IN ('user', 'vendor', 'admin')),
  rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews INTEGER DEFAULT 0 CHECK (reviews >= 0),
  profile_views INTEGER DEFAULT 0 CHECK (profile_views >= 0),
  platform_verified BOOLEAN DEFAULT FALSE,
  community_verified BOOLEAN DEFAULT FALSE,
  scam BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
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

-- User Activity table
CREATE TABLE user_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(100),
  text TEXT,
  time VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Searches table
CREATE TABLE user_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  search_query VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_vendors_email ON vendors(email);
CREATE INDEX idx_vendors_category ON vendors(category);
CREATE INDEX idx_vendors_rating ON vendors(rating DESC);
CREATE INDEX idx_reviews_vendor_id ON reviews(vendor_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_user_activity_created_at ON user_activity(created_at DESC);
CREATE INDEX idx_user_searches_user_id ON user_searches(user_id);
CREATE INDEX idx_user_searches_created_at ON user_searches(created_at DESC);

-- Step 4: Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_searches ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Vendors can be viewed by everyone, but only updated by themselves
CREATE POLICY "Vendors are viewable by everyone" ON vendors FOR SELECT USING (true);
CREATE POLICY "Vendors can update own profile" ON vendors FOR UPDATE USING (auth.uid() = id);

-- Reviews are viewable by everyone, but only created by authenticated users
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- User activity and searches are private to the user
CREATE POLICY "User activity is private" ON user_activity FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User searches are private" ON user_searches FOR ALL USING (auth.uid() = user_id);

-- Step 6: Insert some sample data (optional)
-- You can uncomment this section to add sample data for testing

/*
-- Sample users
INSERT INTO users (email, password, full_name, role) VALUES
('user@example.com', 'password123', 'John Doe', 'user'),
('admin@example.com', 'password123', 'Admin User', 'admin');

-- Sample vendors
INSERT INTO vendors (email, password, first_name, last_name, business_name, category, social_media_url, phone, role, platform_verified, community_verified) VALUES
('vendor1@example.com', 'password123', 'Jean', 'Mbah', 'Douala Styles', 'Fashion', '@doualastyles', '+237 6XX XXX XXX', 'vendor', true, false),
('vendor2@example.com', 'password123', 'Marie', 'Ngue', 'Tech Hub Cameroon', 'Tech & Gadgets', '@techhubcm', '+237 6XX XXX XXX', 'vendor', true, true);

-- Sample reviews
INSERT INTO reviews (vendor_id, reviewer_name, rating, comment, verified_purchase) VALUES
((SELECT id FROM vendors WHERE email = 'vendor1@example.com'), 'Happy Customer', 5, 'Excellent service and quality products!', true),
((SELECT id FROM vendors WHERE email = 'vendor1@example.com'), 'Regular Buyer', 4, 'Good communication, fast delivery', true);
*/

-- Step 7: Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Database tables created successfully!' as status;
