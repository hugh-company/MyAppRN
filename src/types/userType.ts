export interface UserInterface {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  username: string;

  fullname: string;
  // admin |moderator|author|member
  role: string;
  status: string;
}
