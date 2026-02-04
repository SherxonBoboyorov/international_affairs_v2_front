// assigned (senga kelgan yangi response uchun)
export interface AssignedReviewData extends BaseReviewData {
  assigned_at: string;
  comment: string;
  type: "assigned_review"; // backend shunaqa yozayotgan bo‘lsa
  // keyin yana fieldlar qo‘shilsa shu yerga qo‘shib borasan
}

// assigned response (yangi)
export interface AssignedReviewResponse extends ReviewResponseBase {
  current_status: "assigned";
  review_data: AssignedReviewData;
}

// completed
export interface CompletedReviewData extends BaseReviewData {
  completed_at: string;
  draft_files: ReviewFile[];
  general_recommendation: string;
  review_comments: string;
  review_files: ReviewFile[];
  scores: ReviewScore[];
}

// completed response
export interface CompletedReviewResponse extends ReviewResponseBase {
  current_status: "completed";
  review_data: CompletedReviewData;
}

// refused
export interface RefusedReviewData extends BaseReviewData {
  comment: string;
}

// === Turli holatlar bo‘yicha review_data ===

// refused response
export interface RefusedReviewResponse extends ReviewResponseBase {
  current_status: "refused";
  review_data: RefusedReviewData;
}

export interface ReviewFile {
  name: null | string;
  path: string;
}

// umumiy type
export type ReviewResponse =
  | AssignedReviewResponse
  | CompletedReviewResponse
  | RefusedReviewResponse;

// === Umumiy response baza ===
export interface ReviewResponseBase {
  current_status: string;
  description: string;
  email: string;
  id: number;
  name: string;
  status_dates: StatusDates;
  status_name: string;
}

export interface ReviewScore {
  id: number;
  max_score: number;
  name_en: string;
  name_ru: string;
  name_uz: string;
  score: string;
}

export interface StatusDates {
  assigned_at: null | string;
  completed_at: null | string;
  deadline: null | string;
  extension_date: null | string;
  in_progress_at: null | string;
  refused_at: null | string;
  status_changed_at: null | string;
}

interface BaseReviewData {
  // umumiy bo‘lishi mumkin bo'lgan fieldlar bo'lsa keyin shu yerga qo‘shasan
  name: string;
}
