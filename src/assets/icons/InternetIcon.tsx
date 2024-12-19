import React from 'react';
import Svg, { Path } from 'react-native-svg';

const InternetIcon = ({ size = 32 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12zm0 0s5.333-4 5.333-12S16 4 16 4s-5.333 4-5.333 12S16 28 16 28z"
        fill="#000"
        fillOpacity={0.15}
      />
      <Path
        d="M28 16c0 6.627-5.373 12-12 12m12-12c0-6.627-5.373-12-12-12m12 12H4m12 12C9.373 28 4 22.627 4 16m12 12s5.333-4 5.333-12S16 4 16 4m0 24s-5.333-4-5.333-12S16 4 16 4M4 16C4 9.373 9.373 4 16 4"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export default InternetIcon;
