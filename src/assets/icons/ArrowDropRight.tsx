import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ArrowDropRight = ({ width = Spacing.width28, height = Spacing.width28, color = 'white' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.369 10.094a.138.138 0 00-.207.123v9.188a.144.144 0 00.07.122.136.136 0 00.137.001l7.857-4.594a.14.14 0 00.07-.123.144.144 0 00-.07-.123L4.37 10.094zM5.466 8.13c-1.567-.917-3.514.242-3.514 2.087v9.188c0 .42.108.835.313 1.2.205.364.5.668.856.88a2.308 2.308 0 002.345.008l7.263-4.247v2.159c0 .42.108.835.314 1.2.205.364.5.668.856.88a2.309 2.309 0 002.345.008l7.857-4.594c.36-.21.659-.514.866-.88a2.448 2.448 0 000-2.415 2.376 2.376 0 00-.866-.88L16.244 8.13c-1.567-.917-3.515.242-3.515 2.087v2.16L5.466 8.13zm9.68 1.964a.138.138 0 00-.206.123v9.188a.144.144 0 00.07.122.136.136 0 00.137.001l7.857-4.594a.141.141 0 00.07-.123.144.144 0 00-.07-.123l-7.858-4.594z"
        fill={color}
      />
    </Svg>
  );
};

export default ArrowDropRight;
