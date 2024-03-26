import { Role } from '@/types/entities/role';

export type User = {
  role: Role;
  token: string;
  user_data: {
    email: string;
    id: number;
    name: string;
    password: string;
    phone_number: number;
    token_created: string;
    token_expiry: string;
  };
};

export type MeResponse = Omit<User, 'token'> & { message: string };
