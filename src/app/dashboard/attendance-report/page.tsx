'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { 
  CheckCircle, 
  XCircle, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  ArrowLeft,
  User,
  Clock,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { mockAttendance, mockAcademicPerformance } from '@/data/mockData';

export default function AttendanceReportPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [attendance] = useState(mockAttendance);
  const [selectedMonth, setSelectedMonth] = useState('all');

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
            <p className="mt-4 text-muted-foreground font-medium">Loading attendance data...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const totalClasses = mockAcademicPerformance.totalClasses;
  const attendedClasses = mockAcademicPerformance.attended;
  const absentClasses = totalClasses - attendedClasses;
  const attendancePercentage = mockAcademicPerformance.percentage;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'P':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'A':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'P':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'A':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'P':
        return 'Present';
      case 'A':
        return 'Absent';
      default:
        return 'Unknown';
    }
  };

  // Filter attendance based on selected month
  const filteredAttendance = selectedMonth === 'all' 
    ? attendance 
    : attendance.filter(record => {
        // In a real app, you would filter by actual month
        return true; // For demo purposes, we'll show all records
      });

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Attendance Report</h1>
            </div>
            <p className="text-muted-foreground">
              View your attendance history and statistics
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="border-border hover:border-muted hover:bg-muted transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Classes</p>
                  <p className="text-2xl font-bold text-foreground">{totalClasses}</p>
                  <p className="text-xs text-muted-foreground mt-1">This semester</p>
                </div>
                <div className="flex-shrink-0 bg-primary/10 rounded-xl p-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Attended</p>
                  <p className="text-2xl font-bold text-foreground">{attendedClasses}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {((attendedClasses / totalClasses) * 100).toFixed(0)}% attendance rate
                  </p>
                </div>
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/20 rounded-xl p-3 group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors duration-300">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Absent</p>
                  <p className="text-2xl font-bold text-foreground">{absentClasses}</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    {((absentClasses / totalClasses) * 100).toFixed(0)}% absence rate
                  </p>
                </div>
                <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/20 rounded-xl p-3 group-hover:bg-red-200 dark:group-hover:bg-red-900/30 transition-colors duration-300">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Attendance %</p>
                  <p className="text-2xl font-bold text-foreground">{attendancePercentage}%</p>
                  <p className={`text-xs mt-1 flex items-center ${
                    attendancePercentage >= 75 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {attendancePercentage >= 75 ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Good attendance
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Needs improvement
                      </>
                    )}
                  </p>
                </div>
                <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/20 rounded-xl p-3 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors duration-300">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject-wise Attendance */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-b">
            <CardTitle className="flex items-center">
              <div className="p-2 bg-primary rounded-lg mr-3">
                <BarChart3 className="h-4 w-4 text-primary-foreground" />
              </div>
              Subject-wise Attendance
            </CardTitle>
            <CardDescription>
              Your attendance percentage for each subject
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {mockAcademicPerformance.subjectWiseAttendance.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{subject.subject}</p>
                      <p className="text-sm text-muted-foreground">{subject.attended}/{subject.total} classes attended</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        subject.percentage >= 75 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {subject.percentage}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {subject.percentage >= 75 ? 'Good' : 'Needs improvement'}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        subject.percentage >= 75 ? 'bg-green-600 dark:bg-green-500' : 'bg-red-600 dark:bg-red-500'
                      }`}
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance History */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-600/10 to-primary/10 border-b">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <div className="p-2 bg-green-600 rounded-lg mr-3">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                Attendance History
              </span>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Months</option>
                  <option value="july">July 2023</option>
                  <option value="august">August 2023</option>
                  <option value="september">September 2023</option>
                </select>
              </div>
            </CardTitle>
            <CardDescription>
              Your detailed attendance record ({filteredAttendance.length} records)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Period
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Faculty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {filteredAttendance.map((record) => (
                    <tr key={record.attendanceId} className="hover:bg-accent transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-foreground">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {record.sessionDetails.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          {record.sessionDetails.period}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-foreground">
                          {record.subjectInfo.subjectName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          {record.subjectInfo.faculty}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.attendanceStatus.status)}`}>
                          {getStatusIcon(record.attendanceStatus.status)}
                          <span className="ml-1">{getStatusText(record.attendanceStatus.status)}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredAttendance.length === 0 && (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-muted-foreground">
                    <Calendar className="h-12 w-12" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-foreground">No attendance records found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try selecting a different month
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