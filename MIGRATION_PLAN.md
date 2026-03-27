# Step-by-Step Supabase Migration Plan

## 🎯 Goal
Migrate from localStorage to Supabase while keeping the app functional at each step.

## 📋 Prerequisites
1. ✅ Supabase client created (`src/supabase.js`)
2. ✅ AuthContext created (`src/contexts/AuthContext.jsx`)  
3. ✅ Database utilities created (`src/utils/database.js`)
4. ✅ App.jsx updated with AuthProvider
5. ⏳ Environment variables configured (`.env.local`)

## 🚀 Migration Steps

### Step 1: Environment Setup
```bash
# Create .env.local file in project root
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Step 2: Database Setup
1. Go to your Supabase project
2. Open SQL Editor
3. Run the `database_reset.sql` script
4. Verify tables are created

### Step 3: Update ProtectedRoute Component
**File:** `src/components/ProtectedRoute.jsx`
- Replace localStorage auth check with useAuth hook
- Check user role from auth context

### Step 4: Migrate Authentication Pages
**Files to update:**
- `src/pages/Login.jsx`
- `src/pages/SignUpPage.jsx` 
- `src/pages/Register.jsx`

**Changes:**
- Import useAuth hook
- Replace localStorage operations with Supabase auth
- Handle auth states and errors

### Step 5: Migrate User Dashboard
**File:** `src/pages/user/UserDashboard.jsx`
**Changes:**
- Replace localStorage data fetching with db utilities
- Update user data management
- Maintain existing UI/UX

### Step 6: Migrate Vendor Dashboard
**File:** `src/pages/vendor/VendorDashboard.jsx`
**Changes:**
- Replace vendor data operations with db utilities
- Update profile management
- Keep existing functionality

### Step 7: Migrate Admin Dashboard
**File:** `src/pages/admin/AdminDashboard.jsx`
**Changes:**
- Replace admin operations with db utilities
- Update user/vendor management

### Step 8: Update Review Components
**Files to update:**
- Review form components
- Review display components
- Rating calculations

### Step 9: Clean Up
- Remove localStorage dependencies
- Test all functionality
- Optimize database queries

## 🔄 Testing Strategy
1. **Unit Testing:** Test each component individually
2. **Integration Testing:** Test user flows
3. **E2E Testing:** Test complete user journeys
4. **Performance Testing:** Check query performance

## 📊 Data Migration (Optional)
If you have existing localStorage data:
```javascript
// Create a migration script
const migrateData = async () => {
  // Migrate users
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  for (const user of users) {
    await db.createUser(user)
  }
  
  // Migrate vendors
  const vendors = JSON.parse(localStorage.getItem('vendors') || '[]')
  for (const vendor of vendors) {
    await db.createVendor(vendor)
  }
  
  // Migrate reviews
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
  for (const review of reviews) {
    await db.createReview(review)
  }
}
```

## 🎯 Success Criteria
- [ ] All authentication flows work with Supabase
- [ ] Data persists across sessions
- [ ] Real-time updates work (if implemented)
- [ ] No localStorage dependencies remain
- [ ] Performance is acceptable
- [ ] Error handling is robust

## 🚨 Common Issues & Solutions

### Issue: CORS errors
**Solution:** Add localhost to CORS settings in Supabase

### Issue: RLS policies blocking access
**Solution:** Check Row Level Security policies in Supabase

### Issue: Performance slow
**Solution:** Add database indexes, optimize queries

### Issue: Auth state not updating
**Solution:** Check AuthProvider implementation

## 📞 Next Steps
1. Complete Step 1-2 (Setup)
2. Migrate one component at a time
3. Test each migration step
4. Deploy and monitor

Would you like me to help you implement any specific step?
