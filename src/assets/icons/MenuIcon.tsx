import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MenuIcon = ({ size = 28, color = '#EDEDED' }: { size?: number, color: string }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">

      <Path
        d="M4.667 21a1.167 1.167 0 00-.137 2.325l.137.008h18.666a1.167 1.167 0 00.137-2.325L23.333 21H4.667zm0-8.167a1.167 1.167 0 100 2.334h18.666a1.167 1.167 0 100-2.334H4.667zm0-8.166a1.167 1.167 0 100 2.333h18.666a1.167 1.167 0 100-2.333H4.667z"
        fill={color}
      />
    </Svg>
  );
};
export default MenuIcon;
