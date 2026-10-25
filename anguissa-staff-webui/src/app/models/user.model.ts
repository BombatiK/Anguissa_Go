export type UserRole = 'ADMIN' | 'EMPLOYEE';

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  token: string;
}