// --- DASHBOARD & GENERAL STATS ---
export const statsData = [
  { title: "Total Students", value: 1250, change: "+12%", type: "increase" },
  { title: "Total Teachers", value: 45, change: "+5%", type: "increase" },
  { title: "Total Courses", value: 18, change: "0%", type: "neutral" },
  { title: "Total Tests", value: 64, change: "+8%", type: "increase" },
  { title: "Total Batches", value: 12, change: "-2%", type: "decrease" },
];

export const kpiData = [
  { title: "Student Growth", value: "18.5%", trend: "up" },
  { title: "Teacher Utilization", value: "85%", trend: "up" },
  { title: "Avg Attendance", value: "76%", trend: "down" },
  { title: "Revenue / Student", value: "₹4,200", trend: "up" },
];

export const auditLogData = [
  { time: '10:42 AM', action: 'Failed Login Attempt (IP: 192.168.x.x)', severity: 'High' },
  { time: '09:15 AM', action: 'Role Updated for User: Amit S.', severity: 'Medium' },
  { time: 'Yesterday', action: 'Backup Completed Successfully', severity: 'Low' },
  { time: 'Yesterday', action: 'New Admin Added', severity: 'High' },
];

export const liveClassesData = [
  { name: 'Consti Law - Article 21', teacher: 'Amit Sharma', students: 142, status: 'Live' },
  { name: 'Tort Law - Negligence', teacher: 'Priya Verma', students: 89, status: 'Live' },
  { name: 'Judiciary Mains Prep', teacher: 'Rajesh Gupta', students: 0, status: 'Starting in 15m' },
];

export const pendingActionsData = [
  { type: 'Teacher Approval', count: 3, color: 'blue' },
  { type: 'Refund Request', count: 5, color: 'red' },
  { type: 'Course Review', count: 2, color: 'purple' },
  { type: 'Certificate Issue', count: 12, color: 'green' },
];

export const activityHeatmapData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  value: Math.floor(Math.random() * 100)
}));

// --- TEACHER MANAGEMENT DATA ---
export const teacherStats = {
  total: 45,
  active: 38,
  pending: 4,
  suspended: 3,
  avgRating: 4.6
};

export const teachersData = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit.sharma@lawacademy.com",
    phone: "+91 98765 43210",
    avatar: "AS",
    subject: "Constitutional Law",
    type: "Full-time",
    status: "Approved",
    rating: 4.8,
    attendance: 92,
    classesConducted: 145,
    salary: "Monthly Fixed",
    salaryAmount: 85000,
    contractExpiry: "2025-12-31",
    joinDate: "2022-01-15",
    liveHours: 120,
    courses: ["CLAT 2025", "Judiciary Foundation"],
    kycStatus: "Verified",
    documents: ["Contract_2024.pdf", "Aadhar_Card.pdf", "LLM_Degree.pdf"],
    reviews: [
      { student: "Rahul K.", rating: 5, comment: "Excellent conceptual clarity." },
      { student: "Priya M.", rating: 4, comment: "Goes a bit fast in class." }
    ],
    payouts: [
      { month: "Mar 2024", amount: 85000, status: "Paid", date: "2024-04-01" },
      { month: "Feb 2024", amount: 85000, status: "Paid", date: "2024-03-01" }
    ]
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya.verma@lawacademy.com",
    phone: "+91 87654 32109",
    avatar: "PV",
    subject: "Criminal Law",
    type: "Part-time",
    status: "Pending",
    rating: 4.5,
    attendance: 0,
    classesConducted: 0,
    salary: "Per Class",
    salaryAmount: 2500,
    contractExpiry: "2024-06-30",
    joinDate: "2024-03-20",
    liveHours: 0,
    courses: [],
    kycStatus: "Pending",
    documents: ["Resume.pdf"],
    reviews: [],
    payouts: []
  },
  {
    id: 3,
    name: "Rajesh Gupta",
    email: "rajesh.gupta@lawacademy.com",
    phone: "+91 76543 21098",
    avatar: "RG",
    subject: "Civil Procedure",
    type: "Full-time",
    status: "Approved",
    rating: 4.9,
    attendance: 98,
    classesConducted: 210,
    salary: "Monthly Fixed",
    salaryAmount: 95000,
    contractExpiry: "2026-03-15",
    joinDate: "2021-06-01",
    liveHours: 350,
    courses: ["Judiciary Mains", "AIBE Cracker"],
    kycStatus: "Verified",
    documents: ["Contract_Signed.pdf", "Pan_Card.pdf", "PhD_Thesis.pdf"],
    reviews: [
      { student: "Vikram S.", rating: 5, comment: "Best teacher for CPC hands down." }
    ],
    payouts: [
      { month: "Mar 2024", amount: 95000, status: "Paid", date: "2024-04-01" }
    ]
  },
  {
    id: 4,
    name: "Sneha Singh",
    email: "sneha.singh@lawacademy.com",
    phone: "+91 65432 10987",
    avatar: "SS",
    subject: "Torts",
    type: "Visiting Faculty",
    status: "Rejected",
    rating: 3.2,
    attendance: 45,
    classesConducted: 12,
    salary: "Commission",
    salaryAmount: "20%",
    contractExpiry: "N/A",
    joinDate: "2024-01-10",
    liveHours: 15,
    courses: [],
    kycStatus: "Rejected",
    documents: ["Resume.pdf", "ID_Proof.pdf"],
    reviews: [
      { student: "Ankit R.", rating: 2, comment: "Classes are often cancelled." }
    ],
    payouts: []
  },
];

// --- STUDENT MANAGEMENT DATA ---
export const studentStats = {
  total: 1250,
  active: 1120,
  suspended: 45,
  certified: 320,
  avgCompletion: 68
};

export const studentsData = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul.k@example.com",
    phone: "+91 91234 56789",
    avatar: "RK",
    batch: "CLAT 2024 Alpha",
    course: "Comprehensive CLAT 2025",
    enrollmentDate: "2023-11-15",
    status: "Active",
    progress: 75,
    attendance: 88,
    lastLogin: "2 hrs ago",
    timeSpent: "45h 20m",
    riskLevel: "Low",
    paymentStatus: "Paid",
    feePlan: "One-time",
    totalFee: 45000,
    paidFee: 45000,
    pendingFee: 0,
    tickets: 0,
    modules: [
      { name: "Legal Reasoning", progress: 90, status: "Completed" },
      { name: "Current Affairs", progress: 60, status: "In Progress" },
      { name: "English", progress: 40, status: "Pending" }
    ],
    tests: [
      { name: "Mock 1", score: 85, rank: 45 },
      { name: "Mock 2", score: 92, rank: 12 }
    ],
    payments: [
      { id: 101, amount: 45000, date: "2023-11-15", status: "Success", invoice: "INV-2023-001" }
    ]
  },
  {
    id: 2,
    name: "Anjali Das",
    email: "anjali.d@example.com",
    phone: "+91 98765 01234",
    avatar: "AD",
    batch: "AIBE 2024 - Batch B",
    course: "AIBE Cracker",
    enrollmentDate: "2024-01-10",
    status: "Suspended",
    progress: 45,
    attendance: 60,
    lastLogin: "5 days ago",
    timeSpent: "12h 10m",
    riskLevel: "High",
    paymentStatus: "Pending",
    feePlan: "EMI",
    totalFee: 25000,
    paidFee: 10000,
    pendingFee: 15000,
    tickets: 2,
    modules: [
      { name: "Family Law", progress: 100, status: "Completed" },
      { name: "IPC", progress: 20, status: "In Progress" }
    ],
    tests: [
      { name: "Mock 1", score: 45, rank: 120 }
    ],
    payments: [
      { id: 102, amount: 10000, date: "2024-01-10", status: "Success", invoice: "INV-2024-045" },
      { id: 103, amount: 5000, date: "2024-02-10", status: "Failed", invoice: "INV-2024-098" }
    ]
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+91 88888 77777",
    avatar: "VM",
    batch: "Judiciary Mains 2025",
    course: "Judiciary Foundation",
    enrollmentDate: "2023-08-01",
    status: "Active",
    progress: 95,
    attendance: 98,
    lastLogin: "10 mins ago",
    timeSpent: "120h 05m",
    riskLevel: "Low",
    paymentStatus: "Paid",
    feePlan: "Subscription",
    totalFee: 60000,
    paidFee: 60000,
    pendingFee: 0,
    tickets: 0,
    modules: [
      { name: "CPC", progress: 100, status: "Completed" },
      { name: "CrPC", progress: 100, status: "Completed" },
      { name: "Evidence", progress: 90, status: "In Progress" }
    ],
    tests: [
      { name: "Mains Answer Writing 1", score: 78, rank: 5 },
      { name: "Prelims Mock 5", score: 98, rank: 1 }
    ],
    payments: [
      { id: 105, amount: 60000, date: "2023-08-01", status: "Success", invoice: "INV-2023-005" }
    ]
  },
  {
    id: 4,
    name: "Sohan Singh",
    email: "sohan.s@example.com",
    phone: "+91 99999 00000",
    avatar: "SS",
    batch: "CLAT 2024 Beta",
    course: "Comprehensive CLAT 2025",
    enrollmentDate: "2024-02-20",
    status: "Active",
    progress: 15,
    attendance: 72,
    lastLogin: "1 day ago",
    timeSpent: "5h 30m",
    riskLevel: "Medium",
    paymentStatus: "Pending",
    feePlan: "EMI",
    totalFee: 45000,
    paidFee: 15000,
    pendingFee: 30000,
    tickets: 1,
    modules: [
      { name: "Legal Reasoning", progress: 20, status: "In Progress" }
    ],
    tests: [],
    payments: [
      { id: 108, amount: 15000, date: "2024-02-20", status: "Success", invoice: "INV-2024-112" }
    ]
  }
];

// --- COURSE & BATCH MANAGEMENT DATA ---
export const courseStats = {
  total: 18,
  active: 15,
  archived: 3,
  batches: 12,
  avgCompletion: 72
};

export const coursesData = [
  {
    id: 1,
    title: "Complete CLAT 2025 Masterclass",
    thumbnail: "CLAT",
    category: "CLAT",
    difficulty: "Hard",
    language: "English",
    price: 4999,
    status: "Active",
    enrolled: 1250,
    batches: ["Batch Alpha (Morning)", "Batch Beta (Evening)"],
    primaryTeacher: "Amit Sharma",
    modules: [
      {
        title: "Constitutional Law",
        lessons: [
          { title: "Introduction to Preamble", type: "Video", duration: "45m", isLocked: false },
          { title: "Fundamental Rights", type: "PDF", duration: "15m", isLocked: true }
        ]
      },
      {
        title: "Legal Reasoning",
        lessons: [
          { title: "Law of Torts", type: "Video", duration: "1h 20m", isLocked: false }
        ]
      }
    ],
    materials: [
      { name: "Constitution Bare Act.pdf", type: "PDF", category: "Notes" },
      { name: "Legal Maxims List.pdf", type: "PDF", category: "Cheat Sheet" }
    ],
    performance: {
      completionRate: 68,
      dropoutRate: 5,
      rating: 4.8,
      enrollmentTrend: [{ month: 'Jan', count: 120 }, { month: 'Feb', count: 180 }, { month: 'Mar', count: 250 }]
    },
    faqs: [{ q: "Is this live?", a: "Yes, mostly live classes." }]
  },
  {
    id: 2,
    title: "AIBE Crack Course",
    thumbnail: "AIBE",
    category: "AIBE",
    difficulty: "Medium",
    language: "Hindi",
    price: 2999,
    status: "Active",
    enrolled: 850,
    batches: ["Weekend Batch"],
    primaryTeacher: "Priya Verma",
    modules: [
      {
        title: "AIBE Syllabus Overview",
        lessons: [{ title: "Exam Pattern", type: "Video", duration: "10m", isLocked: false }]
      }
    ],
    materials: [{ name: "Previous Year Papers.zip", type: "Archive", category: "PYQ" }],
    performance: {
      completionRate: 75,
      dropoutRate: 2,
      rating: 4.2,
      enrollmentTrend: [{ month: 'Jan', count: 80 }, { month: 'Feb', count: 90 }, { month: 'Mar', count: 110 }]
    },
    faqs: [{ q: "Validity?", a: "6 Months" }]
  },
  {
    id: 3,
    title: "Judiciary Prelims Booster",
    thumbnail: "JUD",
    category: "Judiciary",
    difficulty: "Hard",
    language: "English/Hindi",
    price: 6999,
    status: "Draft",
    enrolled: 0,
    batches: [],
    primaryTeacher: "Rajesh Gupta",
    modules: [],
    materials: [],
    performance: {
      completionRate: 0,
      dropoutRate: 0,
      rating: 0,
      enrollmentTrend: []
    },
    faqs: []
  },
];

// NEW: Test Stats
export const testStats = {
  total: 64,
  active: 12,
  upcoming: 5,
  avgAttemptRate: 85,
  avgScore: 72
};

export const testsData = [
  {
    id: 1,
    name: "CLAT Mock 1",
    examType: "CLAT",
    category: "Full Length",
    questions: 150,
    time: 120,
    status: "Live",
    negMarking: 0.25,
    cutoff: 85,
    difficulty: "Hard",
    attempts: 1250,
    avgScore: 72,
    rankList: [
      { rank: 1, student: "Vikram M.", score: 142, time: "110 min" },
      { rank: 2, student: "Rahul K.", score: 138, time: "118 min" },
      { rank: 3, student: "Simran J.", score: 135, time: "115 min" }
    ],
    sections: [
      { name: "Legal Reasoning", questions: 35, difficulty: "Hard" },
      { name: "Current Affairs", questions: 30, difficulty: "Medium" }
    ],
    analytics: {
      accuracy: 72,
      speedData: [{ name: '0-30m', questions: 40 }, { name: '30-60m', questions: 35 }, { name: '60-90m', questions: 45 }],
      topicPerformance: [{ name: 'Torts', score: 80 }, { name: 'Contracts', score: 65 }, { name: 'Constitution', score: 90 }]
    }
  },
  {
    id: 2,
    name: "Torts Sectional Test",
    examType: "AIBE",
    category: "Sectional",
    questions: 50,
    time: 45,
    status: "Draft",
    negMarking: 0,
    cutoff: 20,
    difficulty: "Medium",
    attempts: 0,
    avgScore: 0,
    rankList: [],
    sections: [],
    analytics: { accuracy: 0, speedData: [], topicPerformance: [] }
  },
  {
    id: 3,
    name: "Constitution Weekly Quiz",
    examType: "Judiciary",
    category: "Quiz",
    questions: 20,
    time: 15,
    status: "Live",
    negMarking: 0.5,
    cutoff: 10,
    difficulty: "Easy",
    attempts: 450,
    avgScore: 65,
    rankList: [
      { rank: 1, student: "Anjali D.", score: 19, time: "12 min" }
    ],
    sections: [],
    analytics: {
      accuracy: 65,
      speedData: [],
      topicPerformance: []
    }
  },
];

// NEW: Store Stats
export const bookStats = {
  total: 65,
  digital: 25,
  physical: 40,
  orders: 1250,
  revenue: 850000
};

export const booksData = [
  {
    id: 1,
    name: "Legal Reasoning Guide",
    author: "Dr. A. Sharma",
    price: 599,
    stock: 45,
    rating: 4.5,
    category: "Book",
    type: "Physical",
    sku: "BK-LR-001",
    exam: "CLAT",
    sales: 120,
    revenue: 71880,
    visibility: "Active",
    wishlistCount: 45,
    deliveryType: "Standard Shipping",
    reviews: [{ user: "Rahul", rating: 5, comment: "Must buy for CLAT!" }]
  },
  {
    id: 2,
    name: "Current Affairs Notes 2024",
    author: "LegalEdge Team",
    price: 199,
    stock: 999,
    rating: 4.8,
    category: "Notes",
    type: "Digital",
    sku: "NT-CA-2024",
    exam: "All",
    sales: 850,
    revenue: 169150,
    visibility: "Active",
    wishlistCount: 120,
    deliveryType: "Instant Download",
    reviews: []
  },
  {
    id: 3,
    name: "Quantitative Aptitude for Law",
    author: "R.S. Aggarwal",
    price: 450,
    stock: 0,
    rating: 4.2,
    category: "Book",
    type: "Physical",
    sku: "BK-QA-005",
    exam: "CLAT",
    sales: 300,
    revenue: 135000,
    visibility: "Hidden",
    wishlistCount: 15,
    deliveryType: "Standard Shipping",
    reviews: [{ user: "Sneha", rating: 4, comment: "Good practice questions." }]
  },
  {
    id: 4,
    name: "Judiciary Mega Combo",
    author: "Various",
    price: 2499,
    stock: 12,
    rating: 5.0,
    category: "Combo",
    type: "Combo",
    sku: "CB-JUD-MEGA",
    exam: "Judiciary",
    sales: 45,
    revenue: 112455,
    visibility: "Active",
    wishlistCount: 89,
    deliveryType: "Mixed",
    reviews: []
  },
];

// NEW: Report & Analytics Data
export const reportStats = {
  totalEnrollments: 2540,
  totalRevenue: 4500000,
  avgCompletion: 64,
  avgTestParticipation: 78,
  refundRate: 1.2
};

export const retentionFunnelData = [
  { stage: 'Enrolled', count: 2540, fill: '#8884d8' },
  { stage: 'Attended Class', count: 2100, fill: '#83a6ed' },
  { stage: 'Attempted Test', count: 1800, fill: '#8dd1e1' },
  { stage: 'Completed Course', count: 1200, fill: '#82ca9d' },
  { stage: 'Certified', count: 950, fill: '#a4de6c' }
];

export const teacherPerformanceData = [
  { name: 'Amit Sharma', attendance: 92, classes: 45, rating: 4.8 },
  { name: 'Priya Verma', attendance: 85, classes: 30, rating: 4.5 },
  { name: 'Rajesh Gupta', attendance: 98, classes: 50, rating: 4.9 },
  { name: 'Sneha Singh', attendance: 70, classes: 12, rating: 3.5 }
];

export const detailedRevenueData = [
  { category: 'Courses', value: 3200000 },
  { category: 'Books', value: 500000 },
  { category: 'Notes', value: 300000 },
  { category: 'Test Series', value: 500000 }
];

export const operationalData = {
  batchUtilization: [
    { batch: 'CLAT Alpha', capacity: 100, filled: 85 },
    { batch: 'Judiciary B', capacity: 60, filled: 58 },
    { batch: 'AIBE Weekend', capacity: 150, filled: 120 }
  ]
};

// --- FINANCIAL & CHART DATA ---
export const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];

export const userActivityData = [
  { name: 'Active', value: 400 },
  { name: 'Inactive', value: 150 },
];

export const paymentSuccessData = [
  { name: 'Success', value: 850, color: '#4CAF50' },
  { name: 'Failed', value: 120, color: '#F44336' },
  { name: 'Pending', value: 30, color: '#FFC107' },
];

export const marketingFunnelData = [
  { name: 'Impressions', value: 4000, fill: '#8884d8' },
  { name: 'Clicks', value: 3000, fill: '#83a6ed' },
  { name: 'Signups', value: 2000, fill: '#8dd1e1' },
  { name: 'Purchases', value: 1000, fill: '#82ca9d' },
];

export const coursePerformanceData = [
  { name: 'CLAT Masterclass', enrolled: 1240, rating: 4.8 },
  { name: 'Judiciary Foundation', enrolled: 890, rating: 4.6 },
  { name: 'AIBE Crash Course', enrolled: 650, rating: 4.2 },
  { name: 'Legal Reasoning 101', enrolled: 420, rating: 4.9 },
  { name: 'Consti Law Basics', enrolled: 310, rating: 4.5 },
];

// --- CMS & WEBSITE CONTENT DATA ---
export const cmsStats = {
  totalPages: 12,
  activePages: 10,
  blogArticles: 45,
  totalViews: 85200,
  lastUpdated: 'Just now'
};

export const cmsPages = [
  { id: 1, title: 'Home', slug: '/', status: 'Published', lastEdited: '2 hours ago', views: 45000, author: 'Admin' },
  { id: 2, title: 'About Us', slug: '/about', status: 'Published', lastEdited: '1 day ago', views: 12000, author: 'Editor 1' },
  { id: 3, title: 'Contact Us', slug: '/contact', status: 'Published', lastEdited: '3 days ago', views: 8000, author: 'Admin' },
  { id: 4, title: 'Careers', slug: '/careers', status: 'Draft', lastEdited: '5 days ago', views: 0, author: 'HR' },
];

export const cmsBlogs = [
  { id: 1, title: 'How to Crack CLAT 2025: Ultimate Guide', category: 'Exam Tips', status: 'Published', date: '2024-03-15', views: 1200, comments: 45, author: 'Amit Sharma' },
  { id: 2, title: 'Top 10 Legal Maxims Everyone Should Know', category: 'Legal Knowledge', status: 'Published', date: '2024-03-10', views: 980, comments: 32, author: 'Priya Verma' },
  { id: 3, title: 'Judiciary vs Corporate Law: Career Path', category: 'Career Guidance', status: 'Draft', date: '2024-03-20', views: 0, comments: 0, author: 'Rajesh Gupta' },
];

export const cmsTestimonials = [
  { id: 1, name: 'Sohan Singh', course: 'CLAT Masterclass', rating: 5, text: 'This course changed my life! The faculty is amazing.', status: 'Active' },
  { id: 2, name: 'Anjali Das', course: 'Judiciary Foundation', rating: 4, text: 'Great content, very detailed.', status: 'Active' },
  { id: 3, name: 'Rahul Kumar', course: 'AIBE Cracker', rating: 5, text: 'Cleared my exam in first attempt.', status: 'Hidden' },
];

export const cmsFaqs = [
  { id: 1, question: 'Is the course fee refundable?', answer: 'Yes, within 7 days of purchase.', category: 'Payments', visibility: 'Visible' },
  { id: 2, question: 'Can I access on mobile?', answer: 'Yes, we have both Android and iOS apps.', category: 'Technical', visibility: 'Visible' },
  { id: 3, question: 'Do you provide printed notes?', answer: 'Yes, for premium batches only.', category: 'Materials', visibility: 'Hidden' },
];

export const cmsMedia = [
  { id: 1, name: 'hero-banner-01.jpg', type: 'Image', size: '2.4 MB', dimensions: '1920x1080', date: '2024-03-01' },
  { id: 2, name: 'course-syllabus.pdf', type: 'PDF', size: '500 KB', dimensions: '-', date: '2024-02-28' },
  { id: 3, name: 'intro-video.mp4', type: 'Video', size: '45 MB', dimensions: '1080p', date: '2024-02-15' },
];

export const cmsLegalDocs = [
  { id: 1, title: 'Terms & Conditions', version: '2.1', lastUpdated: '2024-01-01', status: 'Published' },
  { id: 2, title: 'Privacy Policy', version: '3.0', lastUpdated: '2024-02-15', status: 'Published' },
  { id: 3, title: 'Refund Policy', version: '1.5', lastUpdated: '2023-12-10', status: 'Published' },
];
