
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const FullScreenIcon = ({ width = 24, height = 24, color = 'white' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 3h6v2H5v4H3V3zm12 0h6v6h-2V5h-4V3zm6 12v6h-6v-2h4v-4h2zm-12 6H3v-6h2v4h4v2z"
      fill={color}
    />
  </Svg>
);

export default FullScreenIcon;
