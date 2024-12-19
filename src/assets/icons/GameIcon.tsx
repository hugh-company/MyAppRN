import React from 'react';
import Svg, { Path } from 'react-native-svg';
const GameIcon = ({ color = '#fff' }) => (
  <Svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"

  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.375 8.375v-4.5h-6.75v4.5L12 11.75l3.375-3.375zm-7.5.75h-4.5v6.75h4.5L11.25 12.5 7.875 9.125zm12.75 0h-4.5L12.75 12.5l3.375 3.375h4.5v-6.75zm-5.25 7.5v4.5h-6.75v-4.5L12 13.25l3.375 3.375z"
      fill={color}
    />
  </Svg>
);
export default GameIcon;
