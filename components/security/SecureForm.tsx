// components/security/SecureForm.tsx
import { useState, useRef } from 'react';
import { validateInput, sanitizeInput, generateCSRFToken, RateLimiter } from '@/lib/security/securityUtils';

interface SecureFormProps {
  onSubmit: (data: Record<string, string>) => Promise<void>;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'textarea';
    required?: boolean;
    validation?: 'text' | 'email' | 'url' | 'phone';
  }>;
  submitText?: string;
  className?: string;
}

export const SecureForm = ({ 
  onSubmit, 
  fields, 
  submitText = "Submit", 
  className = "" 
}: SecureFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  
  // Initialize CSRF token
  const [csrfToken] = useState(() => generateCSRFToken());
  
  // Rate limiter for this form
  const rateLimiter = useRef(new RateLimiter(5 * 60 * 1000)); // 5 minutes window

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Sanitize input as user types
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    for (const field of fields) {
      const value = formData[field.name] || '';

      // Required field validation
      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        continue;
      }

      // Type-specific validation
      if (value && field.validation) {
        if (!validateInput(value, field.validation)) {
          newErrors[field.name] = `Invalid ${field.label}`;
        }
      }

      // General input validation
      if (value && !validateInput(value)) {
        newErrors[field.name] = `${field.label} contains invalid characters`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limit for form submission
    const clientId = `${window.location.pathname}-${new Date().getHours()}`; // Rate limit per hour per page
    if (!rateLimiter.current.isAllowed(clientId, 5)) { // Max 5 submissions per hour
      setRateLimitMessage("Form submission limit reached. Please try again later.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setRateLimitMessage("");

    try {
      // Add CSRF token to form data
      const submissionData = {
        ...formData,
        _csrf: csrfToken
      };

      await onSubmit(submissionData);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({});
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className={className}
      noValidate // We'll handle validation ourselves
    >
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label 
            htmlFor={field.name} 
            className="block text-sm font-medium mb-1"
          >
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                errors[field.name] 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
              aria-invalid={!!errors[field.name]}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                errors[field.name] 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
              aria-invalid={!!errors[field.name]}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
          )}
          
          {errors[field.name] && (
            <p id={`${field.name}-error`} className="mt-1 text-sm text-red-500">
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      {rateLimitMessage && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
          {rateLimitMessage}
        </div>
      )}

      {errors.submit && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {errors.submit}
        </div>
      )}

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          Form submitted successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : (
          submitText
        )}
      </button>
      
      {/* Hidden CSRF token field */}
      <input type="hidden" name="_csrf" value={csrfToken} />
    </form>
  );
};