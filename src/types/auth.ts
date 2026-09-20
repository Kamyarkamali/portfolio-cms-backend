export interface SafeAdmin {
  id: string;
  email: string;
  role: string;
}

export interface AuthTokenPayload {
  sub: string;
  role: string;
}
