import React from 'react';
import Svg, { Path } from 'react-native-svg';
const GameIcon = ({ size = 32, color = '#fff' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"

  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.5 10.5v-6h-9v6L16 15l4.5-4.5zm-10 1h-6v9h6L15 16l-4.5-4.5zm17 0h-6L17 16l4.5 4.5h6v-9zm-7 10v6h-9v-6L16 17l4.5 4.5z"
      fill={color}
    />
  </Svg>
);
export default GameIcon;
