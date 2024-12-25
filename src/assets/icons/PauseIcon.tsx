import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

const PauseIcon = ({ size = 28, color = 'white', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >
    <Path
      d="M18.44 21.6h-4.48V2h4.48v19.6zM9.48 21.6H5V2h4.48v19.6z"
      fill="#fff"
    />
  </Svg>
);
export default PauseIcon;
