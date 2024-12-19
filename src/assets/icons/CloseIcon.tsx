import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CloseIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export default CloseIcon;
