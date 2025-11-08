'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Bell,
  TrendingUp,
  AlertCircle,
  User,
  GraduationCap,
  Award,
  Activity
} from 'lucide-react';
import { 
  mockStudent, 
  mockFeeSchedule, 
  mockAcademicPerformance, 
  mockUpcomingClasses 
} from '@/data/mockData';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-accent">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-muted-foreground font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const totalFees = mockFeeSchedule.reduce((sum, installment) => sum + installment.amount, 0);
  const paidFees = mockFeeSchedule
    .filter(installment => installment.status === 'paid')
    .reduce((sum, installment) => sum + installment.amount, 0);
  const pendingFees = totalFees - paidFees;
  const attendancePercentage = mockAcademicPerformance.percentage;

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Welcome back, <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{mockStudent.personalInfo.name.split(' ')[0]}</span>
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your academics today
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => router.push('/dashboard/transactions')}
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              View Transactions
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/timetable')}
              className="transition-all duration-200"
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Timetable
            </Button>
          </div>
        </div>

        {/* Student Information Card */}
        <Card className="overflow-hidden border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-600/5"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center text-xl">
              <div className="p-2 bg-gradient-to-r from-primary to-purple-600 rounded-lg mr-3">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              Student Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <span className="text-white text-3xl font-bold">
                      {mockStudent.personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-background">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Student ID
                  </p>
                  <p className="text-lg font-semibold text-foreground">{mockStudent.studentId}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    Course
                  </p>
                  <p className="text-lg font-semibold text-foreground">{mockStudent.academicInfo.course}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    Semester
                  </p>
                  <p className="text-lg font-semibold text-foreground">{mockStudent.academicInfo.currentSemester}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    Institution
                  </p>
                  <p className="text-lg font-semibold text-foreground">{mockStudent.academicInfo.institution}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group bg-card/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Fees</p>
                  <p className="text-2xl font-bold text-foreground">₹{totalFees.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-muted-foreground mt-1">Academic Year 2024-25</p>
                </div>
                <div className="flex-shrink-0 bg-primary/10 rounded-xl p-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group bg-card/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Paid Fees</p>
                  <p className="text-2xl font-bold text-foreground">₹{paidFees.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {mockFeeSchedule.filter(i => i.status === 'paid').length} installments paid
                  </p>
                </div>
                <div className="flex-shrink-0 bg-green-100 rounded-xl p-3 group-hover:bg-green-200 transition-colors duration-300 dark:bg-green-900/20 dark:hover:bg-green-900/30">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group bg-card/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Pending Fees</p>
                  <p className="text-2xl font-bold text-foreground">₹{pendingFees.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-yellow-600 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {mockFeeSchedule.filter(i => i.status === 'pending').length} installments pending
                  </p>
                </div>
                <div className="flex-shrink-0 bg-yellow-100 rounded-xl p-3 group-hover:bg-yellow-200 transition-colors duration-300 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group bg-card/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Attendance</p>
                  <p className="text-2xl font-bold text-foreground">{attendancePercentage}%</p>
                  <p className="text-xs text-purple-600 mt-1 flex items-center">
                    <Activity className="w-3 h-3 mr-1" />
                    {mockAcademicPerformance.attended}/{mockAcademicPerformance.totalClasses} classes
                  </p>
                </div>
                <div className="flex-shrink-0 bg-purple-100 rounded-xl p-3 group-hover:bg-purple-200 transition-colors duration-300 dark:bg-purple-900/20 dark:hover:bg-purple-900/30">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fee Schedule and Upcoming Classes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fee Schedule */}
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10 backdrop-blur-sm border-b">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <div className="p-2 bg-blue-600 rounded-lg mr-3">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  Fee Schedule
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/dashboard/transactions')}
                  className="border-primary/20 hover:border-primary/30 hover:bg-primary/10 transition-all duration-200"
                >
                  View All
                </Button>
              </CardTitle>
              <CardDescription>
                Your fee payment schedule for the current academic year
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockFeeSchedule.slice(0, 3).map((installment) => (
                  <div key={installment.installmentNumber} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-muted hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        installment.status === 'paid' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-yellow-100 dark:bg-yellow-900/20'
                      }`}>
                        {installment.status === 'paid' ? (
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{installment.installmentName}</p>
                        <p className="text-sm text-muted-foreground">Due: {installment.dueDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">₹{installment.amount.toLocaleString('en-IN')}</p>
                      <p className={`text-sm font-medium ${
                        installment.status === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {installment.status === 'paid' ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Classes */}
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm border-b">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <div className="p-2 bg-purple-600 rounded-lg mr-3">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  Upcoming Classes
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/dashboard/timetable')}
                  className="border-purple-600/20 hover:border-purple-600/30 hover:bg-purple-600/10 transition-all duration-200"
                >
                  View Timetable
                </Button>
              </CardTitle>
              <CardDescription>
                Your scheduled classes for the next few days
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mockUpcomingClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-muted hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{classItem.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {classItem.date} • {classItem.time}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {classItem.room} • {classItem.faculty}
                        </p>
                      </div>
                    </div>
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600/10 to-primary/10 border-b">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <div className="p-2 bg-green-600 rounded-lg mr-3">
                  <Bell className="h-4 w-4 text-white" />
                </div>
                Recent Notifications
              </span>
              <Button variant="outline" size="sm" className="border-green-600/20 hover:border-green-600/30 hover:bg-green-600/10 transition-all duration-200">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 border border-border rounded-xl hover:border-muted hover:shadow-md transition-all duration-200">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Assignment Submission Reminder</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Please submit your Data Mining assignment by tomorrow, 11:59 PM.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 border border-border rounded-xl hover:border-muted hover:shadow-md transition-all duration-200">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Fee Payment Confirmation</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your 2nd installment payment has been received successfully.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    1 day ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
