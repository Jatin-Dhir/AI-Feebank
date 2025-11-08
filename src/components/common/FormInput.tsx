'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface FormInputProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  rows?: number;
  className?: string;
  id?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, type, value, onChange, error, required = false, placeholder, options, rows, className, id, onBlur, touched, icon, disabled = false }, ref) => {
    const inputId = id || `input-${name}`;
    
    return (
      <div className={cn('mb-4', className)}>
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {type === 'select' ? (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={cn(
              'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
              disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
            )}
          >
            <option value="">Select {label}</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows || 3}
            disabled={disabled}
            className={cn(
              'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
              disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
            )}
          />
        ) : (
          <div className="relative">
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
            <input
              ref={ref}
              id={inputId}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
                touched && !error ? 'border-green-500 focus:ring-green-500 focus:border-green-500' : '',
                icon ? 'pl-10' : '',
                disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''
              )}
            />
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;