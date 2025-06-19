"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Download, AlertCircle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa, { ParseResult } from 'papaparse';

// Types
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

interface DoctorImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (doctors: DoctorOnboardingState[]) => void;
}

interface ImportResult {
  success: boolean;
  data?: DoctorOnboardingState[];
  error?: string;
  totalRecords?: number;
  validRecords?: number;
}

const DoctorImportModal: React.FC<DoctorImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample CSV structure for reference
  const sampleHeaders = [
    'fullName', 'emailAddress', 'phoneNumber', 'dateOfBirth', 'gender',
    'medicalLicenseNumber', 'specialization', 'yearsOfExperience', 
    'associatedClinicHospitalName', 'consultationType',
    'availableConsultationHours', 'preferredModeOfConsultation', 
    'languageSpoken', 'additionalInformation', 'emergencyContactDetails', 'personalBio'
  ];

  const downloadSampleCSV = () => {
    const sampleData = [
      sampleHeaders,
      [
        'Dr. John Smith', 'john.smith@email.com', '+1234567890', '1980-05-15', 'Male',
        'MD123456', 'Cardiology', '10', 'City General Hospital', 'Both',
        '9:00 AM - 5:00 PM', 'Both', 'English, Spanish', 'Available for emergency consultations',
        '+1234567891', 'Experienced cardiologist with focus on preventive care'
      ],
      [
        'Dr. Sarah Johnson', 'sarah.johnson@email.com', '+1234567892', '1975-08-22', 'Female',
        'MD789012', 'Pediatrics', '15', 'Children\'s Medical Center', 'In-Person',
        '8:00 AM - 4:00 PM', 'In-Person', 'English, French', 'Specializes in infant care',
        '+1234567893', 'Pediatrician with expertise in child development'
      ]
    ];

    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'doctor_import_sample.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const mapRowToDoctor = (row: any): DoctorOnboardingState => {
    return {
      currentStep: 1,
      personalInfo: {
        fullName: row.fullName || row['Full Name'] || '',
        emailAddress: row.emailAddress || row['Email Address'] || '',
        phoneNumber: row.phoneNumber || row['Phone Number'] || '',
        dateOfBirth: row.dateOfBirth || row['Date of Birth'] || '',
        gender: (row.gender || row['Gender'] || 'Male') as "Male" | "Female" | "Other",
        profilePhoto: null,
      },
      professionalDetails: {
        medicalLicenseNumber: row.medicalLicenseNumber || row['Medical License Number'] || '',
        specialization: row.specialization || row['Specialization'] || '',
        yearsOfExperience: row.yearsOfExperience || row['Years of Experience'] || '',
        associatedClinicHospitalName: row.associatedClinicHospitalName || row['Associated Clinic/Hospital Name'] || '',
        consultationType: (row.consultationType || row['Consultation Type'] || 'In-Person') as "In-Person" | "Online" | "Both",
      },
      verificationDocument: {
        governmentIssuedId: null,
        medicalDegreeCertificate: null,
        medicalCouncilRegistrationCertificate: null,
        experienceCertificate: null,
      },
      workSchedulePreferences: {
        availableConsultationHours: row.availableConsultationHours || row['Available Consultation Hours'] || '',
        preferredModeOfConsultation: row.preferredModeOfConsultation || row['Preferred Mode of Consultation'] || '',
        languageSpoken: row.languageSpoken || row['Language Spoken'] || '',
        additionalInformation: row.additionalInformation || row['Additional Information'] || '',
        emergencyContactDetails: row.emergencyContactDetails || row['Emergency Contact Details'] || '',
        personalBio: row.personalBio || row['Personal Bio'] || '',
      },
      isLoading: false,
      error: null,
      isSubmitted: false,
      doctors: [],
      isLoadingDoctors: false,
    };
  };

  const validateDoctor = (doctor: DoctorOnboardingState): boolean => {
    const requiredFields = [
      doctor.personalInfo.fullName,
      doctor.personalInfo.emailAddress,
      doctor.professionalDetails.medicalLicenseNumber,
      doctor.professionalDetails.specialization,
    ];
    
    return requiredFields.every(field => field && field.trim() !== '');
  };

  const processFile = async (file: File): Promise<ImportResult> => {
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let parsedData: any[] = [];

      if (fileExtension === 'csv') {
        // Process CSV file
        const text = await file.text();
        const result: ParseResult<any> = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header: string) => header.trim(),
        });

        if (result.errors && result.errors.length > 0) {
          throw new Error(`CSV parsing error: ${result.errors[0].message}`);
        }

        parsedData = result.data as any[];
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        // Process Excel file
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        parsedData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
      } else {
        throw new Error('Unsupported file format. Please use CSV or XLSX files.');
      }

      if (parsedData.length === 0) {
        throw new Error('No data found in the file.');
      }

      // Map and validate data
      const doctors: DoctorOnboardingState[] = [];
      const validDoctors: DoctorOnboardingState[] = [];

      parsedData.forEach((row, index) => {
        try {
          const doctor = mapRowToDoctor(row);
          doctors.push(doctor);
          
          if (validateDoctor(doctor)) {
            validDoctors.push(doctor);
          }
        } catch (error) {
          console.warn(`Error processing row ${index + 1}:`, error);
        }
      });

      return {
        success: true,
        data: validDoctors,
        totalRecords: doctors.length,
        validRecords: validDoctors.length,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setImportResult(null);

    const result = await processFile(file);
    setImportResult(result);
    setIsProcessing(false);
  };

  const handleImport = () => {
    if (importResult?.success && importResult.data) {
      onImport(importResult.data);
      onClose();
      setImportResult(null);
    }
  };

  const handleClose = () => {
    onClose();
    setImportResult(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Import Doctor Records
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Sample File Download */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">
                  Need a template?
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  Download our sample CSV file to see the expected format and required fields.
                </p>
                <button
                  onClick={downloadSampleCSV}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Sample CSV
                </button>
              </div>

              {/* File Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isProcessing}
                />
                
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 text-gray-400">
                    <Upload className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {isProcessing ? 'Processing file...' : 'Upload your file'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Drag and drop or click to select CSV or Excel files
                    </p>
                  </div>
                  {!isProcessing && (
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Choose File
                    </button>
                  )}
                </div>

                {isProcessing && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>

              {/* Import Results */}
              {importResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {importResult.success ? (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        <h3 className="text-sm font-medium text-green-800">
                          Import Successful
                        </h3>
                      </div>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          Found {importResult.totalRecords} total records, {importResult.validRecords} valid records ready to import.
                        </p>
                        {importResult.totalRecords! > importResult.validRecords! && (
                          <p className="mt-1 text-orange-700">
                            {importResult.totalRecords! - importResult.validRecords!} records were skipped due to missing required fields.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                        <h3 className="text-sm font-medium text-red-800">
                          Import Failed
                        </h3>
                      </div>
                      <p className="mt-2 text-sm text-red-700">
                        {importResult.error}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Required Fields Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Required Fields
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>• Full Name</div>
                  <div>• Email Address</div>
                  <div>• Medical License Number</div>
                  <div>• Specialization</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Records missing these required fields will be skipped during import.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={!importResult?.success || !importResult.data?.length}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Import {importResult?.validRecords || 0} Records
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DoctorImportModal;