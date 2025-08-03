export interface User {
  userID?: number;
  id?: string | number;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  avatar?: string | null;
  phone?: string | null;
  password?: string | null;
  resetToken?: string | null;
}