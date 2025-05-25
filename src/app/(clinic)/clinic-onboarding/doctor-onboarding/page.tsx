"use client"
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo, nextStep, FileData } from '@/store/doctorSlice';
import { RootState } from '@/store/store';
import OnboardingLayout from './OnboardingLayout';
import { useRouter } from 'next/navigation';

const PersonalInfoPage: React.FC = () => {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector((state: RootState) => state.doctorOnboarding);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  // Helper function to convert File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:mime/type;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = (field: keyof typeof personalInfo, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsUploading(true);
        
        // Convert file to base64
        const base64 = await fileToBase64(file);
        
        // Create FileData object with metadata and base64 content
        const fileData: FileData = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          base64: base64
        };
        
        // Store in Redux with serializable data
        dispatch(updatePersonalInfo({ profilePhoto: fileData }));
        
      } catch (error) {
        console.error('Error converting file to base64:', error);
        alert('Error uploading profile photo. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleNext = () => {
    // Basic validation
    if (!personalInfo.fullName || !personalInfo.emailAddress || !personalInfo.phoneNumber || !personalInfo.dateOfBirth) {
      alert('Please fill in all required fields');
      return;
    }
    
    dispatch(nextStep());
    router.push("/clinic-onboarding/doctor-onboarding/professional-details");
  };

  return (
    <OnboardingLayout currentStep={1}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-medium text-gray-700 mb-6">Personal & Contact Information</h3>
        
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={personalInfo.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Email Address */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={personalInfo.emailAddress}
              onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Phone Number */}
          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={personalInfo.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Date of Birth and Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="date"
                placeholder="DD / MM / YYYY"
                value={personalInfo.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
              />
              <label className="block text-xs text-gray-500 mt-1">Date Of Birth</label>
            </div>
            
            <div>
              <select
                value={personalInfo.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 appearance-none bg-no-repeat bg-right pr-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundSize: '16px',
                  backgroundPosition: 'right 12px center'
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label className="block text-xs text-gray-500 mt-1">Gender</label>
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
            <div 
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`w-full p-3 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Profile Photo Preview */}
                {personalInfo.profilePhoto && !isUploading && (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={`data:${personalInfo.profilePhoto.type};base64,${personalInfo.profilePhoto.base64}`}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className={personalInfo.profilePhoto ? "text-gray-700 text-sm" : "text-gray-400 text-sm"}>
                  {isUploading 
                    ? 'Uploading...' 
                    : personalInfo.profilePhoto 
                      ? personalInfo.profilePhoto.name 
                      : "Choose File"
                  }
                </span>
              </div>
              {isUploading ? (
                <svg className="w-5 h-5 text-teal-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
            </div>
            <label className="block text-xs text-gray-500 mt-1">
              Profile Photo (Optional)
              {personalInfo.profilePhoto && (
                <span className="ml-2 text-green-600">
                  ({(personalInfo.profilePhoto.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              )}
            </label>
          </div>
        </div>

        {/* Upload Progress Indicator */}
        {isUploading && (
          <div className="text-center py-2">
            <span className="text-sm text-teal-600">Processing image...</span>
          </div>
        )}

        {/* Next Button */}
        <div className="pt-6">
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUploading}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
};

export default PersonalInfoPage;