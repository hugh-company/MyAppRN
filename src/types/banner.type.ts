export interface BannerInterface {
  _id: string;
  title: string;
  userId: any;
  thumbnail: {
    url: string;
    alt: string;
    _id: string;
  };
  link: {
    url: string;
    target: string;
    _id: string;
  };
  order: number;
  placement:
    | 'top-center'
    | 'top-left'
    | 'top-right'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right';
  page: string;
  type: 'banner' | 'promotion' | 'advertisement';
  status: 'visible';
  createdAt: string;
  updatedAt: string;
}
