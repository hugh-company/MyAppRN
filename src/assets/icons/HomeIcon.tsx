import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';


const HomeIcon = ({ size = Spacing.width24, color = '#EDEDED' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >
    <Path
      d="M14 14.5h-4v6H3.5V9.624a.25.25 0 01.098-.199l8.25-6.309a.25.25 0 01.304 0l8.25 6.309a.25.25 0 01.098.199V20.5H14v-6z"
      fill={color}
    />
  </Svg>
);
export default HomeIcon;
