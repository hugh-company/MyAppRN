import {PostTypeKey, TypeKeyListApi} from './common.type';
import {ItemListProduct} from './post.type';
import {menuNavigationInterface, NotificationInterface} from './setting.type';

//
export interface ButtonNavigationInterface {
  label?: string | undefined;
  type?: 'linkpage';
  heading?: string | undefined;
  data?: {
    title: string | undefined;
    api: string | undefined;
    type: 'list' | 'category';
    posttype: PostTypeKey;
  };
  paged?: number | 1;
  sortby?: string | undefined;
}
export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  posttype: string;
  lang: string;
  type: string;
  items: ItemListProduct[];
}
export interface TabInterface {
  id?: number | string;
  type?: string;
  label?: string;
  name?: string;
  slug?: string;
  button?: ButtonNavigationInterface;
  posttype?: PostTypeKey;
  items?: ItemListProduct[];
}
//
export interface HistoryInterface extends ItemListProduct {
  timestamp: number;
}
//
export interface ModuleItemInterface {
  id: number;
  type: TypeKeyListApi;
  posttype: PostTypeKey;
  label?: string;
  name?: string;
  labels?: string;
  items?: ItemListProduct[] | TabInterface[];
  button?: ButtonNavigationInterface;
  images?: string;
  height?: number;
}
// response data dashboard
export interface ResponseDataDashboard {
  menus?: menuNavigationInterface[];
  navbar?: menuNavigationInterface[];
  modules: ModuleItemInterface[];
  notices?: NotificationInterface[];
}
