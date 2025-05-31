import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckIcon = ({ size = 24, color = '#ff' }: { size?: number, color?: string }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"  >
      <Path
        d="M5 12l5 5L20 7"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export default CheckIcon;
