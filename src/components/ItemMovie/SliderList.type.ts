export interface itemListSlider {
  id: number;
  name: string;

  type: string;
  data: ItemProps[];
}
export interface ItemProps {
  id: number;
  image: string;
  name: string;
}
export interface SliderListProps {
  title: string;
  data: any[];
}
