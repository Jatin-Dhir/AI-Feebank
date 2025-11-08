import {
  Student,
  Transaction,
  Attendance,
  Subject,
  TimetableEntry,
  Message,
  FeeInstallment,
  Request,
  Update,
  Assignment,
  Feedback,
  AttendanceUndertaking
} from '@/types';

// Mock Student Data
export const mockStudent: Student = {
  studentId: '2023BCA1711',
  personalInfo: {
    name: 'VINAYAK',
    dob: '15 March, 2002',
    contact: '9876543210',
    email: 'VINAYAK@GMAIL.COM',
    address: '123, TECH PARK, BANGALORE, KARNATAKA 560001',
    guardian: 'RAJESH SHARMA',
    profilePhoto: '/images/student-avatar.jpg',
  },
  academicInfo: {
    course: 'BCA-2023-2026',
    currentSemester: 'SEM-V (25-26)',
    admissionYear: 2023,
    expectedGraduation: 2026,
    institution: 'PCTE GROUP OF INSTITUTES',
  },
  encryptedId: 'Y5T83nRku0yC4Jo3gg',
};

// Mock Fee Schedule
export const mockFeeSchedule: FeeInstallment[] = [
  {
    installmentNumber: 1,
    installmentName: '1st Installment',
    dueDate: '2024-10-15',
    amount: 25170,
    status: 'paid',
    paymentDate: '2024-08-03',
  },
  {
    installmentNumber: 2,
    installmentName: '2nd Installment',
    dueDate: '2024-12-15',
    amount: 25170,
    status: 'paid',
    paymentDate: '2024-12-10',
  },
  {
    installmentNumber: 3,
    installmentName: '3rd Installment',
    dueDate: '2025-03-15',
    amount: 25170,
    status: 'pending',
  },
  {
    installmentNumber: 4,
    installmentName: '4th Installment',
    dueDate: '2025-06-15',
    amount: 25170,
    status: 'pending',
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    transactionId: '186635_Y5T83nRku0yC4Jo3gg',
    studentId: '2023BCA1711',
    transactionDetails: {
      date: '03/08/2025',
      amount: 25170.00,
      currency: 'INR',
      type: 'Credit Card',
      status: 'Success',
      description: 'Fee Payment - Installment 1',
    },
    paymentGateway: {
      gateway: 'Credit Card Processor',
      gatewayTransactionId: 'CC_186635',
      processingFee: 50.00,
    },
    receipt: {
      receiptId: '2004624',
      downloadUrl: '/Download/FeeReceipt?id=2004624',
      generatedAt: '2025-08-03T14:30:00Z',
    },
  },
  {
    transactionId: '186636_X9T72nRku0yC4Jo3hh',
    studentId: '2023BCA1711',
    transactionDetails: {
      date: '10/12/2025',
      amount: 25170.00,
      currency: 'INR',
      type: 'UPI',
      status: 'Success',
      description: 'Fee Payment - Installment 2',
    },
    paymentGateway: {
      gateway: 'UPI Processor',
      gatewayTransactionId: 'UPI_186636',
      processingFee: 0.00,
    },
    receipt: {
      receiptId: '2004625',
      downloadUrl: '/Download/FeeReceipt?id=2004625',
      generatedAt: '2025-12-10T16:45:00Z',
    },
  },
];

// Mock Attendance Data
export const mockAttendance: Attendance[] = [
  {
    attendanceId: 'ATT_001',
    studentId: '2023BCA1711',
    sessionDetails: {
      date: '29-Jul-2023',
      period: 'IV(12:30 to 13:30)',
      duration: 60,
      academicYear: '2023-2024',
    },
    subjectInfo: {
      subjectCode: 'UGCA 1931',
      subjectName: 'Data Warehouse and Mining',
      semester: 'SEM-V (25-26)',
      faculty: 'PARIKA JAIRATH',
    },
    attendanceStatus: {
      status: 'P',
      markedBy: 'faculty_001',
      markedAt: '2023-07-29T12:30:00Z',
      notes: '',
    },
  },
  {
    attendanceId: 'ATT_002',
    studentId: '2023BCA1711',
    sessionDetails: {
      date: '30-Jul-2023',
      period: 'II(09:00 to 10:00)',
      duration: 60,
      academicYear: '2023-2024',
    },
    subjectInfo: {
      subjectCode: 'UGCA 1936',
      subjectName: 'Cloud Computing',
      semester: 'SEM-V (25-26)',
      faculty: 'HIMANSHU SINGH',
    },
    attendanceStatus: {
      status: 'A',
      markedBy: 'faculty_002',
      markedAt: '2023-07-30T09:00:00Z',
      notes: 'Student absent',
    },
  },
];

// Mock Subjects
export const mockSubjects: Subject[] = [
  {
    subjectCode: 'UGCA 1931',
    subjectName: 'Data Warehouse and Mining',
    semester: 'SEM-V',
    credits: 4,
    faculty: {
      name: 'PARIKA JAIRATH',
      department: 'Computer Science',
      contact: 'parika.j@pcte.edu',
    },
    schedule: {
      theory: {
        day: 'Friday',
        time: '09:00-10:00',
        room: 'Room_101',
      },
      practical: null,
    },
    resources: [
      {
        title: 'Introduction to Data Mining',
        type: 'pptx',
        size: '2.5MB',
        uploadDate: '2024-08-15',
        downloadUrl: '/content/dwm/intro.pptx',
      },
      {
        title: 'Data Warehouse Concepts',
        type: 'pdf',
        size: '1.8MB',
        uploadDate: '2024-08-20',
        downloadUrl: '/content/dwm/concepts.pdf',
      },
    ],
  },
  {
    subjectCode: 'UGCA 1936',
    subjectName: 'Cloud Computing',
    semester: 'SEM-V',
    credits: 4,
    faculty: {
      name: 'HIMANSHU SINGH',
      department: 'Computer Science',
      contact: 'himanshu.s@pcte.edu',
    },
    schedule: {
      theory: {
        day: 'Friday',
        time: '10:05-11:05',
        room: 'Lab_201',
      },
      practical: null,
    },
    resources: [
      {
        title: 'Cloud Architecture Basics',
        type: 'pdf',
        size: '3.2MB',
        uploadDate: '2024-08-18',
        downloadUrl: '/content/cc/architecture.pdf',
      },
    ],
  },
];

// Mock Timetable
export const mockTimetable: TimetableEntry[] = [
  {
    date: '2025-10-10',
    dayOfWeek: 'Friday',
    classes: [
      {
        time: '09:00-10:00',
        subject: 'DATA WAREHOUSE AND MINING',
        faculty: 'PARIKA JAIRATH',
        room: 'Room_101',
        type: 'Theory',
      },
      {
        time: '10:05-11:05',
        subject: 'CLOUD COMPUTING',
        faculty: 'HIMANSHU SINGH',
        room: 'Lab_201',
        type: 'Theory',
      },
      {
        time: '11:15-12:15',
        subject: 'WEB DESIGNING',
        faculty: 'RAJEEV KUMAR',
        room: 'Lab_302',
        type: 'Practical',
      },
      {
        time: '12:30-13:30',
        subject: 'DATA WAREHOUSE AND MINING',
        faculty: 'PARIKA JAIRATH',
        room: 'Room_101',
        type: 'Theory',
      },
    ],
  },
  {
    date: '2025-10-11',
    dayOfWeek: 'Saturday',
    classes: [
      {
        time: '09:00-10:00',
        subject: 'OPERATING SYSTEMS',
        faculty: 'ANITA SHARMA',
        room: 'Room_205',
        type: 'Theory',
      },
      {
        time: '10:05-11:05',
        subject: 'SOFTWARE ENGINEERING',
        faculty: 'VIKAS MEHTA',
        room: 'Room_103',
        type: 'Theory',
      },
    ],
  },
];

// Mock Messages/Updates
export const mockMessages: Message[] = [
  {
    messageId: 'MSG_001',
    from: 'PARIKA JAIRATH',
    subject: 'Assignment Submission Reminder',
    message: 'Please submit your data mining assignment by tomorrow. The assignment covers topics from chapters 1-3.',
    date: '2025-10-05',
    attachments: [
      {
        fileName: 'assignment_guidelines.pdf',
        downloadUrl: '/download/assignment_guidelines.pdf',
      },
    ],
    tags: ['Assignment', 'Urgent'],
  },
  {
    messageId: 'MSG_002',
    from: 'HIMANSHU SINGH',
    subject: 'Cloud Computing Lab Schedule',
    message: 'Lab sessions for Cloud Computing have been rescheduled to Wednesday 2-4 PM.',
    date: '2025-10-04',
    attachments: [],
    tags: ['Schedule', 'Lab'],
  },
];

// Mock Updates Data
export const mockUpdates: Update[] = [
  {
    id: 1,
    title: "Assignment Submission Reminder",
    message: "Please submit your Data Mining assignment by tomorrow, 11:59 PM. Late submissions will not be accepted.",
    type: "warning",
    date: "2023-10-06",
    sender: "Dr. Rajesh Kumar"
  },
  {
    id: 2,
    title: "Fee Payment Confirmation",
    message: "Your 2nd installment payment has been received successfully. Receipt is available in the transactions section.",
    type: "success",
    date: "2023-10-05",
    sender: "Accounts Department"
  },
  {
    id: 3,
    title: "Class Schedule Change",
    message: "Tomorrow's Database Management class has been rescheduled to 2:00 PM in Room 301.",
    type: "info",
    date: "2023-10-04",
    sender: "Academic Office"
  },
  {
    id: 4,
    title: "Exam Results Published",
    message: "Your mid-term examination results have been published. Please check the academic performance section.",
    type: "success",
    date: "2023-10-03",
    sender: "Examination Department"
  },
  {
    id: 5,
    title: "Library Book Due Date",
    message: "You have 2 library books due for return by October 10, 2023. Please return them to avoid late fees.",
    type: "warning",
    date: "2023-10-02",
    sender: "Library"
  },
  {
    id: 6,
    title: "Placement Drive Registration",
    message: "Registration for the upcoming placement drive is now open. Please register by October 15, 2023.",
    type: "info",
    date: "2023-10-01",
    sender: "Placement Cell"
  },
  {
    id: 7,
    title: "System Maintenance Notice",
    message: "The student portal will be unavailable on October 8, 2023, from 10:00 AM to 2:00 PM for maintenance.",
    type: "error",
    date: "2023-09-30",
    sender: "IT Department"
  },
  {
    id: 8,
    title: "Workshop on AI and Machine Learning",
    message: "A workshop on AI and Machine Learning is scheduled for October 12, 2023. Registration is mandatory.",
    type: "info",
    date: "2023-09-29",
    sender: "Computer Science Department"
  }
];

// Mock Requests
export const mockRequests: Request[] = [
  {
    requestId: 'REQ_001',
    studentId: '2023BCA1711',
    requestType: 'Certificate',
    requestDetails: {
      reason: 'Need for job application',
      requestDate: '2025-10-01',
      urgency: 'Normal',
      attachments: [],
    },
    payment: {
      amount: 500,
      paymentMethod: 'Credit Card',
      bank: 'HDFC Bank',
      paymentStatus: 'Pending',
      paymentDate: null,
    },
    processing: {
      status: 'Pending',
      teacherRemarks: null,
      teacherUpdateDate: null,
      assignedTo: 'admin_001',
      expectedCompletionDate: '2025-10-14',
    },
  },
];

// Mock Feedback Data
export const mockFeedback: Feedback[] = [
  {
    semester: 'SEM-V (25-26)',
    subject: 'Data Warehouse and Mining',
    faculty: 'PARIKA JAIRATH',
    rating: 5,
    comments: 'Excellent teaching style with practical examples. The course content is well-structured and relevant.',
    suggestions: 'More hands-on lab sessions would be beneficial.'
  },
  {
    semester: 'SEM-V (25-26)',
    subject: 'Cloud Computing',
    faculty: 'HIMANSHU SINGH',
    rating: 4,
    comments: 'Good coverage of cloud concepts. The demonstrations were helpful in understanding complex topics.',
    suggestions: 'Include more case studies from real-world implementations.'
  },
  {
    semester: 'SEM-IV (24-25)',
    subject: 'Web Designing',
    faculty: 'RAJEEV KUMAR',
    rating: 4,
    comments: 'Practical approach to web design. The projects helped in applying theoretical knowledge.',
    suggestions: 'More focus on responsive design techniques.'
  },
  {
    semester: 'SEM-IV (24-25)',
    subject: 'Operating Systems',
    faculty: 'ANITA SHARMA',
    rating: 3,
    comments: 'Theoretical concepts were explained well, but practical implementation was limited.',
    suggestions: 'Include more practical lab sessions with OS internals.'
  },
  {
    semester: 'SEM-III (23-24)',
    subject: 'Software Engineering',
    faculty: 'VIKAS MEHTA',
    rating: 5,
    comments: 'Comprehensive coverage of software development lifecycle. The group project was very insightful.',
    suggestions: 'Introduce more modern development methodologies like DevOps.'
  }
];

// Mock Academic Performance
export const mockAcademicPerformance = {
  totalClasses: 120,
  attended: 101,
  percentage: 84.2,
  subjectWiseAttendance: [
    {
      subject: 'Data Warehouse and Mining',
      attended: 15,
      total: 18,
      percentage: 83.3,
    },
    {
      subject: 'Cloud Computing',
      attended: 16,
      total: 18,
      percentage: 88.9,
    },
    {
      subject: 'Web Designing',
      attended: 14,
      total: 16,
      percentage: 87.5,
    },
  ],
};

// Mock Upcoming Classes
export const mockUpcomingClasses = [
  {
    subject: 'DATA WAREHOUSE AND MINING',
    time: '09:00-10:00',
    date: '2025-10-10',
    room: 'Room_101',
    faculty: 'PARIKA JAIRATH',
  },
  {
    subject: 'CLOUD COMPUTING',
    time: '10:05-11:05',
    date: '2025-10-10',
    room: 'Lab_201',
    faculty: 'HIMANSHU SINGH',
  },
];

// Mock Assignments Data
export const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: "Data Mining Case Study",
    description: "Analyze the provided dataset and identify patterns using data mining techniques.",
    subject: "Data Warehouse and Mining",
    dueDate: "2023-10-15",
    submissionDate: null,
    status: "pending",
    downloadUrl: "/content/assignments/dm_case_study.pdf",
    submissionUrl: null,
    faculty: "PARIKA JAIRATH",
    maxMarks: 100,
    weightage: 20
  },
  {
    id: 2,
    title: "Cloud Architecture Design",
    description: "Design a scalable cloud architecture for a e-commerce platform.",
    subject: "Cloud Computing",
    dueDate: "2023-10-10",
    submissionDate: "2023-10-08",
    status: "submitted",
    downloadUrl: "/content/assignments/cloud_architecture.pdf",
    submissionUrl: "/submissions/student_001/cloud_architecture.zip",
    faculty: "HIMANSHU SINGH",
    maxMarks: 100,
    weightage: 15
  },
  {
    id: 3,
    title: "Web Development Project",
    description: "Create a responsive website using HTML, CSS, and JavaScript.",
    subject: "Web Designing",
    dueDate: "2023-10-05",
    submissionDate: null,
    status: "overdue",
    downloadUrl: "/content/assignments/web_project.pdf",
    submissionUrl: null,
    faculty: "RAJEEV KUMAR",
    maxMarks: 100,
    weightage: 25
  },
  {
    id: 4,
    title: "Operating Systems Research Paper",
    description: "Write a research paper on recent advancements in operating systems.",
    subject: "Operating Systems",
    dueDate: "2023-10-20",
    submissionDate: null,
    status: "pending",
    downloadUrl: "/content/assignments/os_research.pdf",
    submissionUrl: null,
    faculty: "ANITA SHARMA",
    maxMarks: 100,
    weightage: 10
  },
  {
    id: 5,
    title: "Software Engineering Documentation",
    description: "Create comprehensive documentation for a software project.",
    subject: "Software Engineering",
    dueDate: "2023-10-12",
    submissionDate: "2023-10-10",
    status: "submitted",
    downloadUrl: "/content/assignments/se_documentation.pdf",
    submissionUrl: "/submissions/student_001/se_documentation.docx",
    faculty: "VIKAS MEHTA",
    maxMarks: 100,
    weightage: 15
  }
];

// Mock Attendance Undertaking Data
export const mockAttendanceUndertakings: AttendanceUndertaking[] = [
  {
    id: 1,
    studentId: '2023BCA1711',
    studentName: 'VINAYAK',
    semester: 'SEM-V (25-26)',
    subject: 'Data Warehouse and Mining',
    fromDate: '2023-09-15',
    toDate: '2023-09-17',
    reason: 'Medical emergency - was admitted to hospital for treatment.',
    submissionDate: '2023-09-20',
    status: 'approved',
    remarks: 'Approved with medical certificate.',
    documentUrl: '/documents/attendance_undertaking_001.pdf'
  },
  {
    id: 2,
    studentId: '2023BCA1711',
    studentName: 'VINAYAK',
    semester: 'SEM-V (25-26)',
    subject: 'Cloud Computing',
    fromDate: '2023-10-01',
    toDate: '2023-10-02',
    reason: 'Family emergency - had to attend to a family member in need.',
    submissionDate: '2023-10-03',
    status: 'pending',
    remarks: null,
    documentUrl: null
  },
  {
    id: 3,
    studentId: '2023BCA1711',
    studentName: 'VINAYAK',
    semester: 'SEM-IV (24-25)',
    subject: 'Web Designing',
    fromDate: '2023-05-10',
    toDate: '2023-05-12',
    reason: 'Participated in a national level technical symposium.',
    submissionDate: '2023-05-15',
    status: 'rejected',
    remarks: 'Insufficient documentation provided.',
    documentUrl: null
  }
];
