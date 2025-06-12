export interface patient {
  id: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  supabaseUid: string;

  // Demographic Data
  title?: string;
  name?: string;
  birthDate?: Date;
  gender?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  maritalStatus?: string;
  contactNumber?: string;
  alternateNumber?: string;

  // Lifestyle Data
  smokingHabit?: string;
  alcoholConsumption?: string;
  activityLevel?: string;
  dietHabit?: string;
  occupation?: string;

  // Medical Data
  allergies: string[];
  medications: string[];
  chronicDiseases: string[];
  injuries: string[];
  surgeries: string[];
}