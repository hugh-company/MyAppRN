import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ArrowDropLeft = ({ width = Spacing.width28, height = Spacing.width28, color = 'white' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.57 10.094a.138.138 0 01.206.123v9.188a.14.14 0 01-.069.122.136.136 0 01-.137.001l-7.857-4.594a.14.14 0 01-.07-.123.143.143 0 01.07-.123l7.857-4.594zM23.473 8.13c1.567-.917 3.514.242 3.514 2.087v9.188c0 .42-.108.835-.313 1.2-.205.364-.5.668-.856.88a2.308 2.308 0 01-2.345.008l-7.264-4.247v2.159c0 .42-.107.835-.313 1.2-.205.364-.5.668-.856.88a2.308 2.308 0 01-2.345.008l-7.857-4.594a2.378 2.378 0 01-.866-.88 2.448 2.448 0 010-2.415c.208-.367.507-.67.866-.88l7.857-4.594c1.567-.917 3.514.242 3.514 2.087v2.16l7.264-4.247zm-9.68 1.964a.138.138 0 01.206.123v9.188c0 .025-.007.05-.019.07a.136.136 0 01-.188.052l-7.857-4.593a.14.14 0 01-.07-.123.144.144 0 01.07-.123l7.858-4.594z"
        fill={color}
      />
    </Svg>
  );
};

export default ArrowDropLeft;
