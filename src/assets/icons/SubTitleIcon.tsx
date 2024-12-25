import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

const SubTitleIcon = ({ size = 28, color = 'white', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none" >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 6H4v10h16V6zM2 4v14h20V4H2z"
      fill="#fff"
    />
    <Path
      d="M6 9h4v2H6V9zM12 9h6v2h-6V9zM6 12h6v2H6v-2zM14 12h4v2h-4v-2zM18 21.5L12.5 18H18v3.5z"
      fill="#fff"
    />
  </Svg>
);
export default SubTitleIcon;
