// Store actual File object (not base64) to be used in FormData uploads
export type FileData = File | null;

// Personal Info
export interface PersonalInfo {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  profilePhoto?: FileData; // File instead of base64
}

// Professional Details
export interface ProfessionalDetails {
  medicalLicenseNumber: string;
  specialization: string;
  yearsOfExperience: string;
  associatedClinicHospitalName: string;
  consultationType: string;
}

// Verification Documents (all optional FileData)
export interface VerificationDocument {
  governmentIssuedId?: FileData;
  medicalDegreeCertificate?: FileData;
  medicalCouncilRegistrationCertificate?: FileData;
  experienceCertificate?: FileData;
}

// Work Schedule Preferences
export interface WorkSchedulePreferences {
  availableConsultationHours: string;
  preferredModeOfConsultation: string;
  languageSpoken: string;
  additionalInformation: string;
  emergencyContactDetails: string;
  personalBio: string;
}

// Type for formatted Doctor data (with Cloudinary URLs)
export interface Doctor {
  id?: string;
  personalInfo: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    profilePhoto?: string | null; // Cloudinary URL after upload
  };
  professionalDetails: {
    medicalLicenseNumber: string;
    specialization: string;
    yearsOfExperience: string;
    associatedClinicHospitalName: string;
    consultationType: string;
  };
  educationDetails: {
    medicalSchoolName?: string | null;
    medicalSchoolGraduationYear?: string | null;
    medicalSchoolDegree?: string | null;
  };
  verificationDocument: {
    governmentIssuedId?: string | null;
    medicalDegreeCertificate?: string | null;
    medicalCouncilRegistrationCertificate?: string | null;
    experienceCertificate?: string | null;
  };
  workSchedulePreferences: {
    availableConsultationHours: string;
    preferredModeOfConsultation: string;
    languageSpoken: string;
    additionalInformation?: string | null;
    emergencyContactDetails: string;
    personalBio?: string | null;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// This is the raw DB response type (used in GET API and formatters)
export interface DoctorDB {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  profilePhoto?: string | null;

  medicalLicenseNumber: string;
  specialization: string;
  yearsOfExperience: string;
  associatedClinicHospitalName: string;
  consultationType: string;

  medicalSchoolName?: string | null;
  medicalSchoolGraduationYear?: string | null;
  medicalSchoolDegree?: string | null;

  governmentIssuedId?: string | null;
  medicalDegreeCertificate?: string | null;
  medicalCouncilRegistrationCertificate?: string | null;
  experienceCertificate?: string | null;

  availableConsultationHours: string;
  preferredModeOfConsultation: string;
  languageSpoken: string;
  additionalInformation?: string | null;
  emergencyContactDetails: string;
  personalBio?: string | null;
}

// Redux Slice State
export interface DoctorOnboardingState {
  currentStep: number;
  personalInfo: PersonalInfo;
  professionalDetails: ProfessionalDetails;
  verificationDocument: VerificationDocument;
  workSchedulePreferences: WorkSchedulePreferences;
  isLoading: boolean;
  error: string | null;
  isSubmitted: boolean;
  doctors: Doctor[];
  isLoadingDoctors: boolean;
}

// Initial state for Redux
export const initialState: DoctorOnboardingState = {
  currentStep: 1,
  personalInfo: {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    profilePhoto: null,
  },
  professionalDetails: {
    medicalLicenseNumber: "",
    specialization: "",
    yearsOfExperience: "",
    associatedClinicHospitalName: "",
    consultationType: "In-Person",
  },
  verificationDocument: {
    governmentIssuedId: null,
    medicalDegreeCertificate: null,
    medicalCouncilRegistrationCertificate: null,
    experienceCertificate: null,
  },
  workSchedulePreferences: {
    availableConsultationHours: "",
    preferredModeOfConsultation: "",
    languageSpoken: "",
    additionalInformation: "",
    emergencyContactDetails: "",
    personalBio: "",
  },
  isLoading: false,
  error: null,
  isSubmitted: false,
  doctors: [],
  isLoadingDoctors: false,
};
