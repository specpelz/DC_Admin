export interface LoginData {
  email: string;
  pass: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNum: string | null;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  status: string;
  statusCode: number;
  message: string;
  data: {
    token: string;
    user: User;
  };
}
