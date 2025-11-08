import { MenuItem } from '@/types';

// 21-Color Navigation System - Revolutionary Feature
export const MENU_COLORS = {
  1: '#007bff',   // Dashboard - Blue
  2: '#28a745',   // Class Time Table - Green
  3: '#6f42c1',   // Lectures - Purple
  4: '#e83e8c',   // Updates - Pink
  5: '#fd7e14',   // Attendance Report - Orange
  6: '#ffc107',   // Attendance Undertaking - Yellow
  7: '#6c757d',   // Assignments - Gray
  8: '#dc3545',   // Subject Review - Red
  9: '#17a2b8',   // Feedback - Blue-gray
  10: '#795548',  // CV - Brown
  11: '#4caf50',  // Placement Zone - Light Green
  12: '#3f51b5',  // Hostel Leave - Dark Blue
  13: '#8bc34a',  // Online Exam - Yellow-green
  14: '#9c27b0',  // Certificates - Purple-pink
  15: '#009688',  // Parking - Teal
  16: '#e91e63',  // Transport Pass - Pink-purple
  17: '#00bcd4',  // Attendance Undertaking 2 - Green-blue
  18: '#ff5722',  // Transactions - Orange-red
  19: '#689f38',  // Duplicate IDCard - Green
  20: '#607d8b',  // Additional Module 1 - Blue-gray
  21: '#7e57c2',  // Additional Module 2 - Deep Purple
} as const;

// Menu Items Configuration
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'Home',
    color: MENU_COLORS[1],
    permissions: ['student', 'admin'],
    mobileDisplay: true,
  },
  {
    id: 2,
    name: 'Class Time Table',
    url: '/dashboard/timetable',
    icon: 'Calendar',
    color: MENU_COLORS[2],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 3,
    name: 'Lectures',
    url: '/dashboard/lectures',
    icon: 'BookOpen',
    color: MENU_COLORS[3],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 4,
    name: 'Updates',
    url: '/dashboard/updates',
    icon: 'Bell',
    color: MENU_COLORS[4],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 5,
    name: 'Attendance Report',
    url: '/dashboard/attendance-report',
    icon: 'CheckCircle',
    color: MENU_COLORS[5],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 6,
    name: 'Attendance Undertaking',
    url: '/dashboard/attendance-undertaking',
    icon: 'FileText',
    color: MENU_COLORS[6],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 7,
    name: 'Assignments',
    url: '/dashboard/assignments',
    icon: 'Edit',
    color: MENU_COLORS[7],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 8,
    name: 'Subject Review',
    url: '/dashboard/subject-review',
    icon: 'Star',
    color: MENU_COLORS[8],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 9,
    name: 'Feedback',
    url: '/dashboard/feedback',
    icon: 'MessageSquare',
    color: MENU_COLORS[9],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 10,
    name: 'CV',
    url: '/dashboard/cv',
    icon: 'User',
    color: MENU_COLORS[10],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 11,
    name: 'Placement Zone',
    url: '/dashboard/placement',
    icon: 'Briefcase',
    color: MENU_COLORS[11],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 12,
    name: 'Hostel Leave',
    url: '/dashboard/hostel-leave',
    icon: 'Home',
    color: MENU_COLORS[12],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 13,
    name: 'Online Exam',
    url: '/dashboard/online-exam',
    icon: 'Monitor',
    color: MENU_COLORS[13],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 14,
    name: 'Certificates',
    url: '/dashboard/certificates',
    icon: 'Award',
    color: MENU_COLORS[14],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 15,
    name: 'Parking',
    url: '/dashboard/parking',
    icon: 'Car',
    color: MENU_COLORS[15],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 16,
    name: 'Transport Pass',
    url: '/dashboard/transport',
    icon: 'Bus',
    color: MENU_COLORS[16],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 17,
    name: 'Attendance Undertaking',
    url: '/dashboard/attendance-undertaking-2',
    icon: 'FileCheck',
    color: MENU_COLORS[17],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 18,
    name: 'Transactions',
    url: '/dashboard/transactions',
    icon: 'CreditCard',
    color: MENU_COLORS[18],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 19,
    name: 'Duplicate IDCard',
    url: '/dashboard/duplicate-id',
    icon: 'IdCard',
    color: MENU_COLORS[19],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 20,
    name: 'Library',
    url: '/dashboard/library',
    icon: 'Library',
    color: MENU_COLORS[20],
    permissions: ['student'],
    mobileDisplay: true,
  },
  {
    id: 21,
    name: 'Settings',
    url: '/dashboard/settings',
    icon: 'Settings',
    color: MENU_COLORS[21],
    permissions: ['student', 'admin'],
    mobileDisplay: true,
  },
];

// System Colors
export const SYSTEM_COLORS = {
  primary: '#2c3e50',
  secondary: '#34495e',
  contentBg: '#f8f9fa',
  textPrimary: '#212529',
  textSecondary: '#6c757d',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  borderLight: '#dee2e6',
  borderDark: '#adb5bd',
  white: '#ffffff',
  black: '#000000',
} as const;

// Responsive Breakpoints
export const BREAKPOINTS = {
  mobile: '320px',
  mobileLarge: '425px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1440px',
  desktopXL: '1920px',
} as const;

// Validation States
export const VALIDATION_STATES = {
  INCOMPLETE: '✗',
  COMPLETE: '✓',
  ERROR: '⚠',
} as const;

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'credit-card', label: 'Credit Card', icon: 'CreditCard' },
  { value: 'upi', label: 'UPI', icon: 'Smartphone' },
  { value: 'bank-transfer', label: 'Bank Transfer', icon: 'Building' },
] as const;

// Banks
export const BANKS = [
  { value: 'hdfc', label: 'HDFC Bank' },
  { value: 'sbi', label: 'State Bank of India' },
  { value: 'icici', label: 'ICICI Bank' },
  { value: 'axis', label: 'Axis Bank' },
  { value: 'pnb', label: 'Punjab National Bank' },
] as const;

// Academic Semesters
export const SEMESTERS = [
  'SEM-I (23-24)',
  'SEM-II (23-24)',
  'SEM-III (24-25)',
  'SEM-IV (24-25)',
  'SEM-V (25-26)',
  'SEM-VI (25-26)',
] as const;

// File Upload Constraints
export const FILE_UPLOAD = {
  MAX_SIZE: 2 * 1024 * 1024, // 2MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  RECOMMENDED_DIMENSIONS: { width: 300, height: 300 },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  DASHBOARD: '/api/dashboard',
  TIMETABLE: '/api/timetable',
  LECTURES: '/api/lectures',
  UPDATES: '/api/updates',
  ATTENDANCE: '/api/attendance',
  TRANSACTIONS: '/api/transactions',
  PROFILE: '/api/profile',
  CERTIFICATES: '/api/certificates',
  REQUESTS: '/api/requests',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid username or password',
  NETWORK_ERROR: 'Network error. Please try again.',
  FILE_TOO_LARGE: 'File size exceeds 2MB limit',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload JPG, PNG, or PDF.',
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  PROFILE_UPDATED: 'Profile updated successfully',
  REQUEST_SUBMITTED: 'Request submitted successfully',
  PAYMENT_SUCCESS: 'Payment processed successfully',
  FILE_UPLOADED: 'File uploaded successfully',
} as const;