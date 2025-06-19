"use client";

import React, { useState } from 'react';
import { Upload, Users } from 'lucide-react';
import DoctorImportModal from './DoctorImportModal';

// Types (same as in the modal component)
interface DoctorOnboardingState {
  currentStep: number;
  personalInfo: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: "Male" | "Female" | "Other";
    profilePhoto: File | null;
  };
  professionalDetails: {
    medicalLicenseNumber: string;
    specialization: string;
    yearsOfExperience: string;
    associatedClinicHospitalName: string;
    consultationType: "In-Person" | "Online" | "Both";
  };
  verificationDocument: {
    governmentIssuedId: File | null;
    medicalDegreeCertificate: File | null;
    medicalCouncilRegistrationCertificate: File | null;
    experienceCertificate: File | null;
  };
  workSchedulePreferences: {
    availableConsultationHours: string;
    preferredModeOfConsultation: string;
    languageSpoken: string;
    additionalInformation: string;
    emergencyContactDetails: string;
    personalBio: string;
  };
  isLoading: boolean;
  error: string | null;
  isSubmitted: boolean;
  doctors: any[];
  isLoadingDoctors: boolean;
}

const DoctorImportExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importedDoctors, setImportedDoctors] = useState<DoctorOnboardingState[]>([]);

  const handleImport = (doctors: DoctorOnboardingState[]) => {
    setImportedDoctors(doctors);
    console.log('Imported doctors:', doctors);
    // Here you would typically send the data to your backend API
    // Example: await submitDoctorsToAPI(doctors);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Doctor Management
        </h1>
        <p className="text-gray-600">
          Import multiple doctor records from CSV or Excel files
        </p>
      </div>

      {/* Import Button */}
      <div className="mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-5 h-5 mr-2" />
          Import Doctors
        </button>
      </div>

      {/* Imported Doctors Display */}
      {importedDoctors.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                Imported Doctors ({importedDoctors.length})
              </h2>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consultation Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {importedDoctors.map((doctor, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {doctor.personalInfo.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {doctor.personalInfo.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.personalInfo.emailAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.professionalDetails.specialization}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.professionalDetails.medicalLicenseNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doctor.professionalDetails.yearsOfExperience} years
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        doctor.professionalDetails.consultationType === 'Both'
                          ? 'bg-green-100 text-green-800'
                          : doctor.professionalDetails.consultationType === 'Online'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {doctor.professionalDetails.consultationType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Import Modal */}
      <DoctorImportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
};

export default DoctorImportExample;