import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define interface for file metadata
export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string;
}

export interface AdminState {
  managementType: 'admin' | 'doctor' | null;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    designation: string;
    dateOfBirth: string;
    gender:   string;
    profilePhoto: FileMetadata | null;
  };
  clinicInfo: {
    clinicName: string;
    clinicType: string;
    registrationNumber: string;
    establishmentYear: string;
    
  };
  documents: {
    governmentId: FileMetadata | null;
    registrationCertificate: FileMetadata | null;
    accreditation: FileMetadata | null;
    departments: string;
    doctorsCount: string;
    communicationMode: string;
  };
  createdAt?: string;
  updatedAt?: string;
  currentStep: number;
  loading: boolean;
  error: string | null;
  success: boolean;

}

const initialState: AdminState = {
  managementType: null,
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    designation: '',
    dateOfBirth: '',
    gender :'Male',
    profilePhoto: null,
  },
  clinicInfo: {
    clinicName: '',
    clinicType: '',
    registrationNumber: '',
    establishmentYear: '',
  
  },
  documents: {
    governmentId: null,
    registrationCertificate: null,
    accreditation: null,
    departments: '',
    doctorsCount: '',
    communicationMode: '',
  },
  currentStep: 0,
  loading: false,
  error: null,
  success: false,
};

// Thunk for submitting data
export const submitAdminData = createAsyncThunk(
  'admin/submitData',
  async (
    files: {
      governmentId?: File;
      registrationCertificate?: File;
      accreditation?: File;
      profilePhoto?: File;
    } = {},
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { admin: AdminState };

      const formData = new FormData();

      // Add management type
      formData.append('managementType', state.admin.managementType || '');

      // Add personal info
      Object.entries(state.admin.personalInfo).forEach(([key, value]) => {
        if (value !== null && typeof value !== 'object') {
          formData.append(`personalInfo.${key}`, value as string);
        }
      });

      // Add profile photo if available
      if (files.profilePhoto) {
        formData.append('personalInfo.profilePhoto', files.profilePhoto);
      }

      // Add clinic info
      Object.entries(state.admin.clinicInfo).forEach(([key, value]) => {
        formData.append(`clinicInfo.${key}`, value);
      });

      // Add document files
      if (files.governmentId) {
        formData.append('documents.governmentId', files.governmentId);
      }

      if (files.registrationCertificate) {
        formData.append('documents.registrationCertificate', files.registrationCertificate);
      }

      if (files.accreditation) {
        formData.append('documents.accreditation', files.accreditation);
      }

      // Add other document fields
      formData.append('documents.departments', state.admin.documents.departments);
      formData.append('documents.doctorsCount', state.admin.documents.doctorsCount);
      formData.append('documents.communicationMode', state.admin.documents.communicationMode);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/Onboarding`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setManagementType: (state, action: PayloadAction<'admin' | 'doctor'>) => {
      state.managementType = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<AdminState['personalInfo']>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateClinicInfo: (state, action: PayloadAction<Partial<AdminState['clinicInfo']>>) => {
      state.clinicInfo = { ...state.clinicInfo, ...action.payload };
    },
    updateDocuments: (state, action: PayloadAction<Partial<AdminState['documents']>>) => {
      state.documents = { ...state.documents, ...action.payload };
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
     nextStep: (state) => {
    if (state.currentStep < 4) {
      state.currentStep += 1;
    }
  },
  previousStep: (state) => {
    if (state.currentStep > 0) {
      state.currentStep -= 1;
    }
  },
    resetForm: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitAdminData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAdminData.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitAdminData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});



export const {
  setManagementType,
  updatePersonalInfo,
  updateClinicInfo,
  updateDocuments,
  nextStep,
  previousStep,
  setCurrentStep,
  resetForm,
} = adminSlice.actions;

export default adminSlice.reducer;
