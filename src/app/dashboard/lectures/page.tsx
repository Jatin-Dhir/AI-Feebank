'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { 
  BookOpen, 
  Download, 
  FileText, 
  Video, 
  Image, 
  Calendar,
  User,
  Filter,
  Search,
  ArrowLeft,
  Clock,
  Star,
  Eye,
  BarChart3
} from 'lucide-react';
import { mockSubjects } from '@/data/mockData';

export default function LecturesPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [subjects] = useState(mockSubjects);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
            <p className="mt-4 text-muted-foreground font-medium">Loading lectures...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'pptx':
        return <FileText className="h-5 w-5 text-orange-500" />;
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'mp4':
        return <Video className="h-5 w-5 text-purple-500" />;
      case 'jpg':
      case 'png':
        return <Image className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'pptx':
        return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'docx':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'mp4':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'jpg':
      case 'png':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const filteredResources = subjects
    .filter(subject => selectedSubject === 'all' || subject.subjectCode === selectedSubject)
    .flatMap(subject => 
      subject.resources.map(resource => ({
        ...resource,
        subjectName: subject.subjectName,
        subjectCode: subject.subjectCode,
        faculty: subject.faculty.name
      }))
    )
    .filter(resource => 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Lectures & Resources</h1>
            </div>
            <p className="text-muted-foreground">
              Access course materials and lecture resources
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <div className="flex rounded-lg overflow-hidden border border-border">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? '' : 'border-0'}
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? '' : 'border-0'}
              >
                List View
              </Button>
            </div>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.subjectCode} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{subject.subjectName}</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-600">4.5</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {subject.credits} Credits
                    </span>
                  </div>
                </CardTitle>
                <CardDescription className="flex items-center">
                  <span className="font-medium">{subject.subjectCode}</span>
                  <span className="mx-2">•</span>
                  <span>{subject.semester}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    {subject.faculty.name}
                  </div>
                   
                  {subject.schedule.theory && (
                    <div className="flex items-center text-sm text-muted-foreground p-3 bg-primary/10 rounded-lg">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium text-primary">Theory:</span>
                      <span className="ml-1">{subject.schedule.theory.day}, {subject.schedule.theory.time}</span>
                    </div>
                  )}
                   
                  {subject.schedule.practical && (
                    <div className="flex items-center text-sm text-muted-foreground p-3 bg-green-600/10 rounded-lg">
                      <Calendar className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-medium text-green-600">Practical:</span>
                      <span className="ml-1">{subject.schedule.practical.day}, {subject.schedule.practical.time}</span>
                    </div>
                  )}
                   
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-foreground">
                        Resources ({subject.resources.length})
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubject(subject.subjectCode)}
                        className="border-primary/20 hover:border-primary/30 hover:bg-primary/10 transition-all duration-200"
                      >
                        View All
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {subject.resources.slice(0, 2).map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg hover:bg-accent transition-colors duration-200">
                          <div className="flex items-center flex-1 min-w-0">
                            {getFileIcon(resource.type)}
                            <span className="ml-2 text-sm text-muted-foreground truncate">
                              {resource.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">{resource.size}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(resource.downloadUrl, '_blank')}
                              className="p-1 h-8 w-8 hover:bg-primary/10 transition-colors duration-200"
                            >
                              <Download className="h-4 w-4 text-primary" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {subject.resources.length > 2 && (
                        <p className="text-xs text-muted-foreground text-center py-1">
                          +{subject.resources.length - 2} more resources
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Resources */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-b">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <div className="p-2 bg-primary rounded-lg mr-3">
                  <BookOpen className="h-5 w-5 text-primary-foreground" />
                </div>
                All Resources
              </span>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  >
                    <option value="all">All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject.subjectCode} value={subject.subjectCode}>
                        {subject.subjectName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardTitle>
            <CardDescription>
              Download lecture materials and resources
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Resource
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Faculty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {filteredResources.map((resource, index) => (
                    <tr key={index} className="hover:bg-accent transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getFileIcon(resource.type)}
                          <div className="ml-3">
                            <div className="text-sm font-medium text-foreground">
                              {resource.title}
                            </div>
                            <div className="flex items-center mt-1">
                              <Eye className="h-3 w-3 text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100) + 10} views</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-foreground">{resource.subjectName}</div>
                        <div className="text-xs text-muted-foreground">{resource.subjectCode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {resource.faculty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getFileTypeColor(resource.type)}`}>
                          {resource.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {resource.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {resource.uploadDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(resource.downloadUrl, '_blank')}
                            className="border-primary/20 hover:border-primary/30 hover:bg-primary/10 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(resource.downloadUrl, '_blank')}
                            className="border-green-600/20 hover:border-green-600/30 hover:bg-green-600/10 transition-all duration-200"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-muted-foreground">
                  <BookOpen className="h-12 w-12" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-foreground">No resources found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600/10 to-primary/10 border-b">
            <CardTitle className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg mr-3">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              Resource Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{filteredResources.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Total Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {filteredResources.filter(r => r.type === 'pdf').length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">PDF Documents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {filteredResources.filter(r => r.type === 'mp4').length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Video Lectures</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {filteredResources.filter(r => ['pptx', 'docx'].includes(r.type)).length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Presentations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}