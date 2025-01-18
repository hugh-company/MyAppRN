export enum genderInterface {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
export interface UserInterface {
  id: number;
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  role: string;
  status: string;
  created_at: string; // ISO 8601 or date-time string
  updated_at: string; // ISO 8601 or date-time string
  phone: string;
  telegram: string | null;
  whatsapp: string | null;
  skype: string | null;
  birthday: string; // ISO 8601 or date string

  gender: genderInterface; // Enum-like string
  location: string;
  about_me: string;
  display: number; // Considered as a flag or visibility indicator
  coin: number | null;
  package_name: string;
  package_exp: string | null; // ISO 8601 or date-time string if used
  personal: {
    job: string;
    favorites: string[];
    galleries: string[];
  };
}
export interface UserFindInterface {
  id: number;
  fullname: string;
  avatar: string;
  gender: genderInterface;
  birthday: string;
  personal: {
    favorites: string[];
    galleries: string[];
    job: string;
  };
  distance_km: number;
}
