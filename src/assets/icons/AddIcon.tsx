import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

const AddIcon = ({ size = 12, color = 'white', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 12 12" fill="none" >
    <Path
      d="M6 1L6 11"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M11 6L1 6"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default AddIcon;
