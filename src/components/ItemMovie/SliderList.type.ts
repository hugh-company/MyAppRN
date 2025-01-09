import {TabInterface} from '@types';

export interface itemListSlider {
  id: number;
  name: string;

  type: string;
  data: ItemProps[];
}
export interface ItemProps {
  id: number;
  poster: string;
  name: string;
}
export interface SliderListProps {
  title: string | undefined;
  data: TabInterface[];
}
