// Add sample vendors if none exist
const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
if (vendors.length === 0) {
  const sampleVendors = [
    {
      id: 1,
      firstName: "Jean",
      lastName: "Mbah",
      businessName: "Douala Styles",
      category: "Fashion",
      socialMediaUrl: "@doualastyles",
      phone: "+237 6XX XXX XXX",
      email: "jean@doualastyles.com",
      password: "password123",
      role: "vendor",
      rating: 4.5,
      reviews: 12,
      profileViews: 245,
      platformVerified: true,
      communityVerified: false,
      scam: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      firstName: "Marie",
      lastName: "Ngue",
      businessName: "Tech Hub Cameroon",
      category: "Tech & Gadgets",
      socialMediaUrl: "@techhubcm",
      phone: "+237 6XX XXX XXX",
      email: "marie@techhubcm.com",
      password: "password123",
      role: "vendor",
      rating: 4.8,
      reviews: 28,
      profileViews: 512,
      platformVerified: true,
      communityVerified: true,
      scam: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      firstName: "Paul",
      lastName: "Kamga",
      businessName: "Food Express",
      category: "Food & Drinks",
      socialMediaUrl: "@foodexpresscm",
      phone: "+237 6XX XXX XXX",
      email: "paul@foodexpress.com",
      password: "password123",
      role: "vendor",
      rating: 3.9,
      reviews: 8,
      profileViews: 156,
      platformVerified: false,
      communityVerified: true,
      scam: false,
      createdAt: new Date().toISOString()
    }
  ];
  localStorage.setItem('vendors', JSON.stringify(sampleVendors));
  console.log('Added sample vendors for demonstration');
}
