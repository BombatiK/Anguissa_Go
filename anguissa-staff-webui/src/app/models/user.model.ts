export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  token: string;
}