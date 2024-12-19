import React from 'react';
import Svg, { Path } from 'react-native-svg';


const RightIcon = ({ size = 24, color = '#EDEDED' }: { size?: number, color?: string }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18l6-6-6-6"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export default RightIcon;
