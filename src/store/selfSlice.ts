import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Self,
  SelfOnboardingState,
  PersonalInfo,
  ProfessionalDetails,
  VerificationDocument,
  WorkSchedulePreferences,
} from "@/types/slice";

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string;
}
// Initial state
const initialState: SelfOnboardingState = {
  currentStep: 1,
  personalInfo: {
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    profilePhoto: null,
  },
  clinicInfo: {
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
  documents: {
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

export const submitselfOnboarding = createAsyncThunk(
  "selfOnboarding/submit",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { selfOnboarding: SelfOnboardingState };
      const {
        personalInfo,
        clinicInfo,
        professionalDetails,
        documents,
        verificationDocument,
        workSchedulePreferences,
      } = state.selfOnboarding;

      const formData = new FormData();

      Object.entries(personalInfo).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });

      Object.entries(professionalDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });
       
      Object.entries(clinicInfo).forEach(([key, value]) => {
        formData.append(key, value);
      });

      Object.entries(verificationDocument).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        }
      });
       Object.entries(documents).forEach(([key, value]) => {
        formData.append(key, value);
      });

      Object.entries(workSchedulePreferences).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch("http://localhost:3000/api/self/Onboarding", { 
        method: "POST",
        body: formData,
      });
      console.log("sending data")
      console.log(formData);

      if (!response.ok) {
        throw new Error("Failed to submit onboarding data");
      }

      const result = await response.json();

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("doctorOnboardingData");
      }

      return result;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);



export const getDoctors = createAsyncThunk(
  "doctorOnboarding/getDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/doctor`
      );
      console.log(data);
      return data as Self[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

const loadFromSessionStorage = (): Partial<SelfOnboardingState> => {
  if (typeof window === "undefined") return {};

  try {
    const saved = sessionStorage.getItem("doctorOnboardingData");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveToSessionStorage = (state: SelfOnboardingState) => {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem("doctorOnboardingData", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save to session storage:", error);
  }
};

const selfOnboardingSlice = createSlice({
  name: "selfOnboarding",
  initialState: {
    ...initialState,
    ...loadFromSessionStorage(),
  },
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateProfessionalDetails: (
      state,
      action: PayloadAction<Partial<ProfessionalDetails>>
    ) => {
      state.professionalDetails = {
        ...state.professionalDetails,
        ...action.payload,
      };
      saveToSessionStorage(state);
    },
    updateClinicInfo: (
      state,
      action: PayloadAction<Partial<SelfOnboardingState["clinicInfo"]>>
    ) => {
      state.clinicInfo = {
        ...state.clinicInfo,
        ...action.payload,
      };
      saveToSessionStorage(state); // ✅ Save change
    },
    updateDocuments: (
      state,
      action: PayloadAction<Partial<SelfOnboardingState["documents"]>>
    ) => {
      state.documents = {
        ...state.documents,
        ...action.payload,
      };
      saveToSessionStorage(state); // ✅ Save change
    },
    updateVerificationDocument: (
      state,
      action: PayloadAction<Partial<VerificationDocument>>
    ) => {
      state.verificationDocument = {
        ...state.verificationDocument,
        ...action.payload,
      };
    },
    updateWorkSchedulePreferences: (
      state,
      action: PayloadAction<Partial<WorkSchedulePreferences>>
    ) => {
      state.workSchedulePreferences = {
        ...state.workSchedulePreferences,
        ...action.payload,
      };
    },
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep += 1;
      }
      saveToSessionStorage(state);
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("doctorOnboardingData");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitselfOnboarding.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitselfOnboarding.fulfilled, (state) => {
        state.isLoading = false;
        state.isSubmitted = true;
        state.error = null;
      })
      .addCase(submitselfOnboarding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getDoctors.pending, (state) => {
        state.isLoadingDoctors = true;
        state.error = null;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.isLoadingDoctors = false;
        state.doctors = action.payload;
        state.error = null;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.isLoadingDoctors = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentStep,
  updatePersonalInfo,
  updateProfessionalDetails,
  updateClinicInfo,
  updateDocuments,
  updateVerificationDocument,
  updateWorkSchedulePreferences,
  nextStep,
  previousStep,
  resetForm,
  clearError,
} = selfOnboardingSlice.actions;

export default selfOnboardingSlice.reducer;
