'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo, setCurrentStep } from '@/store/adminSlice';
import { RootState } from '@/store/store';

const PersonalInfo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.admin.personalInfo);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: personalInfo.fullName || '',
    email: personalInfo.email || '',
    phone: personalInfo.phone || '',
    designation: personalInfo.designation || '',
  });
  
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: '',
  });
  
  const validateForm = () => {
    let isValid = true;
    const errors = {
      fullName: '',
      email: '',
      phone: '',
      designation: '',
    };
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    }
    
    if (!formData.designation.trim()) {
      errors.designation = 'Designation is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Save data to Redux
      dispatch(updatePersonalInfo(formData));
      dispatch(setCurrentStep(1));
      
      // Navigate to next step
      router.push('/clinic-management/admin-onboarding/clinic-info');
    } catch (error) {
      console.error('Error saving personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className={`w-full px-4 py-3 rounded-full border ${
            formErrors.fullName ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-[#00665B]`}
        />
        {formErrors.fullName && (
          <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.fullName}</p>
        )}
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className={`w-full px-4 py-3 rounded-full border ${
            formErrors.email ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-[#00665B]`}
        />
        {formErrors.email && (
          <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.email}</p>
        )}
      </div>
      
      <div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className={`w-full px-4 py-3 rounded-full border ${
            formErrors.phone ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-[#00665B]`}
        />
        {formErrors.phone && (
          <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.phone}</p>
        )}
      </div>
      
      <div>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Designation"
          className={`w-full px-4 py-3 rounded-full border ${
            formErrors.designation ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-[#00665B]`}
        />
        {formErrors.designation && (
          <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.designation}</p>
        )}
      </div>
      
      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#00665B] text-white py-3 rounded-full font-medium hover:bg-[#005249] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00665B] disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Next'
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default PersonalInfo;