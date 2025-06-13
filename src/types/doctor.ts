// Types
export interface PersonalInfo {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  profilePhoto?: FileData | null;
}

export interface ProfessionalDetails {
  medicalLicenseNumber: string;
  specialization: string;
  yearsOfExperience: string;
  associatedClinicHospitalName: string;
  consultationType: string;
}

// New type to store file data in a serializable format
export interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  base64: string; // Base64 encoded file content
}
export interface VerificationDocument {
  governmentIssuedId?: FileData | null;
  medicalDegreeCertificate?: FileData | null;
  medicalCouncilRegistrationCertificate?: FileData | null;
  experienceCertificate?: FileData | null;
}

export interface WorkSchedulePreferences {
  availableConsultationHours: string;
  preferredModeOfConsultation: string;
  languageSpoken: string;
  additionalInformation: string;
  emergencyContactDetails: string;
  personalBio: string;
}

// Type for a complete doctor record
export interface Doctor {
  id?: string;
  personalInfo: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    profilePhoto?: string;
  };
  professionalDetails: {
    medicalLicenseNumber: string;
    specialization: string;
    yearsOfExperience: string;
    associatedClinicHospitalName: string;
    consultationType: string;
  };
  verificationDocument: {
    governmentIssuedId?: string;
    medicalDegreeCertificate?: string;
    medicalCouncilRegistrationCertificate?: string;
    experienceCertificate?: string;
  };
  workSchedulePreferences: {
    availableConsultationHours: string;
    preferredModeOfConsultation: string;
    languageSpoken: string;
    additionalInformation?: string;
    emergencyContactDetails: string;
    personalBio?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

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

// Initial state
const initialState: DoctorOnboardingState = {
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
