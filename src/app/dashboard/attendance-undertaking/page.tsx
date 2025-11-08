'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import FormInput from '@/components/common/FormInput';
import Modal from '@/components/common/Modal';
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Upload,
  Send
} from 'lucide-react';
import { mockAttendanceUndertakings } from '@/data/mockData';
import { validateForm } from '@/utils/validation';

export default function AttendanceUndertakingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [undertakings] = useState(mockAttendanceUndertakings);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: 'VINAYAK',
    studentId: '2023BCA1711',
    semester: '',
    subject: '',
    reason: '',
    fromDate: '',
    toDate: '',
    supportingDocuments: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/auth/login');
      return;
    }
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationRules = [
      { name: 'semester', type: 'required', message: 'Semester is required' },
      { name: 'subject', type: 'required', message: 'Subject is required' },
      { name: 'reason', type: 'required', message: 'Reason is required' },
      { name: 'fromDate', type: 'required', message: 'From date is required' },
      { name: 'toDate', type: 'required', message: 'To date is required' }
    ];
    
    const errors = validateForm(formData, validationRules);
    
    // Convert ValidationState to simple Record<string, string>
    const errorMessages: Record<string, string> = {};
    Object.keys(errors).forEach(key => {
      errorMessages[key] = errors[key].message;
    });
    
    if (Object.keys(errorMessages).length > 0) {
      setFormErrors(errorMessages);
      return;
    }
    
    // Simulate form submission
    setFormSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setFormSubmitted(false);
      setModalContent({
        title: 'Request Submitted',
        message: 'Your attendance undertaking request has been submitted successfully. You will receive a notification once it is processed.'
      });
      setShowModal(true);
      setFormData({
        studentName: 'VINAYAK',
        studentId: '2023BCA1711',
        semester: '',
        subject: '',
        reason: '',
        fromDate: '',
        toDate: '',
        supportingDocuments: ''
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance Undertaking</h1>
            <p className="mt-1 text-sm text-gray-600">
              Request attendance undertaking for missed classes
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              onClick={() => setShowForm(!showForm)}
              variant={showForm ? "outline" : "primary"}
            >
              {showForm ? 'Cancel' : 'New Request'}
            </Button>
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Request Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Attendance Undertaking Request
              </CardTitle>
              <CardDescription>
                Fill in the details to request attendance undertaking
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Submitting Request...</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Please wait while we process your request.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Student Name"
                      name="studentName"
                      type="text"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      disabled
                    />
                    
                    <FormInput
                      label="Student ID"
                      name="studentId"
                      type="text"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Semester"
                      name="semester"
                      type="select"
                      value={formData.semester}
                      onChange={handleInputChange}
                      error={formErrors.semester}
                      required
                      options={['SEM-V (25-26)', 'SEM-IV (24-25)', 'SEM-III (23-24)']}
                    />
                    
                    <FormInput
                      label="Subject"
                      name="subject"
                      type="select"
                      value={formData.subject}
                      onChange={handleInputChange}
                      error={formErrors.subject}
                      required
                      options={[
                        'Data Warehouse and Mining',
                        'Cloud Computing',
                        'Web Designing',
                        'Operating Systems',
                        'Software Engineering'
                      ]}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="From Date"
                      name="fromDate"
                      type="text"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                      error={formErrors.fromDate}
                      required
                      placeholder="DD-MM-YYYY"
                    />
                    
                    <FormInput
                      label="To Date"
                      name="toDate"
                      type="text"
                      value={formData.toDate}
                      onChange={handleInputChange}
                      error={formErrors.toDate}
                      required
                      placeholder="DD-MM-YYYY"
                    />
                  </div>
                  
                  <FormInput
                    label="Reason for Absence"
                    name="reason"
                    type="textarea"
                    value={formData.reason}
                    onChange={handleInputChange}
                    error={formErrors.reason}
                    required
                    placeholder="Please provide a detailed reason for your absence..."
                    rows={4}
                  />
                  
                  <FormInput
                    label="Supporting Documents"
                    name="supportingDocuments"
                    type="textarea"
                    value={formData.supportingDocuments}
                    onChange={handleInputChange}
                    placeholder="List any supporting documents you can provide (medical certificates, etc.)"
                    rows={3}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Request
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{undertakings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {undertakings.filter(u => u.status === 'approved').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {undertakings.filter(u => u.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-100 rounded-lg p-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {undertakings.filter(u => u.status === 'rejected').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Request History
            </CardTitle>
            <CardDescription>
              Your previous attendance undertaking requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {undertakings.map((undertaking) => (
                <div key={undertaking.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(undertaking.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-medium text-gray-900">
                            {undertaking.subject}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(undertaking.status)}`}>
                            {undertaking.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                          <div>
                            <span className="font-medium">Period:</span> {undertaking.fromDate} to {undertaking.toDate}
                          </div>
                          <div>
                            <span className="font-medium">Submitted:</span> {undertaking.submissionDate}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Reason:</span> {undertaking.reason}
                        </p>
                        {undertaking.remarks && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Remarks:</span> {undertaking.remarks}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      {undertaking.status === 'approved' && undertaking.documentUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => undertaking.documentUrl && window.open(undertaking.documentUrl, '_blank')}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {undertakings.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't submitted any attendance undertaking requests yet.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent.title}
      >
        <p className="text-gray-600">{modalContent.message}</p>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setShowModal(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </MainLayout>
  );
}