export enum genderInterface {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
export interface UserInterface {
  apiTokenTelegram: string;
  trialVPS: any[];
  companyTax: any;
  verified_code_zalo: any;
  phonenumber_zalo: any;
  accountType: string;
  personalId: string;
  user_id_zalo: any;
  email: string;
  codeId: string;
  password: string;
  status: string;
  firstname: string;
  lastname: string;
  companyName: string;
  address1: string;
  address2: string;
  datecreated: string;
  country: string;
  phonenumber: string;
  notes: string;
  company: number;
  credit: number;
  taxexempt: string;
  latefeeoveride: number;
  overideautosusp: string;
  taxrateoverride: string;
  taxrate: string;
  cardtype: string;
  cardnum: string;
  expdate: string;
  overideduenotices: boolean;
  disableemails: string;
  client_id: number;
  currency_id: number;
  affiliate_id: any;
  group_name: string;
  group_color: string;
  billing_contact_id: number;
  cardcreated: string;
  cardupdated: string;
  countryname: string;
  assigned_affiliate: boolean;
  achtype: string;
  achaccount: string;
  achrouting: string;
  access: any[];
  socketId: any[];
  verified: boolean;
  _2fa: boolean;
  secret: string;
  isHasSecret: boolean;
  pwd: string;
  national: string;
  city: string;
  district: string;
  postCode: string;
  currency: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  accesstoken: string;
  refreshtoken: string;
  avatar: any;
  role: Role;
  affiliateCode: string;
  myAffiliateCode: string;
  id: string;
}
export interface Role {
  permissionGofiber: any[];
  _id: string;
  roleName: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Permission {
  subject: string;
  actions: string[];
  _id: string;
}

export interface UserFindInterface {
  id: number;
  fullname: string;
  avatar: string;
  gender: genderInterface;
  birthday: string;
  galleries: string[];

  favorites: string[];

  job: string;
  distance_km: number;
  location: {
    latitude: number;
    longitude: number;
  };
}
