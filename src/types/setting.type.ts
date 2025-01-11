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
  type: 'navbar' | 'button' | 'block' | 'menu' | 'login';
  name: ItemListDashboard;
  label: string;
  active: boolean;
  icon: string;
  items?: SubMenuItem[];
}
export interface NotificationInterface {
  images: string;
  label: string;
  name: string;
  slug: string;
}
