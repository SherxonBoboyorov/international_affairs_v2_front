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
  deadline: string;
  description: string;
  file_path: string;
  id: number;
  title: string;
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

export type ArticleStatus =
  | "assigned"
  | "completed"
  | "in_progress"
  | "not_assigned"
  | "overdue"
  | "rejected"
  | null;

// article-review.interface.ts

export interface ArticleUser {
  assigned_at: string;
  deadline: string;
  description?: string;
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
