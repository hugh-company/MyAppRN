import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

const FilterIcon = ({ size = Spacing.width16, color = '#B2B2B2' }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.667 5.333a.667.667 0 10-1.334 0 .667.667 0 001.334 0zm-.667-2A2 2 0 1110.114 6H2.667a.667.667 0 110-1.334h7.447A2 2 0 0112 3.333zM14 10a.667.667 0 01-.667.666H5.886a2 2 0 110-1.333h7.447c.368 0 .667.298.667.667zm-9.333 0a.667.667 0 10-1.334 0 .667.667 0 001.334 0z"
        fill={color}
      />
    </Svg>
  );
};
export default FilterIcon;
