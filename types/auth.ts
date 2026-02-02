export interface AuthUser {
  email: string;
  name: string;
  phone: string;
  role: string;
}

export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  status: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export interface LoginResponse {
  roles: string[];
  token: string;
  user: {
    email: string;
    given_name?: string;
    name?: string;
    patronymic?: string;
    phone: string;
    surname?: string;
  };
}

export type RegisterPayload = {
  academic_degree: string;
  diploma_issued_by: string;
  email: string;
  institutional_phone: string;
  name: string;
  orcid: string;
  password: string;
  position: string;
  science_field: File;
  science_field_id?: string;
  work_place: string;
};

export type RegisterResponse = {
  status: boolean;
};

export type ResetPasswordPayload = {
  email: string;
  password: string;
  reset_token: string;
};

export type ResetPasswordResponse = {
  token: string;
};

export type VerifyResetCodePayload = {
  code: string;
  email: string;
};

export type VerifyResetCodeResponse = {
  reset_token: string;
  status: boolean;
};
