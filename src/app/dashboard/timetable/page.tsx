'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Download,
  ExternalLink,
  ArrowLeft,
  BookOpen,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { mockTimetable } from '@/data/mockData';

export default function TimetablePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [timetable] = useState(mockTimetable);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [viewMode, setViewMode] = useState<'week' | 'today'>('week');

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
            <p className="mt-4 text-muted-foreground font-medium">Loading timetable...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const goToPreviousWeek = () => {
    setCurrentWeek(prev => prev - 1);
  };

  const goToNextWeek = () => {
    setCurrentWeek(prev => prev + 1);
  };

  const getClassTypeColor = (type: string) => {
    switch (type) {
      case 'Theory':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Practical':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Lab':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'Tutorial':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const getClassTypeIcon = (type: string) => {
    switch (type) {
      case 'Theory':
        return <BookOpen className="h-4 w-4" />;
      case 'Practical':
      case 'Lab':
        return <RefreshCw className="h-4 w-4" />;
      case 'Tutorial':
        return <User className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust when day is Sunday
    
    const monday = new Date(today);
    monday.setDate(diff + (currentWeek * 7));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    
    return weekDates;
  };

  const weekDates = getWeekDates();
  const weekStart = weekDates[0].toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
  const weekEnd = weekDates[6].toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });

  const getClassesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    const dayEntry = timetable.find(entry => 
      entry.date === dateStr || entry.dayOfWeek === dayOfWeek
    );
    
    return dayEntry ? dayEntry.classes : [];
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date();
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

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
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Class Timetable</h1>
            </div>
            <p className="text-muted-foreground">
              View your weekly class schedule
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="flex rounded-lg overflow-hidden border border-border">
              <Button
                variant={viewMode === 'week' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
                className={viewMode === 'week' ? '' : 'border-0'}
              >
                Week View
              </Button>
              <Button
                variant={viewMode === 'today' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('today')}
                className={viewMode === 'today' ? '' : 'border-0'}
              >
                Today
              </Button>
            </div>
            <Button
              variant="outline"
              className="border-border hover:border-muted hover:bg-muted transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button
              variant="outline"
              className="border-border hover:border-muted hover:bg-muted transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Sync to Calendar
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousWeek}
                disabled={currentWeek <= -4} // Limit to 4 weeks back
                className="border-border hover:border-muted hover:bg-muted transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous Week
              </Button>
              
              <h2 className="text-xl font-semibold text-foreground">
                {weekStart} - {weekEnd}
              </h2>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextWeek}
                disabled={currentWeek >= 4} // Limit to 4 weeks forward
                className="border-border hover:border-muted hover:bg-muted transition-all duration-200"
              >
                Next Week
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Timetable */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-b">
            <CardTitle className="flex items-center">
              <div className="p-2 bg-primary rounded-lg mr-3">
                <Calendar className="h-4 w-4 text-primary-foreground" />
              </div>
              Weekly Schedule
            </CardTitle>
            <CardDescription>
              Your classes for this week
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Time
                    </th>
                    {daysOfWeek.map((day, index) => (
                      <th key={day} scope="col" className={`px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider ${
                        isToday(weekDates[index]) ? 'bg-primary/10' : ''
                      }`}>
                        <div className={`font-semibold ${isToday(weekDates[index]) ? 'text-primary' : ''}`}>
                          {day}
                        </div>
                        <div className={`text-xs mt-1 ${isToday(weekDates[index]) ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                          {weekDates[index].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {/* Time slots from 8 AM to 6 PM */}
                  {[
                    '08:00-09:00',
                    '09:00-10:00',
                    '10:00-11:00',
                    '11:00-12:00',
                    '12:00-13:00',
                    '13:00-14:00',
                    '14:00-15:00',
                    '15:00-16:00',
                    '16:00-17:00',
                    '17:00-18:00',
                  ].map((timeSlot) => (
                    <tr key={timeSlot}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          {timeSlot}
                        </div>
                      </td>
                      {daysOfWeek.map((day, dayIndex) => {
                        const classes = getClassesForDate(weekDates[dayIndex]);
                        const classForSlot = classes.find(c => {
                          const [startTime] = timeSlot.split('-');
                          const [classStartTime] = c.time.split('-');
                          return classStartTime === startTime;
                        });
                         
                        return (
                          <td key={`${day}-${timeSlot}`} className={`px-6 py-4 whitespace-nowrap text-sm text-muted-foreground ${
                            isToday(weekDates[dayIndex]) ? 'bg-primary/5' : ''
                          }`}>
                            {classForSlot ? (
                              <div className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${getClassTypeColor(classForSlot.type)}`}>
                                <div className="flex items-center mb-2">
                                  {getClassTypeIcon(classForSlot.type)}
                                  <span className="ml-1 font-semibold text-xs">{classForSlot.type}</span>
                                </div>
                                <div className="font-medium text-sm">{classForSlot.subject}</div>
                                <div className="flex items-center mt-1">
                                  <User className="h-3 w-3 mr-1" />
                                  <span className="text-xs">{classForSlot.faculty}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span className="text-xs">{classForSlot.room}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="h-20"></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Today's Classes */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600/10 to-primary/10 border-b">
            <CardTitle className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg mr-3">
                <Clock className="h-4 w-4 text-white" />
              </div>
              Today&rsquo;s Classes
            </CardTitle>
            <CardDescription>
              Your schedule for today ({today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })})
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {getClassesForDate(today).length > 0 ? (
                getClassesForDate(today).map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-muted hover:shadow-md transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${getClassTypeColor(classItem.type)}`}>
                        {getClassTypeIcon(classItem.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{classItem.subject}</p>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {classItem.time}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-1" />
                          {classItem.faculty}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {classItem.room}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getClassTypeColor(classItem.type)}`}>
                      {classItem.type}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 text-muted-foreground">
                    <AlertCircle className="h-12 w-12" />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-foreground">No classes scheduled for today</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enjoy your day off!
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
