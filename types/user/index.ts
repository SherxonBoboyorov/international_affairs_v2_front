export interface Reviewer {
  academic_degree: string;
  created_at: string; // ISO datetime string
  diploma_issued_by: string;
  email: string;
  id: number;
  institutional_phone: string;
  name: string;
  orcid: string;
  position: string;
  science_field_id: number;
  scientific_activity: ScientificActivity;
  updated_at: string; // ISO datetime string
  user_document_id: number;
  work_place: string;
}

// /types/reviewer.ts
export interface ScientificActivity {
  created_at: string; // ISO datetime string
  id: number;
  title_en: string;
  title_ru: string;
  title_uz: string;
  updated_at: string; // ISO datetime string
}

export interface SortingState {
  created_at: string;
  science_field_id: string;
}
