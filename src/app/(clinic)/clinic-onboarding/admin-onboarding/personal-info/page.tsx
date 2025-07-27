'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo, setCurrentStep } from '@/store/adminSlice';
import { RootState } from '@/store/store';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { useRef } from 'react';
import Image from 'next/image';


const PersonalInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.admin.personalInfo);
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  // const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);

  const [formData, setFormData] = useState({
    fullName: personalInfo.fullName || '',
    email: personalInfo.email || '',
    phone: personalInfo.phone || '',
    designation: personalInfo.designation || '',
    dateOfBirth: '',
    profilePhoto: null as File | null,
  });

  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: '',
    dateofbirth:""
  });
  const [isUploading, setIsUploading] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    try {
      const localData = window.localStorage.getItem('userData');
      const parsedData = localData ? JSON.parse(localData) : {};

      setFormData(prev => ({
        ...prev,
        fullName: user?.displayName || parsedData.name || prev.fullName,
        email: user?.email || parsedData.email || prev.email,
        phone: user?.phoneNumber || parsedData.phone || prev.phone,
      }));

      if (user?.phoneNumber || parsedData.phone) {
        // setIsPhoneVerified(true);
      }
    } catch (err) {
      console.error('Error loading auth/localStorage data:', err);
    }
  }, [user]);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setIsUploading(true);

  const reader = new FileReader();
  reader.onloadend = () => {
    const base64 = (reader.result as string).split(',')[1]; // strip the data:...prefix
    dispatch(updatePersonalInfo({
      ...personalInfo,
      profilePhoto: {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        base64,
      },
    }));
    setIsUploading(false);
  };
  reader.onerror = () => {
    console.error('Error reading file');
    setIsUploading(false);
  };

  reader.readAsDataURL(file);
};


  const validateForm = () => {
    let isValid = true;
    const errors = {
      fullName: '',
      email: '',
      phone: '',
      designation: '',
      dateofbirth:''
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
      if (!formData.dateOfBirth.trim()) {
  errors.dateofbirth = 'Date of Birth is required';
  isValid = false;
} else {
  const dob = new Date(formData.dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  // Adjust age if birthday hasn't occurred yet this year
  const isBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
  const actualAge = isBirthdayPassed ? age : age - 1;

  if (actualAge < 18) {
    errors.dateofbirth = 'You must be at least 18 years old';
    isValid = false;
  }
}

    // if (!isPhoneVerified) {
    //   errors.phone = 'Phone number needs to be verified';
    //   isValid = false;
    // }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto' && files) {
      setFormData(prev => ({ ...prev, profilePhoto: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }

  //   if (name === 'phone') {
  //     setIsPhoneVerified(false);
  //   }
  };

  const handleCheckPhone = async () => {
    if (!formData.phone.trim()) {
      setFormErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
      return;
    }

    setIsCheckingPhone(true);
    try {
      const response = await axios.post('/api/check-phone', {
        phoneNumber: formData.phone
      });

      if (response.data.exists) {
        setFormErrors(prev => ({ 
          ...prev, 
          phone: 'This phone number is already registered. Please use a different number.'
        }));
      } else {
        const userData = {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        };
        window.localStorage.setItem('userData', JSON.stringify(userData));

        router.push(`/sign-up/verify-otp?returnUrl=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      }
    } catch (error) {
      console.error('Error checking phone:', error);
      setFormErrors(prev => ({ 
        ...prev, 
        phone: 'Error checking phone number. Please try again.' 
      }));
    } finally {
      setIsCheckingPhone(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      };
      window.localStorage.setItem('userData', JSON.stringify(userData));

      dispatch(updatePersonalInfo({
        ...formData,
        profilePhoto: formData.profilePhoto
          ? {
              name: formData.profilePhoto.name,
              size: formData.profilePhoto.size,
              type: formData.profilePhoto.type,
              lastModified: formData.profilePhoto.lastModified,
            }
          : null,
      }));

      dispatch(setCurrentStep(1));
      router.push('/clinic-onboarding/admin-onboarding/clinic-info');
    } catch (error) {
      console.error('Error saving personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const verificationStatus = searchParams.get('verified');
    if (verificationStatus === 'true') {
      // setIsPhoneVerified(true);
    }
  }, [searchParams]);

  const userDataString = typeof window !== 'undefined' ? window.localStorage.getItem('userData') : null;
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const isFullNameReadOnly = !!userData.name;
  const isEmailReadOnly = !!userData.email;
  const isPhoneReadOnly = !!userData.phone;

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
          placeholder="Full Name*"
          readOnly={isFullNameReadOnly}
          className={`w-full px-4 py-3 rounded-full text-[#086861] border ${
            formErrors.fullName ? 'border-red-500' : 'border-[#086861]'
          } focus:outline-none focus:ring-2 focus:ring-[#00665B] ${
            isFullNameReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
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
          placeholder="E-mail*"
          readOnly={isEmailReadOnly}
          className={`w-full px-4 py-3 rounded-full border text-[#086861] ${
            formErrors.email ? 'border-red-500' : 'border-[#086861]'
          } focus:outline-none focus:ring-2 focus:ring-[#00665B] ${
            isEmailReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />
        {formErrors.email && (
          <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.email}</p>
        )}
      </div>

      <div className="relative">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number*"
          readOnly={isPhoneReadOnly}
          className={`w-full px-4 py-3 rounded-full text-[#086861] border ${
            formErrors.phone ? 'border-red-500' : 'border-[#086861]'
          } focus:outline-none focus:ring-2 focus:ring-[#00665B] ${
            isPhoneReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''
          } ${!isPhoneReadOnly && formData.phone ? 'pr-24' : ''}`}
        />
        {!isPhoneReadOnly && formData.phone  && (
          <button
            type="button"
            onClick={handleCheckPhone}
            disabled={isCheckingPhone}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-[#00665B] font-medium hover:text-[#005249] focus:outline-none"
          >
            {isCheckingPhone ? 'Checking...' : 'Verify Phone'}
          </button>
        )}
        {!isPhoneReadOnly  && (
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-green-600 font-medium">
            Verified
          </span>
        )}
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
          placeholder="Designation*"
          className={`w-full px-4 py-3 rounded-full text-[#086861] border ${
            formErrors.designation ? 'border-red-500' : 'border-[#086861]'
          } focus:outline-none focus:ring-2 focus:ring-[#00665B]`}
        />
        {formErrors.designation && (
          <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.designation}</p>
        )}
      </div>

      <div>
        <label className="block text-xs text-gray-500 mt-1">Date of Birth<span>*</span></label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          placeholder="Date of Birth"
          className={`w-full px-4 py-3 rounded-full text-[#086861] border ${
            formErrors.dateofbirth ? 'border-red-500' : 'border-[#086861]'
          } focus:outline-none focus:ring-2 focus:ring-[#00665B]`}
        />
        {formErrors.dateofbirth && (
  <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.dateofbirth}</p>
)}

      </div>


{/* profile Photo */}
            <div>
              <label className="block text-xs text-gray-500 mt-1">
              Profile Photo (Optional)
              {personalInfo.profilePhoto && (
                <span className="ml-2 text-[#086861]">
                  ({(personalInfo.profilePhoto.size / 1024 / 1024).toFixed(2)}{" "}
                  MB)
                </span>
              )}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden text-xs pl-4"
              disabled={isUploading}
            />
            <div
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`w-full p-3 border border-[#086861] rounded-full bg-white cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Profile Photo Preview */}
                {personalInfo.profilePhoto && !isUploading && (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={`data:${personalInfo.profilePhoto.type};base64,${personalInfo.profilePhoto.base64}`}
                      alt="Profile preview"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                )}
                <span
                  className={
                    personalInfo.profilePhoto
                      ? "text-gray-700 text-sm"
                      : "text-[#086861] text-sm"
                  }
                >
                  {isUploading
                    ? "Uploading..."
                    : personalInfo.profilePhoto
                    ? personalInfo.profilePhoto.name
                    : "Choose File"}
                </span>
              </div>
              {isUploading ? (
                <svg
                  className="w-5 h-5 text-teal-500 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </div>
            
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
