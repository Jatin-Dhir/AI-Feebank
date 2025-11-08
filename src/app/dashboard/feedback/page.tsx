'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import FormInput from '@/components/common/FormInput';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle,
  Filter,
  Search
} from 'lucide-react';
import { mockFeedback } from '@/data/mockData';
import { validateForm } from '@/utils/validation';

export default function FeedbackPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks] = useState(mockFeedback);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    semester: '',
    subject: '',
    faculty: '',
    rating: 0,
    comments: '',
    suggestions: ''
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-purple-600/10">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-muted-foreground font-medium">Loading feedback...</p>
          </div>
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

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    
    // Clear error for rating when user selects a rating
    if (formErrors.rating) {
      setFormErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationRules = [
      { name: 'semester', type: 'required', message: 'Semester is required' },
      { name: 'subject', type: 'required', message: 'Subject is required' },
      { name: 'faculty', type: 'required', message: 'Faculty is required' },
      { name: 'rating', type: 'required', message: 'Rating is required' },
      { name: 'comments', type: 'required', message: 'Comments are required' }
    ];
    
    // Convert formData to string values for validation
    const formDataForValidation = {
      ...formData,
      rating: formData.rating.toString()
    };
    
    const errors = validateForm(formDataForValidation, validationRules);
    
    if (Object.keys(errors).length > 0) {
      // Convert ValidationState to simple Record<string, string>
      const errorMessages: Record<string, string> = {};
      Object.keys(errors).forEach(key => {
        errorMessages[key] = errors[key].message;
      });
      setFormErrors(errorMessages);
      return;
    }
    
    // Simulate form submission
    setFormSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setFormSubmitted(false);
      setFormData({
        semester: '',
        subject: '',
        faculty: '',
        rating: 0,
        comments: '',
        suggestions: ''
      });
    }, 2000);
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && handleRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const filteredFeedbacks = feedbacks
    .filter(feedback => selectedFilter === 'all' || feedback.subject === selectedFilter)
    .filter(feedback => 
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.faculty.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Feedback</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Provide feedback for your courses and faculty
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button
              onClick={() => setShowForm(!showForm)}
              variant={showForm ? "outline" : "primary"}
            >
              {showForm ? 'Cancel' : 'Submit Feedback'}
            </Button>
            <Button onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Feedback Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Submit Feedback
              </CardTitle>
              <CardDescription>
                Share your thoughts about the course and faculty
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <h3 className="mt-2 text-lg font-medium text-foreground">Feedback Submitted!</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Thank you for your feedback. It has been submitted successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                  
                  <FormInput
                    label="Faculty"
                    name="faculty"
                    type="select"
                    value={formData.faculty}
                    onChange={handleInputChange}
                    error={formErrors.faculty}
                    required
                    options={[
                      'PARIKA JAIRATH',
                      'HIMANSHU SINGH',
                      'RAJEEV KUMAR',
                      'ANITA SHARMA',
                      'VIKAS MEHTA'
                    ]}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      {renderStars(formData.rating, true)}
                      <span className="text-sm text-muted-foreground">
                        {formData.rating > 0 ? `${formData.rating} out of 5` : 'Select a rating'}
                      </span>
                    </div>
                    {formErrors.rating && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.rating}</p>
                    )}
                  </div>
                  
                  <FormInput
                    label="Comments"
                    name="comments"
                    type="textarea"
                    value={formData.comments}
                    onChange={handleInputChange}
                    error={formErrors.comments}
                    required
                    placeholder="Share your experience with the course..."
                    rows={4}
                  />
                  
                  <FormInput
                    label="Suggestions"
                    name="suggestions"
                    type="textarea"
                    value={formData.suggestions}
                    onChange={handleInputChange}
                    placeholder="Any suggestions for improvement..."
                    rows={3}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
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
                <div className="flex-shrink-0 bg-primary/10 rounded-lg p-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Feedback</p>
                  <p className="text-2xl font-bold text-foreground">{feedbacks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/20 rounded-lg p-3">
                  <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold text-foreground">
                    {(feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg p-3">
                  <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">5 Star Ratings</p>
                  <p className="text-2xl font-bold text-foreground">
                    {feedbacks.filter(f => f.rating === 5).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/20 rounded-lg p-3">
                  <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">With Comments</p>
                  <p className="text-2xl font-bold text-foreground">
                    {feedbacks.filter(f => f.comments.length > 0).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Feedback History
              </span>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search feedback..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Subjects</option>
                    <option value="Data Warehouse and Mining">Data Warehouse and Mining</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Web Designing">Web Designing</option>
                    <option value="Operating Systems">Operating Systems</option>
                    <option value="Software Engineering">Software Engineering</option>
                  </select>
                </div>
              </div>
            </CardTitle>
            <CardDescription>
              Your previous feedback submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFeedbacks.map((feedback, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-medium text-foreground">
                          {feedback.subject}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {renderStars(feedback.rating)}
                          <span className="text-sm text-muted-foreground">
                            {feedback.rating}/5
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div>
                          <span className="font-medium">Faculty:</span> {feedback.faculty}
                        </div>
                        <div>
                          <span className="font-medium">Semester:</span> {feedback.semester}
                        </div>
                      </div>
                      {feedback.comments && (
                        <div className="mb-2">
                          <p className="text-sm font-medium text-foreground">Comments:</p>
                          <p className="text-sm text-muted-foreground">{feedback.comments}</p>
                        </div>
                      )}
                      {feedback.suggestions && (
                        <div>
                          <p className="text-sm font-medium text-foreground">Suggestions:</p>
                          <p className="text-sm text-muted-foreground">{feedback.suggestions}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredFeedbacks.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium text-foreground">No feedback found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}