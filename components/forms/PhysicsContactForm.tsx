// components/forms/PhysicsContactForm.tsx
'use client';

import { useState, useRef } from 'react';
import { useTheme } from '@/components/ThemeContext';
import { validateInput, sanitizeInput } from '@/lib/security/securityUtils';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationError {
  field: keyof FormData;
  message: string;
}

export const PhysicsContactForm = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = (name: keyof FormData, value: string): string | null => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return null;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateInput(value, 'email')) return 'Please enter a valid email address';
        return null;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.length < 5) return 'Subject must be at least 5 characters';
        return null;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return null;
      default:
        return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);

    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Clear error when user starts typing after field has been touched
    if (touchedFields[name as keyof FormData]) {
      const newErrors = errors.filter(error => error.field !== name);
      setErrors(newErrors);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    const error = validateField(name as keyof FormData, value);
    if (error) {
      const newErrors = errors.filter(err => err.field !== name).concat([{ field: name as keyof FormData, message: error }]);
      setErrors(newErrors);
    } else {
      setErrors(errors.filter(err => err.field !== name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: ValidationError[] = [];
    for (const [key, value] of Object.entries(formData)) {
      const field = key as keyof FormData;
      const error = validateField(field, value as string);
      if (error) {
        newErrors.push({ field, message: error });
      }
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      setIsSubmitting(true);

      // Simulate form submission
      try {
        // In a real application, you would send the data to your API:
        // await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Reset touched fields
        setTouchedFields({
          name: false,
          email: false,
          subject: false,
          message: false
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        setIsSubmitting(false);
        setErrors([{ field: 'name', message: 'Failed to send message. Please try again.' }]);
      }
    }
  };

  const getFieldError = (field: keyof FormData): string | undefined => {
    return errors.find(error => error.field === field)?.message;
  };

  const isFieldValid = (field: keyof FormData): boolean => {
    return !!(touchedFields[field] && !getFieldError(field));
  };

  const isFieldInvalid = (field: keyof FormData): boolean => {
    return !!(touchedFields[field] && getFieldError(field));
  };

  return (
    <div className={`rounded-2xl p-8 shadow-xl ${
      isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
    }`}>
      {submitSuccess ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Message Sent!
          </h3>
          <p className={`text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Thank you for reaching out. We'll get back to you soon.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <motion.div
              className="relative"
              animate={{
                scale: isFieldInvalid('name') ? [1, 1.02, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <label htmlFor="name" className={`block mb-2 font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  isFieldInvalid('name')
                    ? 'border-red-500 focus:ring-red-500 focus:ring-offset-red-50' 
                    : isFieldValid('name')
                      ? 'border-green-500 focus:ring-green-500 focus:ring-offset-green-50' 
                      : 'border-gray-300 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900'
                } ${
                  isDark 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-white text-gray-900'
                }`}
                placeholder="Your name"
              />
              {isFieldInvalid('name') && (
                <motion.p 
                  className="mt-2 text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getFieldError('name')}
                </motion.p>
              )}
            </motion.div>
            
            <motion.div
              className="relative"
              animate={{
                scale: isFieldInvalid('email') ? [1, 1.02, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <label htmlFor="email" className={`block mb-2 font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  isFieldInvalid('email')
                    ? 'border-red-500 focus:ring-red-500 focus:ring-offset-red-50' 
                    : isFieldValid('email')
                      ? 'border-green-500 focus:ring-green-500 focus:ring-offset-green-50' 
                      : 'border-gray-300 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900'
                } ${
                  isDark 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-white text-gray-900'
                }`}
                placeholder="your.email@example.com"
              />
              {isFieldInvalid('email') && (
                <motion.p 
                  className="mt-2 text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getFieldError('email')}
                </motion.p>
              )}
            </motion.div>
            
            <motion.div
              className="relative"
              animate={{
                scale: isFieldInvalid('subject') ? [1, 1.02, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <label htmlFor="subject" className={`block mb-2 font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  isFieldInvalid('subject')
                    ? 'border-red-500 focus:ring-red-500 focus:ring-offset-red-50' 
                    : isFieldValid('subject')
                      ? 'border-green-500 focus:ring-green-500 focus:ring-offset-green-50' 
                      : 'border-gray-300 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900'
                } ${
                  isDark 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-white text-gray-900'
                }`}
                placeholder="How can we help you?"
              />
              {isFieldInvalid('subject') && (
                <motion.p 
                  className="mt-2 text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getFieldError('subject')}
                </motion.p>
              )}
            </motion.div>
            
            <motion.div
              className="relative"
              animate={{
                scale: isFieldInvalid('message') ? [1, 1.02, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <label htmlFor="message" className={`block mb-2 font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  isFieldInvalid('message')
                    ? 'border-red-500 focus:ring-red-500 focus:ring-offset-red-50' 
                    : isFieldValid('message')
                      ? 'border-green-500 focus:ring-green-500 focus:ring-offset-green-50' 
                      : 'border-gray-300 focus:ring-indigo-500 focus:ring-offset-white dark:focus:ring-offset-gray-900'
                } ${
                  isDark 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-white text-gray-900'
                }`}
                placeholder="Tell us about your project..."
              ></textarea>
              {isFieldInvalid('message') && (
                <motion.p 
                  className="mt-2 text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getFieldError('message')}
                </motion.p>
              )}
            </motion.div>
          </div>
          
          <motion.button
            type="submit"
            className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
            } hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            animate={{
              boxShadow: errors.length > 0 
                ? '0 20px 25px -5px rgba(239, 68, 68, 0.3), 0 10px 10px -5px rgba(239, 68, 68, 0.2)' 
                : '0 20px 25px -5px rgba(99, 102, 241, 0.3), 0 10px 10px -5px rgba(99, 102, 241, 0.2)'
            }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <motion.div 
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
                Sending...
              </div>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
};