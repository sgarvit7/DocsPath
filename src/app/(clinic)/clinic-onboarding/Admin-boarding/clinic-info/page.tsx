"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  updateClinicInfo,
  nextStep,
  previousStep,
} from "@/store/adminSlice";
import { RootState } from "@/store/store";
import OnboardingLayout from "../OnboardingLayout";
import { useRouter } from "next/navigation";

const ProfessionalDetailsPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const clinicInfo = useSelector((state: RootState) => state.admin.clinicInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [customClinicType, setCustomClinicType] = useState("");
  const [address, setAddress] = useState("");

  const [formData, setFormData] = useState({
    clinicName: clinicInfo.clinicName || '',
    clinicType: clinicInfo.clinicType || '',
    registrationNumber: clinicInfo.registrationNumber || '',
    establishmentYear: clinicInfo.establishmentYear || '',
  });

  const [formErrors, setFormErrors] = useState({
    clinicName: '',
    clinicType: '',
    registrationNumber: '',
  });

  const clinicTypes = [
    'General Practice',
    'Specialty Clinic',
    'Multi-specialty Hospital',
    'Dental Clinic',
    'Eye Care Center',
    'Diagnostic Center',
    'Rehabilitation Center',
    'Other'
  ];

  useEffect(() => {
    const storedAddress = localStorage.getItem("address");
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    const errors = {
      clinicName: '',
      clinicType: '',
      registrationNumber: '',
      establishmentYear: '',
    };

    if (!formData.clinicName.trim()) {
      errors.clinicName = 'Clinic/Hospital name is required';
      isValid = false;
    }

    if (!formData.clinicType) {
      errors.clinicType = 'Clinic type is required';
      isValid = false;
    }

    if (!formData.registrationNumber.trim()) {
      errors.registrationNumber = 'Registration number is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const finalClinicType = formData.clinicType === "Other" ? customClinicType : formData.clinicType;
      dispatch(updateClinicInfo({ ...formData, clinicType: finalClinicType }));
      dispatch(nextStep());
      router.push('/clinic-onboarding/Admin-boarding/documents');
    } catch (error) {
      console.error('Error saving clinic info:', error);
    } finally {
      setIsLoading(false);
    }
    console.log(formData);
  };

  const handleBack = () => {
    dispatch(previousStep());
    router.back();
  };

  return (
    <OnboardingLayout currentStep={2}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-7"
      >
        <h3 className="text-xl text-center font-medium text-gray-400 mb-3">
          Clinic Information
        </h3>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
              placeholder="Clinic/Hospital Name*"
              className={`w-full p-3 rounded-full text-sm bg-[#F4F9F9] text-[#086861] placeholder-[#086861] border ${
                formErrors.clinicName ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-[#00665B]`}
            />
            {formErrors.clinicName && (
              <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.clinicName}</p>
            )}
          </div>

          <div>
            <div className={`relative w-full rounded-full text-sm bg-[#F4F9F9] text-[#086861] placeholder-[#086861] border ${
              formErrors.clinicType ? 'border-red-500' : 'border-gray-200'
            } focus-within:ring-2 focus-within:ring-[#00665B]`}>
              <select
                name="clinicType"
                value={formData.clinicType}
                onChange={handleChange}
                className="w-full px-4 py-3 cursor-pointer rounded-full text-[#086861] appearance-none bg-transparent focus:outline-none"
              >
                <option value="" disabled>Type Of Hospital/Clinic *</option>
                {clinicTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {formErrors.clinicType && (
              <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.clinicType}</p>
            )}
          </div>

          {formData.clinicType === "Other" && (
            <div>
              <input
                type="text"
                placeholder="Enter your clinic type"
                value={customClinicType}
                onChange={(e) => setCustomClinicType(e.target.value)}
                className="w-full p-3 rounded-full text-sm bg-[#F4F9F9] text-[#086861] placeholder-[#086861] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00665B]"
              />
            </div>
          )}

          <div>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Registration Number / License ID *"
              className={`w-full p-3 rounded-full text-sm bg-[#F4F9F9] text-[#086861] placeholder-[#086861] border ${
                formErrors.registrationNumber ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-[#00665B]`}
            />
            {formErrors.registrationNumber && (
              <p className="text-red-500 text-xs mt-1 ml-4">{formErrors.registrationNumber}</p>
            )}
          </div>

          <div>
            <div className="relative w-full rounded-full text-sm bg-[#F4F9F9] text-[#086861] placeholder-[#086861] border border-gray-200 focus-within:ring-2 focus-within:ring-[#00665B]">
              <select
                name="establishmentYear"
                value={formData.establishmentYear}
                onChange={handleChange}
                className="w-full p-3 cursor-pointer rounded-full text-sm bg-[#F4F9F9] text-[#086861] placeholder-[#086861] appearance-none bg-transparent focus:outline-none"
              >
                <option value="" disabled>Year Of Establishment</option>
                {Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => 1900 + i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {address && (
            <div>
              <input
                type="text"
                value={address}
                readOnly
                className="w-full p-3 rounded-full text-sm bg-gray-100 text-gray-700 placeholder-gray-400 border border-gray-200"
              />
              <label className="block text-xs text-gray-500 mt-1 ml-2">Clinic Address (from localStorage)</label>
            </div>
          )}

          <div className="pt-4 flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleBack}
              className="w-1/3 bg-gray-200 text-gray-700 cursor-pointer py-3 rounded-full font-medium hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-2/3 bg-[#00665B] cursor-pointer text-white py-3 rounded-full font-medium hover:bg-[#005249] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00665B] disabled:opacity-70"
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
      </motion.div>
    </OnboardingLayout>
  );
};

export default ProfessionalDetailsPage;
