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
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  phone: string;
  birthday: string;
  gender: string;
  about_me_label: string;
  about_me: string;
  online: number;
  place: string;
  age: number;
  location: {
    latitude: number;
    longitude: number;
  };
  galleries: string[];
  favorites: string[];
  relationship_status: {
    id: number;
    name: string;
    icon: string;
  }[];
  socials: {
    facebook?: string;
    zalo?: string;
    instagram?: string;
  };
  job: string | null;
}
export interface ItemDatingUserInterface {
  id: number;
  frameColor: string;
  frameLabel: string;
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  phone: string;
  birthday: string;
  about_me: string;
  online: number;
  place: string;
  age: number;
  location: {latitude: number; longitude: number};
  galleries: string[];
  favorites: string[];
  job: string;
}
export enum TypeTabDatingApi {
  NEAR_YOU = 'nearyou',
  LIKE = 'likeyou',
  MATCHED = 'matched',
}

export interface dataHeaderDatingInterface {
  tabs: navHorizontalInterface[];
  button: ModuleDating;
  infoDating: ModuleDating;
}
export interface navHorizontalInterface {
  data: {title: string; type: string; api: string};
  heading: string;
  icon: string;
  items: string[];
  item: string;
  label: string;
  paged: number;
  type: TypeTabDatingApi;
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
        is_next: boolean;
        page: number;
      }
    | navHorizontalInterface[];
  total: number;
}
