import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
const DotsIcon = ({ size = Spacing.width28, color = '#fff' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"

  >
    <Path
      d="M14 8.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM14 15.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM14 22.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z"
      fill={color}
    />
  </Svg>
);
export default DotsIcon;
