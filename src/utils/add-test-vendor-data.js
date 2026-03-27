/* src/utils/add-test-vendor-data.js */
// Add test vendor data to localStorage

export function addTestVendorData() {
  console.log('🔧 Adding test vendor data to localStorage...');
  
  // Create test user
  const testUser = {
    id: "vendor-123",
    email: "vendor@example.com",
    role: "vendor",
    fullName: "Test Vendor"
  };
  
  // Create test vendors
  const testVendors = [
    {
      id: "vendor-123",
      firstName: "Jean",
      lastName: "Mbah",
      businessName: "Douala Styles",
      category: "Fashion",
      socialMediaUrl: "@doualastyles",
      phone: "+237 6XX XXX XXX",
      email: "vendor@example.com",
      role: "vendor",
      rating: 4.5,
      reviews: 12,
      profileViews: 156,
      platformVerified: true,
      communityVerified: false,
      scam: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "vendor-456",
      firstName: "Sarah",
      lastName: "Johnson",
      businessName: "Tech Hub",
      category: "Tech & Gadgets",
      socialMediaUrl: "@techhub",
      phone: "+237 7XX XXX XXX",
      email: "sarah@example.com",
      role: "vendor",
      rating: 3.8,
      reviews: 8,
      profileViews: 89,
      platformVerified: false,
      communityVerified: true,
      scam: false,
      createdAt: new Date().toISOString()
    }
  ];
  
  // Create test reviews
  const testReviews = [
    {
      id: "review-1",
      vendorId: "vendor-123",
      userId: "user-1",
      rating: 5,
      comment: "Great service and quality products!",
      createdAt: new Date().toISOString()
    },
    {
      id: "review-2",
      vendorId: "vendor-123",
      userId: "user-2",
      rating: 4,
      comment: "Good communication, fast delivery",
      createdAt: new Date().toISOString()
    }
  ];
  
  // Save to localStorage
  localStorage.setItem("user", JSON.stringify(testUser));
  localStorage.setItem("vendors", JSON.stringify(testVendors));
  localStorage.setItem("reviews", JSON.stringify(testReviews));
  localStorage.setItem("userSearches", JSON.stringify([]));
  
  console.log('✅ Test data added successfully!');
  console.log('👤 Test user:', testUser);
  console.log('🏪 Test vendors:', testVendors);
  console.log('⭐ Test reviews:', testReviews);
  
  // Reload the page to see the changes
  window.location.reload();
}

// Make available in console
window.addTestVendorData = addTestVendorData;

console.log('🔧 Test data creator loaded. Run: addTestVendorData()');
