# Supabase Setup Checklist

## 🎯 Project Setup
- [ ] Go to supabase.com and create account
- [ ] Create new organization
- [ ] Create new project named `review-it-app`
- [ ] Wait for project setup (1-2 minutes)
- [ ] Go to Settings → API
- [ ] Copy Project URL
- [ ] Copy anon public key

## 📋 Environment Setup
- [ ] Create `.env.local` file in project root
- [ ] Add VITE_SUPABASE_URL
- [ ] Add VITE_SUPABASE_ANON_KEY
- [ ] Save `.env.local` file

## 🗄️ Database Setup
- [ ] Go to SQL Editor
- [ ] Copy content from `database_reset.sql`
- [ ] Paste and run SQL script
- [ ] Verify tables created (users, vendors, reviews, etc.)
- [ ] Check table structures in Table Editor

## 🧪 Testing
- [ ] Run `npm run dev`
- [ ] Open browser console
- [ ] Run `testSupabase()` function
- [ ] Check for connection success message
- [ ] Verify no authentication errors

## 📱 Component Migration (Next Phase)
- [ ] Update ProtectedRoute.jsx
- [ ] Update Login.jsx
- [ ] Update SignUpPage.jsx
- [ ] Update Register.jsx
- [ ] Update UserDashboard.jsx
- [ ] Update VendorDashboard.jsx
- [ ] Update AdminDashboard.jsx

## ✅ Success Criteria
- [ ] All tables created in Supabase
- [ ] Environment variables configured
- [ ] Supabase connection test passes
- [ ] No console errors on app start
- [ ] Authentication flows work correctly

## 🚨 Troubleshooting
**If you see CORS errors:**
- Check that VITE_SUPABASE_URL is correct
- Make sure your localhost is allowed in Supabase CORS settings

**If you see auth errors:**
- Verify VITE_SUPABASE_ANON_KEY is correct
- Check that project is not paused

**If you see database errors:**
- Run the SQL script again
- Check that all tables were created

## 📞 Ready for Next Step?
Once you complete the first 3 sections (Project Setup, Environment Setup, Database Setup), let me know and I'll help you migrate the first component!

**Current Status:** Not started
**Next Action:** Create Supabase project
