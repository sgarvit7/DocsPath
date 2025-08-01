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

export interface clinicInfo{
    clinicName: string;
  clinicType: string;
  registrationNumber: string;
  establishmentYear: string;
  address: string;
}

// Professional Details
export interface ProfessionalDetails {
  medicalLicenseNumber: string;
  specialization: string;
  yearsOfExperience: string;
  associatedClinicHospitalName: string;
  consultationType: string;
}

export interface Documents{
     governmentIdPath?: string | null;
  governmentIdOriginalName?: string | null;
  registrationCertificatePath?: string | null;
  registrationCertificateOriginalName?: string | null;
  accreditationPath?: string | null;
  accreditationOriginalName?: string | null;

}

// Verification Documents (all optional FileData)
export interface VerificationDocument {

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
export interface Self {
  id?: string;
  personalInfo: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    profilePhoto?: string | null; // Cloudinary URL after upload
  };
  clinicInfo:{
     clinicName: string;
  clinicType: string;
  registrationNumber: string;
  establishmentYear: string;
  address: string;
  }
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
Documents : {
     governmentIdPath?: string | null;
  governmentIdOriginalName?: string | null;
  registrationCertificatePath?: string | null;
  registrationCertificateOriginalName?: string | null;
  accreditationPath?: string | null;
  accreditationOriginalName?: string | null;

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
export interface SelfDB {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  profilePhoto?: string | null;

  clinicName: string;
  clinicType: string;
  registrationNumber: string;
  establishmentYear: string;
  address: string;

  medicalLicenseNumber: string;
  specialization: string;
  yearsOfExperience: string;
  associatedClinicHospitalName: string;
  consultationType: string;

  medicalSchoolName?: string | null;
  medicalSchoolGraduationYear?: string | null;
  medicalSchoolDegree?: string | null;

   governmentIdPath?: string | null;
  governmentIdOriginalName?: string | null;
  registrationCertificatePath?: string | null;
  registrationCertificateOriginalName?: string | null;
  accreditationPath?: string | null;
  accreditationOriginalName?: string | null;

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
export interface SelfOnboardingState {
  currentStep: number;
  personalInfo: PersonalInfo;
  clinicInfo : clinicInfo;
  professionalDetails: ProfessionalDetails;
  documents : Documents;
  verificationDocument: VerificationDocument;
  workSchedulePreferences: WorkSchedulePreferences;
  isLoading: boolean;
  error: string | null;
  isSubmitted: boolean;
  doctors: Self[];
  isLoadingDoctors: boolean;
}

// Initial state for Redux
export const initialState: SelfOnboardingState = {
  currentStep: 1,
  personalInfo: {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    profilePhoto: null,
  },

   clinicInfo:{
     clinicName: "",
  clinicType: "",
  registrationNumber: "",
  establishmentYear: "",
  address: "",
  },
  professionalDetails: {
    medicalLicenseNumber: "",
    specialization: "",
    yearsOfExperience: "",
    associatedClinicHospitalName: "",
    consultationType: "In-Person",
  },
  documents : {
     governmentIdPath: "",
  governmentIdOriginalName: "",
  registrationCertificatePath: "",
  registrationCertificateOriginalName: "",
  accreditationPath: "",
  accreditationOriginalName: "",
  },
  verificationDocument: {
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
