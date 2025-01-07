import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const RunIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.48 4.458a2.77 2.77 0 115.54 0 2.77 2.77 0 01-5.54 0zm2.77-1.187a1.188 1.188 0 100 2.375 1.188 1.188 0 000-2.375zM7.659 5.293a.792.792 0 01.6.033l4.353 2.078a.791.791 0 01.132 1.35l-3.447 2.57 3.41 2.244a.792.792 0 01.197 1.136l-2.768 3.687a.792.792 0 11-1.266-.95l2.262-3.014-3.65-2.402a.792.792 0 01-.037-1.296l3.3-2.461L7.87 6.895l-2.861.99a.792.792 0 11-.518-1.495l3.168-1.097zM17.994 6.87c.299.32.283.82-.035 1.12l-2.375 2.23a.792.792 0 01-.92.119l-1.062-.577a.792.792 0 01.757-1.391l.559.303 1.957-1.838a.792.792 0 011.119.034zM7.148 12.356a.792.792 0 01.152 1.11l-1.176 1.548a.79.79 0 01-.243.212l-3.909 2.192a.792.792 0 11-.774-1.38l3.765-2.113 1.076-1.417a.792.792 0 011.11-.152z"
        fill={color}
      />
    </Svg>
  );
};

export default RunIcon;
