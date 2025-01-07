import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

const CalenderIcon = ({ size = 24, color = 'white', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >
    <Path
      d="M4.75 8.914h14M6.56 3v1.543M16.75 3v1.543m3 2.7V18.3c0 1.491-1.194 2.7-2.667 2.7H6.417c-1.473 0-2.667-1.209-2.667-2.7V7.243c0-1.491 1.194-2.7 2.667-2.7h10.666c1.473 0 2.667 1.209 2.667 2.7z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CalenderIcon;
