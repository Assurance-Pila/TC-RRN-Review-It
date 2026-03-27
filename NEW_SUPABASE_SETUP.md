# New Supabase Project Setup Guide

## 🚀 Step 1: Create New Supabase Project

### 1. Go to Supabase Dashboard
- Visit [supabase.com](https://supabase.com)
- Click **"Start your project"** or **"New Project"**
- Sign in or create an account

### 2. Create Organization
- Enter organization name: `Review It` or your preference
- Choose your region (closest to your users)

### 3. Create Project
- **Project name:** `review-it-app` 
- **Database password:** Create a strong password (save it!)
- **Region:** Same as organization
- Click **"Create new project"**

### 4. Wait for Setup
- Supabase will take 1-2 minutes to set up
- You'll see a progress bar

## 🎯 Step 2: Get Your Credentials

Once project is ready:

1. Click on **Settings** (gear icon)
2. Go to **API** section
3. You'll see:
   - **Project URL** (something like `https://xxxxxxxx.supabase.co`)
   - **anon public** key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 📋 Step 3: Configure Environment Variables

Create `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Replace with your actual values from Step 2!**

## 🗄️ Step 4: Set Up Database

1. Go to **SQL Editor** in Supabase
2. Copy the entire content from `database_reset.sql`
3. Paste it into the SQL Editor
4. Click **"Run"** to create all tables

## ✅ Step 5: Verify Setup

### Check Tables:
1. Go to **Table Editor**
2. You should see:
   - `users`
   - `vendors` 
   - `reviews`
   - `user_activity`
   - `user_searches`

### Check Authentication:
1. Go to **Authentication** → **Settings**
2. Make sure **"Enable email confirmations"** is OFF (for development)

## 🧪 Step 6: Test Connection

Start your development server:

```bash
npm run dev
```

Check browser console for any Supabase connection errors.

## 🔧 Step 7: Update Components (I'll help you with this)

We'll update these files one by one:
1. `ProtectedRoute.jsx` - Authentication check
2. `Login.jsx` - Sign in functionality  
3. `SignUpPage.jsx` - User registration
4. `Register.jsx` - Vendor registration
5. Dashboard components

## 🎯 Quick Start Commands

Once you have your Supabase credentials:

```bash
# 1. Create environment file
echo "VITE_SUPABASE_URL=your-url" > .env.local
echo "VITE_SUPABASE_ANON_KEY=your-key" >> .env.local

# 2. Install dependencies (if needed)
npm install

# 3. Start development
npm run dev
```

## 🚨 Important Notes

1. **Never commit `.env.local` to git**
2. **Save your database password securely**
3. **Keep your anon key private** (it's okay in frontend code)
4. **Test in development first** before production

## 📞 Ready for Next Step?

Once you've:
- ✅ Created the Supabase project
- ✅ Copied your URL and anon key
- ✅ Created `.env.local` file
- ✅ Run the database setup script

**Let me know and I'll help you migrate the first component!**

Which step would you like me to help you with next? 🚀
