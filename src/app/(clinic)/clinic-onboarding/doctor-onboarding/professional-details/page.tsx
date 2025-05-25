"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfessionalDetails, nextStep, previousStep } from '@/store/doctorSlice';
import { RootState } from '@/store/store';
import OnboardingLayout from '../OnboardingLayout';
import { useRouter } from 'next/navigation';

const ProfessionalDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { professionalDetails } = useSelector((state: RootState) => state.doctorOnboarding);

  const handleInputChange = (field: keyof typeof professionalDetails, value: string) => {
    dispatch(updateProfessionalDetails({ [field]: value }));
  };

  const handleNext = () => {
    // Basic validation
    if (!professionalDetails.medicalLicenseNumber || !professionalDetails.specialization || !professionalDetails.yearsOfExperience) {
      alert('Please fill in all required fields');
      return;
    }
    
    dispatch(nextStep());
    router.push("/clinic-onboarding/doctor-onboarding/documents")
  };

  const handleBack = () => {
    dispatch(previousStep());
    router.back()
  };

  return (
    <OnboardingLayout currentStep={2}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-lg font-medium text-gray-700 mb-6">Professional Details</h3>
        
        <div className="space-y-4">
          {/* Medical License Number */}
          <div>
            <input
              type="text"
              placeholder="Medical License Number"
              value={professionalDetails.medicalLicenseNumber}
              onChange={(e) => handleInputChange('medicalLicenseNumber', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Specialization */}
          <div>
            <input
              type="text"
              placeholder="Specialization"
              value={professionalDetails.specialization}
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Years of Experience */}
          <div>
            <input
              type="number"
              placeholder="Years Of Experience"
              value={professionalDetails.yearsOfExperience}
              onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Associated Clinic/Hospital Name */}
          <div>
            <input
              type="text"
              placeholder="Associated Clinic/Hospital Name"
              value={professionalDetails.associatedClinicHospitalName}
              onChange={(e) => handleInputChange('associatedClinicHospitalName', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Consultation Type */}
          <div>
            <select
              value={professionalDetails.consultationType}
              onChange={(e) => handleInputChange('consultationType', e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-gray-700 appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundSize: '16px',
                backgroundPosition: 'right 12px center'
              }}
            >
              <option value="In-Person">In-Person</option>
              <option value="Virtual">Virtual</option>
              <option value="Both">Both</option>
            </select>
            <label className="block text-xs text-gray-500 mt-1">Consultation Type</label>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="pt-6 flex gap-4">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Back
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </OnboardingLayout>
  );
};

export default ProfessionalDetailsPage;