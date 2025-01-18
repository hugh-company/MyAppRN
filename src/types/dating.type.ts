export interface responseDatingNearYou {
  status: string;
  message: string;
  data: {
    modules: ModuleDating[];
  };
}
export enum TypeDatingInterface {
  TOP_NAV = 'topNav',
  MY_PROFILE = 'myProfile',
  BUTTON = 'button',
  USERS_LIST = 'usersList',
}
export enum StatusAccount {
  ONLINE = 1,
  OFFLINE = 0,
}
export interface UserItemInterface {
  id: number;
  frameColor: string;
  frameLabel: string;
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  phone: string;
  telegram: string;
  whatsapp: string;
  skype: string;
  birthday: string;
  about_me: string;
  online: StatusAccount; // 0 for offline, 1 for online
  place: string;
  age: number;
  galleries: string[]; // Array of gallery image URLs
  favorites: string[]; // Array of favorite activities
  job: string | null; // Nullable
  distance: string;
}
export enum TypeOptionsDating {
  NEAR_YOU = 'Nearyou',
  LIKE = 'Likeyou',
  MATCHED = 'Matched',
}
export enum TypeTabDatingApi {
  NEAR_YOU = 'nearyou',
  LIKE = 'likeyou',
  MATCHED = 'matched',
}
export interface navHorizontalInterface {
  data: {title: string; type: string; api: string};
  heading: TypeOptionsDating;
  icon: string;
  items: string[];
  item: string;
  label: string;
  paged: number;
  type: string | 'linkpage';
}
export interface ModuleDating {
  type: TypeDatingInterface;
  label: string;
  icon: string;
  heading?: string;
  data?: {
    api: string;
    title: string;
    type: string;
  };
  paged: number;
  items:
    | {
        data: UserItemInterface[];
      }
    | navHorizontalInterface[];
  total: number;
}
