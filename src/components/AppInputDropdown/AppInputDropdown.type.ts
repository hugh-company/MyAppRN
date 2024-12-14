import {Control, Path} from 'react-hook-form';

import {FieldValues} from 'react-hook-form';
import {StyleProp, ViewStyle} from 'react-native';

export interface AppInputDropdownProps<T extends FieldValues> {
  data: {label: string; value: string}[];
  onSelect?: (
    selectedItem: {label: string; value: string},
    index: number,
  ) => void;
  containerStyle?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  control?: Control<T>;
  name?: Path<T>;
  error?: string;
  errorStyle?: StyleProp<ViewStyle>;
  value?: string;
}
export type AppInputDropdownDefaultProps = Omit<
  AppInputDropdownProps<any>,
  'control' | 'name'
>;
