import {PostTypeKey, TypeKeyListApi} from './common.type';
export interface MediaFeature {
  id: number;
  path: string;
  square: string;
}
interface BannerImageInterface {
  id: number;
  path: string;
}
export interface SliderInterface {
  label: string;
  name: string;
  images: string;
}
export interface ItemListProduct {
  id: number;
  title: string;
  slug: string;
  status: string;
  rating_count: number;
  rating_total: number;
  views: number;
  feature: MediaFeature;
  banner: BannerImageInterface;
  cinema: string;
  movie_type: string;
  duration: number;
  trailer: string;
  episode_total: number;
  like_count: number;
  release_date: string;
  // game

  terms: {
    cgame?: CategoryItem[];
    tags?: CategoryItem[];
  };
}
// interface button
export interface ButtonInterface {
  label: string;
  desc: string;
  slug: string;
}
// interface slider
export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  posttype: string;
  lang: string;
  type: string;
  items: ItemListProduct[];
}

export interface TabsInterface {
  id: number;
  type?: string;
  label?: string;
  name: string;
  button?: ButtonInterface;
  posttype?: PostTypeKey;
  items?: CategoryItem[];
}
//

// interface module item home

export interface ModuleItemInterface {
  id: number;
  type: TypeKeyListApi;
  posttype: PostTypeKey;
  label?: string;
  name?: string;
  labels?: string;
  items?: ItemListProduct[] | TabsInterface[];
  button?: ButtonInterface;
  images?: string;
  height?: number;
}

// interface nav
export interface Nav {
  label: string;
  icon: string;
}
interface Menu {
  languages: {
    label: string;
    name: string;
    icon: string;
  };
  login: {
    name: string;
    type: string;
    label: string;
    items: {
      login: string;
      register: string;
    };
  };
  nav: {
    search: Nav;
    home: Nav;
    game: Nav;
    comic: Nav;
    novel: Nav;
    movie: Nav;
    chat: Nav;
  };
}
export interface responseHomeInterface {
  menu: Menu;
  modules: ModuleItemInterface[];
}
