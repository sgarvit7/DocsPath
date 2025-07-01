export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
}

export interface JobDescription {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;

  salary?: string | null;
  responsibilities?: string[];        // keep as array (can default to [])
  requirements?: string[];
  benefits?: string[];
  howToApply?: string[];
  emoluments?: string[];
  whyJoin?: string[];

  applicationDeadline?: string | null; // accepts null
  postedDate?: string | null;          // accepts null or default (ISO)
  category?: string | null;
  jobType?: string | null;
}
