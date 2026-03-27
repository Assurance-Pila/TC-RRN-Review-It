/* src/utils/simple-test.js */
// Simple test to check if vendor dashboard works

export function simpleTest() {
  console.log('🧪 Running simple vendor dashboard test...');
  
  // First, let's add minimal test data
  const testVendor = {
    id: "test-123",
    firstName: "Test",
    lastName: "Vendor",
    businessName: "Test Business",
    category: "Fashion",
    socialMediaUrl: "@testbusiness",
    phone: "+237 123 456 789",
    email: "test@example.com",
    role: "vendor",
    rating: 4.5,
    reviews: 5,
    profileViews: 100,
    platformVerified: true,
    communityVerified: false,
    scam: false
  };
  
  const testUser = {
    id: "test-123",
    email: "test@example.com",
    role: "vendor"
  };
  
  // Save to localStorage
  localStorage.setItem("user", JSON.stringify(testUser));
  localStorage.setItem("vendors", JSON.stringify([testVendor]));
  localStorage.setItem("reviews", JSON.stringify([]));
  
  console.log('✅ Test data saved');
  console.log('👤 User:', testUser);
  console.log('🏪 Vendor:', testVendor);
  
  // Check if it's there
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const savedVendors = JSON.parse(localStorage.getItem("vendors"));
  const currentVendor = savedVendors.find(v => v.email === savedUser.email);
  
  console.log('🔍 Verification:');
  console.log('- Saved user:', savedUser);
  console.log('- Saved vendors:', savedVendors);
  console.log('- Current vendor:', currentVendor);
  
  if (currentVendor) {
    console.log('✅ Test passed! Vendor data found in localStorage');
    console.log('🔄 Reloading page to apply changes...');
    window.location.reload();
  } else {
    console.log('❌ Test failed! Vendor data not found');
  }
}

// Make available in console
window.simpleTest = simpleTest;

console.log('🔧 Simple test loaded. Run: simpleTest()');
