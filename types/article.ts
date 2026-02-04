export interface Article {
  created_at: null | string;
  deadline: null | string;
  fio: null | string;
  id: null | number;
  source: null | string;
  status: ArticleStatus;
  title: null | string;
  type: null | string;
  updated_at: null | string;
}

export interface ArticleAssignment {
  article_id: number;
  assigned_at: string;
  completed_review: ArticleDetail;
  deadline: string;
  description: string;
  draft_files: { original_name: string; path: string }[];
  file_path: string;
  general_recommendation: string;
  id: number;
  review_comments: string;
  review_criteria: {
    id: number;
    max_score: number;
    name_en: string;
    name_ru: string;
    name_uz: string;
    score: number;
  }[];
  title: string;
}
export interface ArticleDetail {
  draft_files: { original_name: string; path: string }[];
  general_recommendation: string;
  review_comments: string;
  review_files: { original_name: string; path: string }[];
  scores: {
    id: number;
    max_score: number;
    name_en: string;
    name_ru: string;
    name_uz: string;
    score: number;
  }[];
  status_dates: {
    assigned_at: string;
    completed_at: string;
    deadline: string;
    extension_date: string;
    in_progress_at: string;
    refused_at: string;
    status_changed_at: string;
  };
}

export interface ArticleReview {
  article_title: string;
  assignments?: ArticleUser[];
  authors_name: string;
  deadline: string;
  edited_file_name: string;
  edited_file_path: string;
  file_name: string;
  file_path: string;
  id: number;
  status: ArticleStatus;
  type: "external" | "internal";
}

// article-review.interface.ts

export type ArticleStatus =
  | "assigned"
  | "completed"
  | "in_progress"
  | "not_assigned"
  | "overdue"
  | "refused"
  | "rejected"
  | null;

export interface ArticleUser {
  assigned_at: string;
  deadline: string;
  description?: string;
  general_recommendation: "accept" | "after_revision" | "reject" | null;
  id: number;
  name: string;
  reviewer_id: number;
  status: ArticleStatus;
}

export interface CreateArticleRuleForm {
  active: boolean;
  deadline: string;
  file: File | null;
  fio: string;
  title: string;
}

export interface Creator {
  active: number;
  created_at: string;
  deleted_at: null | string;
  education_sector: null | string;
  email: string;
  email_verification_code: null | string;
  email_verification_code_expires_at: null | string;
  email_verified_at: null | string;
  given_name: null | string;
  id: number;
  name: string;
  phone: null | string;
  surname: null | string;
  updated_at: string;
}

export interface SortingStateArticle {
  created_at: string;
  status: ArticleStatus;
}
