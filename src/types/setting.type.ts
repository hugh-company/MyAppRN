import {ItemListDashboard} from './common.type';

export interface noticeInterface {
  images: string;
  label: string;
  name: string;
  slug: string;
}
type SubMenuItem = {
  type: string;
  name: string;
  label: string;
  active?: boolean;
  icon?: string;
  color?: string; // Nếu là button
};

export interface menuNavigationInterface {
  type: 'block' | 'space' | 'menu' | 'line';
  name: ItemListDashboard | 'logo' | 'user';
  label: string;
  active: boolean;
  icon: string;
  color: string;
  height?: number;
  isLogin?: boolean;
  items?: SubMenuItem[];
}
export interface NotificationInterface {
  images: string;
  label: string;
  name: string;
  slug: string;
}
//
export interface StickerInterface {
  id: number;
  title: string;
  slug: string;
  lang_slug: string;
  status: string;
  create_at: string;
  update_at: string;
  items: string[];
}
