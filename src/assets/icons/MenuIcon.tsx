import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MenuIcon = ({ size = 28, color = '#818080' }: { size?: number, color?: string }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">

      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.334 7c0-.644.522-1.166 1.167-1.166h21a1.167 1.167 0 010 2.333h-21a1.167 1.167 0 01-1.167-1.166zm0 7c0-.644.522-1.166 1.167-1.166h21a1.167 1.167 0 010 2.333h-21a1.167 1.167 0 01-1.167-1.166zm0 7c0-.644.522-1.166 1.167-1.166h14a1.167 1.167 0 010 2.333h-14a1.167 1.167 0 01-1.167-1.166z"

        fill={color}
      />
    </Svg>
  );
};
export default MenuIcon;
