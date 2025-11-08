// User and Authentication Types
export interface Student {
  studentId: string;
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  encryptedId: string;
}

export interface PersonalInfo {
  name: string;
  dob: string;
  contact: string;
  email: string;
  address: string;
  guardian: string;
  profilePhoto: string;
}

export interface AcademicInfo {
  course: string;
  currentSemester: string;
  admissionYear: number;
  expectedGraduation: number;
  institution: string;
}

// Navigation Types
export interface MenuItem {
  id: number;
  name: string;
  url: string;
  icon: string;
  color: string;
  permissions: string[];
  mobileDisplay: boolean;
}

// Transaction Types
export interface Transaction {
  transactionId: string;
  studentId: string;
  transactionDetails: TransactionDetails;
  paymentGateway: PaymentGateway;
  receipt: Receipt;
}

export interface TransactionDetails {
  date: string;
  amount: number;
  currency: string;
  type: string;
  status: string;
  description: string;
}

export interface PaymentGateway {
  gateway: string;
  gatewayTransactionId: string;
  processingFee: number;
}

export interface Receipt {
  receiptId: string;
  downloadUrl: string;
  generatedAt: string;
}

// Attendance Types
export interface Attendance {
  attendanceId: string;
  studentId: string;
  sessionDetails: SessionDetails;
  subjectInfo: SubjectInfo;
  attendanceStatus: AttendanceStatus;
}

export interface SessionDetails {
  date: string;
  period: string;
  duration: number;
  academicYear: string;
}

export interface SubjectInfo {
  subjectCode: string;
  subjectName: string;
  semester: string;
  faculty: string;
}

export interface AttendanceStatus {
  status: 'P' | 'A'; // Present or Absent
  markedBy: string;
  markedAt: string;
  notes: string;
}

// Request Management Types
export interface Request {
  requestId: string;
  studentId: string;
  requestType: string;
  requestDetails: RequestDetails;
  payment: RequestPayment;
  processing: RequestProcessing;
}

export interface RequestDetails {
  reason: string;
  requestDate: string;
  urgency: string;
  attachments: string[];
}

export interface RequestPayment {
  amount: number;
  paymentMethod: string;
  bank: string;
  paymentStatus: string;
  paymentDate: string | null;
}

export interface RequestProcessing {
  status: string;
  teacherRemarks: string | null;
  teacherUpdateDate: string | null;
  assignedTo: string;
  expectedCompletionDate: string;
}

// Subject and Course Types
export interface CourseStructure {
  courseName: string;
  duration: string;
  totalSemesters: number;
  currentBatch: string;
}

export interface Subject {
  subjectCode: string;
  subjectName: string;
  semester: string;
  credits: number;
  faculty: Faculty;
  schedule: Schedule;
  resources: Resource[];
}

export interface Faculty {
  name: string;
  department: string;
  contact: string;
}

export interface Schedule {
  theory: ClassSession | null;
  practical: ClassSession | null;
}

export interface ClassSession {
  day: string;
  time: string;
  room: string;
}

export interface Resource {
  title: string;
  type: string;
  size: string;
  uploadDate: string;
  downloadUrl: string;
}

// Timetable Types
export interface TimetableEntry {
  date: string;
  dayOfWeek: string;
  classes: ClassEntry[];
}

export interface ClassEntry {
  time: string;
  subject: string;
  faculty: string;
  room: string;
  type: string;
}

// Message/Update Types
export interface Message {
  messageId: string;
  from: string;
  subject: string;
  message: string;
  date: string;
  attachments: MessageAttachment[];
  tags: string[];
}

export interface MessageAttachment {
  fileName: string;
  downloadUrl: string;
}

export interface Update {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  sender: string;
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  subject: string;
  dueDate: string;
  submissionDate: string | null;
  status: 'pending' | 'submitted' | 'overdue';
  downloadUrl: string;
  submissionUrl: string | null;
  faculty: string;
  maxMarks: number;
  weightage: number;
}

export interface Feedback {
  semester: string;
  subject: string;
  faculty: string;
  rating: number;
  comments: string;
  suggestions: string;
}

// Feedback Types
export interface Feedback {
  semester: string;
  subject: string;
  faculty: string;
  rating: number;
  comments: string;
  suggestions: string;
}

export interface AttendanceUndertaking {
  id: number;
  studentId: string;
  studentName: string;
  semester: string;
  subject: string;
  fromDate: string;
  toDate: string;
  reason: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  remarks: string | null;
  documentUrl: string | null;
}

// Form Validation Types
export interface ValidationState {
  [fieldName: string]: {
    isValid: boolean;
    message: string;
    touched: boolean;
  };
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: ValidationRule[];
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
  value?: string | number;
  message: string;
}

// UI State Types
export interface ModalState {
  isOpen: boolean;
  type: string;
  data?: unknown;
}

export interface SidebarState {
  isOpen: boolean;
  activeMenuItem: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Fee Schedule Types
export interface FeeSchedule {
  installmentNumber: number;
  amount: number;
  dueDate: string;
  status: string;
  paymentDate?: string;
}

export interface FeeInstallment {
  installmentNumber: number;
  installmentName: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
}
