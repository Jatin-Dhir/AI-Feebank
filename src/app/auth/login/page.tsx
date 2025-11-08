'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Lock, Eye, EyeOff, GraduationCap, Shield, CheckCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import FormInput from '@/components/common/FormInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { validateField, commonValidationRules } from '@/utils/validation';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change
    if (touched[name]) {
      const validationRules = name === 'username'
        ? [commonValidationRules.required]
        : [commonValidationRules.required, commonValidationRules.minLength(6)];
      
      const result = validateField(value, validationRules);
      setErrors(prev => ({ ...prev, [name]: result.message }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    const validationRules = name === 'username' 
      ? [commonValidationRules.required]
      : [commonValidationRules.required, commonValidationRules.minLength(6)];
    
    const result = validateField(formData[name as keyof typeof formData], validationRules);
    setErrors(prev => ({ ...prev, [name]: result.message }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    
    // Validate username
    const usernameResult = validateField(formData.username, [commonValidationRules.required]);
    if (!usernameResult.isValid) {
      newErrors.username = usernameResult.message;
    }
    newTouched.username = true;
    
    // Validate password
    const passwordResult = validateField(formData.password, [commonValidationRules.required, commonValidationRules.minLength(6)]);
    if (!passwordResult.isValid) {
      newErrors.password = passwordResult.message;
    }
    newTouched.password = true;
    
    setErrors(newErrors);
    setTouched(newTouched);
    
    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any credentials
      // In real app, this would be an actual API call
      if (formData.username && formData.password) {
        // Store mock session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('studentId', '2023BCA1711');
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setErrors({ general: ERROR_MESSAGES.INVALID_CREDENTIALS });
      }
    } catch (error) {
      setErrors({ general: ERROR_MESSAGES.NETWORK_ERROR });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding & Info */}
          <div className="hidden lg:block text-center lg:text-left space-y-6 p-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FeeBank Portal
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Your comprehensive student management platform. Access fee payments, attendance records, 
              academic performance, and more - all in one place.
            </p>
            
            <div className="space-y-4 pt-6">
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Secure fee payment processing</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Real-time attendance tracking</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Academic performance monitoring</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Instant notifications & updates</span>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Secured with enterprise-grade encryption</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mx-auto mb-4 lg:hidden">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  Welcome Back
                </CardTitle>
                
                <CardDescription className="text-center text-gray-600">
                  Sign in to your student account to continue
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-slide-up">
                      {errors.general}
                    </div>
                  )}
                  
                  <div className="relative">
                    <FormInput
                      id="username"
                      name="username"
                      type="text"
                      label="Username / Student ID"
                      placeholder="Enter your username or student ID"
                      value={formData.username}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      error={errors.username}
                      touched={touched.username}
                      required
                      icon={<User className="h-5 w-5 text-gray-400" />}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="relative">
                    <FormInput
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      error={errors.password}
                      touched={touched.password}
                      required
                      icon={<Lock className="h-5 w-5 text-gray-400" />}
                      className="pr-12 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </Button>

                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 bg-blue-50 rounded-lg p-3">
                      <span className="font-medium text-blue-700">Demo Credentials:</span> Any username and password will work
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            {/* Mobile Branding */}
            <div className="text-center mt-8 lg:hidden">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                FeeBank Portal
              </h2>
              <p className="text-sm text-gray-600">
                Your comprehensive student management platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}