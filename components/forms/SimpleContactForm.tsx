// components/forms/SimpleContactForm.tsx
'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export const SimpleContactForm = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  if (submitSuccess) {
    return (
      <motion.div
        className={`p-8 rounded-2xl shadow-xl ${
          isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`p-8 rounded-2xl shadow-xl ${
        isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'
      }`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
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
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:ring-offset-gray-800' 
                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:ring-offset-white'
            }`}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div>
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
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:ring-offset-gray-800' 
                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:ring-offset-white'
            }`}
            placeholder="john@example.com"
            required
          />
        </div>
        
        <div>
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
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:ring-offset-gray-800' 
                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:ring-offset-white'
            }`}
            placeholder="How can we help you?"
            required
          />
        </div>
        
        <div>
          <label htmlFor="message" className={`block mb-2 font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:ring-offset-gray-800' 
                : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:ring-offset-white'
            }`}
            placeholder="Tell us about your project..."
            required
          ></textarea>
        </div>
        
        <motion.button
          type="submit"
          className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
          } transform hover:-translate-y-0.5`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
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
    </motion.div>
  );
};