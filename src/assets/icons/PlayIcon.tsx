import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

const PlayIcon = ({ size = 28, color = 'white', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none" >
    <Path
      d="M22.209 13.633a1 1 0 01-.031 1.628L8.565 24.594A1 1 0 017 23.769V4.322a1 1 0 011.596-.802L22.21 13.634z"
      fill={color}
    />
  </Svg>
);
export default PlayIcon;
