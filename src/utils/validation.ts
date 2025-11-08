import { ValidationRule, ValidationState } from '@/types';
import { VALIDATION_STATES } from '@/constants';

export const validateField = (
  value: string,
  rules: ValidationRule[]
): { isValid: boolean; message: string } => {
  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value.trim()) {
          return { isValid: false, message: rule.message };
        }
        break;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return { isValid: false, message: rule.message };
        }
        break;
      
      case 'minLength':
        if (value.length < (rule.value as number)) {
          return { isValid: false, message: rule.message };
        }
        break;
      
      case 'maxLength':
        if (value.length > (rule.value as number)) {
          return { isValid: false, message: rule.message };
        }
        break;
      
      case 'pattern':
        const regex = new RegExp(rule.value as string);
        if (!regex.test(value)) {
          return { isValid: false, message: rule.message };
        }
        break;
    }
  }
  
  return { isValid: true, message: '' };
};

export const getValidationIcon = (isValid: boolean, touched: boolean): string => {
  if (!touched) return '';
  return isValid ? VALIDATION_STATES.COMPLETE : VALIDATION_STATES.INCOMPLETE;
};

export const validateForm = (
  formData: Record<string, string>,
  formFields: Array<{ name: string; validation?: ValidationRule[] }>
): ValidationState => {
  const validationState: ValidationState = {};
  
  formFields.forEach(field => {
    if (field.validation) {
      const result = validateField(formData[field.name] || '', field.validation);
      validationState[field.name] = {
        isValid: result.isValid,
        message: result.message,
        touched: false,
      };
    }
  });
  
  return validationState;
};

export const isFormValid = (validationState: ValidationState): boolean => {
  return Object.values(validationState).every(field => 
    field.isValid && field.touched
  );
};

// Common validation rules
export const commonValidationRules = {
  required: { type: 'required' as const, message: 'This field is required' },
  email: { type: 'email' as const, message: 'Please enter a valid email address' },
  phone: { 
    type: 'pattern' as const, 
    value: '^[0-9]{10}$', 
    message: 'Please enter a valid 10-digit phone number' 
  },
  minLength: (min: number) => ({
    type: 'minLength' as const,
    value: min,
    message: `Minimum ${min} characters required`
  }),
  maxLength: (max: number) => ({
    type: 'maxLength' as const,
    value: max,
    message: `Maximum ${max} characters allowed`
  }),
};