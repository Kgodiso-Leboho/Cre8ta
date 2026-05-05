// Mock data for Cre8ta Creator Platform - South African Edition
const tshepisoImg = "/public/creators/tshepiso-malema.jpg";
const lesleyImg = "/public/creators/lesley-zibu.jpg";
const bathuLogo = "/public/brands/Bathu.jpg";

// User Profiles - South African Creators
export const mockUsers = {
  creator: {
    id: "creator_tshepiso",
    name: "Tshepiso Malema",
    email: "tshepiso@cre8ta.com",
    role: "creator",
    avatar: tshepisoImg,
    coverImage: tshepisoImg,
    bio: "Joburg-based fashion and lifestyle creator. Showing you how to style local brands with international flair. 🇿🇦",
    location: "Johannesburg, South Africa",
    niches: ["Fashion", "Streetwear", "Lifestyle", "Sneakers"],
    socialLinks: {
      instagram: "@tshepiso_malema",
      tiktok: "@tshepiso.sa",
      youtube: "@TshepisoMalema",
      twitter: "@tshepiso_m"
    },
    metrics: {
      followers: 185000,
      engagement: 7.2,
      avgRate: 950,
      totalEarnings: 12450,
      monthlyViews: 890000,
      activeCampaigns: 4
    },
    profileStrength: 85,
    joinedDate: "2024-02-10",
    verified: true,
    topContent: [
      { title: "Bathu sneaker styling", views: "245K", likes: "18.5K" },
      { title: "Soweto street style", views: "189K", likes: "12.3K" },
      { title: "Local brands haul", views: "432K", likes: "31.2K" }
    ]
  },
  creator2: {
    id: "creator_lesley",
    name: "Lesley Zibu",
    email: "lesley@cre8ta.com",
    role: "creator",
    avatar: lesleyImg,
    coverImage: lesleyImg,
    bio: "Pretoria-based content creator. Celebrating South African culture, music, and fashion. Let's collab!",
    location: "Pretoria, South Africa",
    niches: ["Lifestyle", "Music", "Fashion", "Vlogs"],
    socialLinks: {
      instagram: "@lesley_zibu",
      tiktok: "@lesley.sa",
      youtube: "@LesleyZibu",
      twitter: "@lesley_zibu"
    },
    metrics: {
      followers: 142000,
      engagement: 8.1,
      avgRate: 750,
      totalEarnings: 8920,
      monthlyViews: 650000,
      activeCampaigns: 3
    },
    profileStrength: 78,
    joinedDate: "2024-03-05",
    verified: true,
    topContent: [
      { title: "Day in Pretoria CBD", views: "312K", likes: "24.1K" },
      { title: "GalXBoy unboxing", views: "178K", likes: "14.2K" },
      { title: "South African music review", views: "267K", likes: "19.8K" }
    ]
  },
  creator3: {
    id: "creator_linda",
    name: "Linda Zulu",
    email: "linda@cre8ta.com",
    role: "creator",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    coverImage: "https://randomuser.me/api/portraits/men/67.jpg",   
    location: "Durban, South Africa",
    niches: ["Fitness", "Health", "Lifestyle"],
    metrics: {
      followers: 98000,
      engagement: 6.5,
      avgRate: 550
    }
  },
  creator4: {
    id: "creator_thando",
    name: "Thando Dlamini",
    email: "thando@cre8ta.com",
    role: "creator",
    avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    location: "Cape Town, South Africa",
    niches: ["Travel", "Food", "Photography"],
    metrics: {
      followers: 156000,
      engagement: 5.9,
      avgRate: 800
    }
  }
};

// Brand Profiles - South African Brands
export const mockBrands = {
  brand1: {
    id: "brand_bathu",
    name: "Bathu",
    email: "collab@bathu.co.za",
    role: "brand",
    avatar: "https://logo.clearbit.com/bathu.co.za",
    coverImage: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    bio: "Premium South African sneaker brand. Designed in SA, worn by the world. #BathuFamily",
    location: "Johannesburg, South Africa",
    industry: "Fashion / Footwear",
    website: "https://bathu.co.za",
    founded: "2015",
    socialLinks: {
      instagram: "@bathu_sa",
      tiktok: "@bathu_sa",
      twitter: "@bathu_sa"
    },
    metrics: {
      activeCampaigns: 5,
      totalSpend: 45000,
      avgEngagement: 7.8,
      totalApplications: 124
    }
  },
  brand2: {
    id: "brand_galxboy",
    name: "GalXBoy",
    email: "partners@galxboy.com",
    role: "brand",
    avatar: "https://logo.clearbit.com/galxboy.com",
    coverImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
    bio: "Urban streetwear brand from Soweto. Representing the culture, for the culture.",
    location: "Soweto, South Africa",
    industry: "Streetwear / Fashion",
    website: "https://galxboy.com",
    founded: "2018",
    socialLinks: {
      instagram: "@galxboy",
      tiktok: "@galxboy"
    },
    metrics: {
      activeCampaigns: 3,
      totalSpend: 28000,
      avgEngagement: 8.2,
      totalApplications: 89
    }
  },
  brand3: {
    id: "brand_yangas",
    name: "Yangas",
    email: "hello@yangas.co.za",
    role: "brand",
    avatar: "https://logo.clearbit.com/yangas.co.za",
    coverImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    bio: "Authentic South African footwear. Comfort meets style, made for African feet.",
    location: "Cape Town, South Africa",
    industry: "Footwear / Fashion",
    website: "https://yangas.co.za",
    founded: "2016",
    socialLinks: {
      instagram: "@yangas_sa"
    },
    metrics: {
      activeCampaigns: 2,
      totalSpend: 15000,
      avgEngagement: 6.5,
      totalApplications: 45
    }
  },
  brand4: {
    id: "brand_maXhosa",
    name: "MaXhosa Africa",
    email: "collab@maxhosa.com",
    role: "brand",
    avatar: "https://logo.clearbit.com/maxhosa.com",
    coverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
    bio: "Luxury knitwear celebrating Xhosa heritage. Global brand with African soul.",
    location: "Johannesburg, South Africa",
    industry: "Luxury Fashion",
    website: "https://maxhosa.com",
    founded: "2010",
    socialLinks: {
      instagram: "@maxhosa",
      youtube: "@MaXhosaAfrica"
    },
    metrics: {
      activeCampaigns: 4,
      totalSpend: 75000,
      avgEngagement: 9.1,
      totalApplications: 167
    }
  },
  brand5: {
    id: "brand_sketchy",
    name: "Sketchy Souls",
    email: "hello@sketchysouls.com",
    role: "brand",
    avatar: "https://logo.clearbit.com/sketchysouls.com",
    coverImage: "https://images.unsplash.com/photo-1560769623-6ec69f8d23b2",
    bio: "Custom sneakers and streetwear. Each piece is a unique work of art.",
    location: "Durban, South Africa",
    industry: "Streetwear / Art",
    website: "https://sketchysouls.com",
    founded: "2019",
    socialLinks: {
      instagram: "@sketchysouls",
      tiktok: "@sketchysouls"
    },
    metrics: {
      activeCampaigns: 2,
      totalSpend: 12000,
      avgEngagement: 7.2,
      totalApplications: 38
    }
  },
  brand6: {
    id: "brand_mzansi",
    name: "Mzansi Fit",
    email: "collab@mzansifit.com",
    role: "brand",
    avatar: "https://logo.clearbit.com/mzansifit.com",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    bio: "Homegrown activewear for the modern South African. Train like a champion.",
    location: "Pretoria, South Africa",
    industry: "Fitness / Activewear",
    website: "https://mzansifit.com",
    founded: "2020",
    socialLinks: {
      instagram: "@mzansifit",
      tiktok: "@mzansifit"
    },
    metrics: {
      activeCampaigns: 3,
      totalSpend: 22000,
      avgEngagement: 5.8,
      totalApplications: 62
    }
  }
};

// Campaigns Data
export const mockCampaigns = [
  {
    id: "camp_001",
    brand: "Bathu",
    brandId: "brand_bathu",
    title: "Bathu Summer Drop 2026",
    budget: "R15,000 - R25,000",
    category: "Fashion",
    platform: "Instagram",
    deadline: "Dec 15, 2026",
    description: "We're looking for authentic creators to showcase our new summer sneaker collection. Show us how you style Bathu with your everyday fits.",
    requirements: [
      "10K+ followers minimum",
      "Fashion/Streetwear niche",
      "3 Instagram posts + 5 stories",
      "Must be based in SA"
    ],
    tags: ["sneakers", "streetwear", "summer", "local"],
    applications: 45,
    deliverables: 3,
    payment: "R18,000",
    status: "active",
    postedDate: "Nov 1, 2026"
  },
  {
    id: "camp_002",
    brand: "GalXBoy",
    brandId: "brand_galxboy",
    title: "GalXBoy Heritage Collection",
    budget: "R10,000 - R18,000",
    category: "Streetwear",
    platform: "TikTok",
    deadline: "Dec 30, 2026",
    description: "Celebrate South African street culture with our new heritage drop. Create engaging TikTok content that shows off our latest pieces.",
    requirements: [
      "20K+ TikTok followers",
      "Streetwear/Hip-hop niche",
      "2 TikTok videos (15-30 seconds)",
      "Must tag @galxboy"
    ],
    tags: ["streetwear", "urban", "culture", "tiktok"],
    applications: 38,
    deliverables: 2,
    payment: "R14,000",
    status: "active",
    postedDate: "Nov 5, 2025"
  },
  {
    id: "camp_003",
    brand: "MaXhosa Africa",
    brandId: "brand_maXhosa",
    title: "MaXhosa Heritage Month",
    budget: "R30,000 - R50,000",
    category: "Luxury Fashion",
    platform: "Instagram / YouTube",
    deadline: "Jun 15, 2026",
    description: "Celebrate heritage through fashion. We want creators who can tell powerful stories through our luxury knitwear collection.",
    requirements: [
      "50K+ followers minimum",
      "Fashion/Culture focus",
      "1 YouTube video + 2 IG posts",
      "High production quality"
    ],
    tags: ["luxury", "heritage", "fashion", "premium"],
    applications: 67,
    deliverables: 3,
    payment: "R40,000",
    status: "active",
    postedDate: "Jan 10, 2026"
  },
  {
    id: "camp_004",
    brand: "Yangas",
    brandId: "brand_yangas",
    title: "Yangas Everyday Comfort",
    budget: "R5,000 - R10,000",
    category: "Lifestyle",
    platform: "Instagram",
    deadline: "May 10, 2026",
    description: "Showcase how Yangas sneakers fit into your daily life. From running errands to casual outings, we want to see real moments.",
    requirements: [
      "5K+ followers",
      "Lifestyle/Fashion niche",
      "5 Instagram stories + 1 post",
      "Authentic, unscripted content"
    ],
    tags: ["comfort", "everyday", "casual"],
    applications: 23,
    deliverables: 2,
    payment: "R7,500",
    status: "active",
    postedDate: "Feb 15, 2026"
  },
  {
    id: "camp_005",
    brand: "Sketchy Souls",
    brandId: "brand_sketchy",
    title: "Custom Art Collaboration",
    budget: "R8,000 - R15,000",
    category: "Art",
    platform: "Instagram / TikTok",
    deadline: "Jul 5, 2026",
    description: "We want to see your creative process! Customize our sneakers or create art inspired by our brand.",
    requirements: [
      "10K+ followers",
      "Art/Creative niche",
      "Process video + final reveal",
      "Original artwork"
    ],
    tags: ["art", "custom", "creative", "process"],
    applications: 31,
    deliverables: 2,
    payment: "R11,000",
    status: "active",
    postedDate: "Mar 8, 2026"
  },
  {
    id: "camp_006",
    brand: "Mzansi Fit",
    brandId: "brand_mzansi",
    title: "New Year New You Challenge",
    budget: "R12,000 - R20,000",
    category: "Fitness",
    platform: "TikTok",
    deadline: "Aug 1, 2026",
    description: "Kick off 2026 with Mzansi Fit! Create fitness content that inspires your audience to get active in our gear.",
    requirements: [
      "15K+ followers",
      "Fitness/Wellness niche",
      "30-day challenge content series",
      "2 TikTok videos per week"
    ],
    tags: ["fitness", "health", "new year", "workout"],
    applications: 52,
    deliverables: 8,
    payment: "R16,000",
    status: "upcoming",
    postedDate: "Apr 20, 2026"
  }
];

// Creator Portfolio Mock Data
export const mockPortfolio = {
  tshepiso: [
    {
      id: "port_001",
      title: "Bathu 990v4 Styling",
      platform: "instagram",
      views: 245000,
      likes: 18500,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      date: "Oct 2025"
    },
    {
      id: "port_002",
      title: "Soweto Street Style featuring GalXBoy",
      platform: "tiktok",
      views: 432000,
      likes: 31200,
      image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b",
      date: "Sep 2025"
    },
    {
      id: "port_003",
      title: "Day in Joburg Vlog",
      platform: "youtube",
      views: 189000,
      likes: 12300,
      image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
      date: "Oct 2025"
    },
    {
      id: "port_004",
      title: "Local Brands Haul",
      platform: "instagram",
      views: 312000,
      likes: 24100,
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
      date: "Nov 2025"
    }
  ],
  lesley: [
    {
      id: "port_005",
      title: "Pretoria Street Style",
      platform: "instagram",
      views: 178000,
      likes: 14200,
      image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b",
      date: "Oct 2025"
    },
    {
      id: "port_006",
      title: "GalXBoy Unboxing & Review",
      platform: "youtube",
      views: 267000,
      likes: 19800,
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2",
      date: "Sep 2025"
    }
  ]
};



// Activity Feed Data
export const mockActivity = {
  tshepiso: [
    { text: "Bathu approved your campaign application", time: "2 hours ago", icon: "check", color: "#10B981" },
    { text: "GalXBoy sent you a message", time: "5 hours ago", icon: "message", color: "#3B82F6" },
    { text: "Your portfolio was viewed 156 times today", time: "1 day ago", icon: "eye", color: "#8B5CF6" },
    { text: "Payment of R18,000 received from Bathu", time: "2 days ago", icon: "dollar", color: "#F59E0B" },
    { text: "New follower milestone: 185K 🎉", time: "3 days ago", icon: "users", color: "#EC4899" }
  ],
  lesley: [
    { text: "MaXhosa Africa shortlisted your application", time: "1 hour ago", icon: "check", color: "#10B981" },
    { text: "Your TikTok went viral! 432K views", time: "3 hours ago", icon: "trending", color: "#FF006E" },
    { text: "Yangas wants to collaborate", time: "1 day ago", icon: "briefcase", color: "#3B82F6" }
  ]
};

// Earnings Data
export const mockEarnings = {
  tshepiso: {
    total: 12450,
    thisMonth: 3800,
    pending: 2200,
    withdrawn: 8650,
    currency: "ZAR",
    transactions: [
      { brand: "Bathu", amount: "+R18,000", date: "Nov 15, 2025", status: "paid" },
      { brand: "GalXBoy", amount: "+R14,000", date: "Nov 5, 2025", status: "paid" },
      { brand: "Yangas", amount: "+R7,500", date: "Oct 28, 2025", status: "paid" },
      { brand: "Sketchy Souls", amount: "+R11,000", date: "Oct 15, 2025", status: "pending" }
    ]
  },
  lesley: {
    total: 8920,
    thisMonth: 2450,
    pending: 1500,
    withdrawn: 4970,
    currency: "ZAR",
    transactions: [
      { brand: "MaXhosa Africa", amount: "+R40,000", date: "Nov 10, 2025", status: "pending" },
      { brand: "Mzansi Fit", amount: "+R16,000", date: "Oct 30, 2025", status: "paid" },
      { brand: "GalXBoy", amount: "+R14,000", date: "Oct 20, 2025", status: "paid" }
    ]
  }
};

// Analytics Data
export const mockAnalytics = {
  tshepiso: {
    reach: { value: "4.2M", delta: "+32%" },
    engagement: { value: "7.2%", delta: "+0.8%" },
    contentPieces: { value: "48", delta: "+12" },
    brandCollabs: { value: "15", delta: "+5" },
    weeklyData: [
      { week: "Week 1", views: 125000, engagement: 6.8 },
      { week: "Week 2", views: 142000, engagement: 7.1 },
      { week: "Week 3", views: 168000, engagement: 7.3 },
      { week: "Week 4", views: 189000, engagement: 7.5 }
    ]
  },
  lesley: {
    reach: { value: "2.8M", delta: "+45%" },
    engagement: { value: "8.1%", delta: "+1.2%" },
    contentPieces: { value: "32", delta: "+8" },
    brandCollabs: { value: "9", delta: "+3" }
  }
};

// Discover Creators List
export const mockDiscoverCreators = [
  {
    id: "creator_tshepiso",
    name: "Tshepiso Malema",
    niche: "Fashion & Streetwear",
    followers: "185K",
    engagement: "7.2%",
    rate: "R950/post",
    platforms: ["instagram", "tiktok", "youtube"],
    match: 98,
    location: "Johannesburg",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "creator_lesley",
    name: "lesley Zibu",
    niche: "Lifestyle & Culture",
    followers: "142K",
    engagement: "8.1%",
    rate: "R750/post",
    platforms: ["instagram", "tiktok", "youtube"],
    match: 94,
    location: "Pretoria",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "creator_linda",
    name: "Linda Zulu",
    niche: "Fitness & Health",
    followers: "98K",
    engagement: "6.5%",
    rate: "R550/post",
    platforms: ["instagram", "tiktok"],
    match: 87,
    location: "Durban",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: "creator_thando",
    name: "Thando Dlamini",
    niche: "Travel & Food",
    followers: "156K",
    engagement: "5.9%",
    rate: "R800/post",
    platforms: ["instagram", "youtube"],
    match: 82,
    location: "Cape Town",
    avatar: "https://randomuser.me/api/portraits/women/89.jpg"
  }
];

// Testimonials Data
export const mockTestimonials = [
  {
    id: "test_001",
    name: "Tshepiso Malema",
    role: "Fashion Creator · 185K followers",
    text: "Cre8ta has completely changed how I work with South African brands. I've done campaigns with Bathu, GalXBoy, and Yangas - all through the platform!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "test_002",
    name: "lesley Zibu",
    role: "Lifestyle Creator · 142K followers",
    text: "The AI tools helped me write better captions and my engagement went up by 40%. Best decision I made for my content career.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "test_003",
    name: "Theo Baloyi",
    role: "Founder, Bathu",
    text: "We've found incredible creators through Cre8ta. The quality of applications and the match rate is unmatched in the South African market.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/91.jpg"
  }
];

// Export individual users
export const tshepisoUser = mockUsers.creator;
export const lesleyUser = mockUsers.creator2;
export const lindaUser = mockUsers.creator3;
export const thandoUser = mockUsers.creator4;

export const bathuBrand = mockBrands.brand1;
export const galxboyBrand = mockBrands.brand2;
export const yangasBrand = mockBrands.brand3;
export const maxhosaBrand = mockBrands.brand4;
export const sketchyBrand = mockBrands.brand5;
export const mzansiFitBrand = mockBrands.brand6;

// Export arrays of users
export const getAllMockUsers = () => {
  return [
    mockUsers.creator,
    mockUsers.creator2,
    mockUsers.creator3,
    mockUsers.creator4,
    mockBrands.brand1,
    mockBrands.brand2,
    mockBrands.brand3,
    mockBrands.brand4,
    mockBrands.brand5,
    mockBrands.brand6
  ];
};

export const getAllMockBrands = () => {
  return [
    mockBrands.brand1,
    mockBrands.brand2,
    mockBrands.brand3,
    mockBrands.brand4,
    mockBrands.brand5,
    mockBrands.brand6
  ];
};

export const getAllMockCreators = () => {
  return [
    mockUsers.creator,
    mockUsers.creator2,
    mockUsers.creator3,
    mockUsers.creator4
  ];
};

// Helper function to get random mock data
export const getRandomCampaign = () => {
  return mockCampaigns[Math.floor(Math.random() * mockCampaigns.length)];
};

export const getCreatorById = (id) => {
  const creators = {
    "creator_tshepiso": mockUsers.creator,
    "creator_lesley": mockUsers.creator2,
    "creator_linda": mockUsers.creator3,
    "creator_thando": mockUsers.creator4
  };
  return creators[id] || mockUsers.creator;
};

export const getBrandById = (id) => {
  const brands = {
    "brand_bathu": mockBrands.brand1,
    "brand_galxboy": mockBrands.brand2,
    "brand_yangas": mockBrands.brand3,
    "brand_maXhosa": mockBrands.brand4,
    "brand_sketchy": mockBrands.brand5,
    "brand_mzansi": mockBrands.brand6
  };
  return brands[id] || mockBrands.brand1;
};

// Stats for landing page
export const mockStats = [
  { number: "12K+", label: "Creators" },
  { number: "800+", label: "Brands" },
  { number: "R2.4M+", label: "Paid Out" },
  { number: "94%", label: "Match Rate" }
];

// Helper functions for user management
export const getAllUsers = () => {
  const savedUsers = localStorage.getItem("cre8ta_users");
  if (savedUsers) {
    return JSON.parse(savedUsers);
  }
  return [];
};

export const findUserByEmail = (email) => {
  const users = getAllUsers();
  return users.find(user => user.email === email);
};

export const findUserByEmailAndPassword = (email, password) => {
  const users = getAllUsers();
  return users.find(user => user.email === email && user.password === password);
};

export const createUser = (userData) => {
  const users = getAllUsers();
  
  // Check if email exists
  if (findUserByEmail(userData.email)) {
    throw new Error("Email already registered");
  }
  
  const newUser = {
    id: `${userData.role}_${Date.now()}`,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role,
    avatar: userData.role === "creator" 
      ? "https://randomuser.me/api/portraits/lego/1.jpg" 
      : "https://logo.clearbit.com/example.com",
    bio: userData.role === "creator" 
      ? "New creator on Cre8ta platform" 
      : "New brand on Cre8ta platform",
    location: userData.role === "creator" ? "South Africa" : "",
    joinedDate: new Date().toISOString().split('T')[0],
    verified: false,
    metrics: userData.role === "creator" ? {
      followers: 0,
      engagement: 0,
      avgRate: 0,
      totalEarnings: 0,
      monthlyViews: 0,
      activeCampaigns: 0
    } : {
      activeCampaigns: 0,
      totalSpend: 0,
      avgEngagement: 0,
      totalApplications: 0
    }
  };
  
  users.push(newUser);
  localStorage.setItem("cre8ta_users", JSON.stringify(users));
  return newUser;
};

// In mockData.js, verify this function:
export const getCurrentUser = () => {
  const currentUser = localStorage.getItem("cre8ta_current_user");
  if (currentUser) {
    try {
      return JSON.parse(currentUser);
    } catch (e) {
      console.error("Error parsing user:", e);
      return null;
    }
  }
  return null;
};

export const logoutUser = () => {
  localStorage.removeItem("cre8ta_current_user");
};

export const updateUser = (userId, updates) => {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem("cre8ta_users", JSON.stringify(users));
    
    // Update current user if it's the same
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      localStorage.setItem("cre8ta_current_user", JSON.stringify(users[index]));
    }
    return users[index];
  }
  return null;
};

// Add this function to mockData.js
export const getUserAvatar = (user) => {
  if (user?.avatar) return user.avatar;
  
  // Default avatars based on role
  if (user?.role === "creator") {
    const defaultAvatars = [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/44.jpg",
      "https://randomuser.me/api/portraits/men/67.jpg",
      "https://randomuser.me/api/portraits/women/89.jpg"
    ];
    const index = user?.name?.charCodeAt(0) % defaultAvatars.length || 0;
    return defaultAvatars[index];
  }
  
  return "https://logo.clearbit.com/placeholder.com";
};

// Platform integrations
export const mockPlatforms = ["TikTok", "YouTube", "Instagram", "Twitter", "LinkedIn", "Podcast"];