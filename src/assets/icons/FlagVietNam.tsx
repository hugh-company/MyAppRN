import React from 'react';
import Svg, { Path } from 'react-native-svg';

const FlagViewNam = ({ size = 32 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 31c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C7.716 1 1 7.716 1 16c0 8.284 6.716 15 15 15z"
        fill="#F42F4C"
      />
      <Path
        d="M16 19.5l4.95 3.5-1.85-5.7 4.9-3.7h-6.1L16 8l-1.85 5.6H8l4.9 3.7-1.85 5.7L16 19.5z"
        fill="#FFE62E"
      />
    </Svg>
  );
};
export default FlagViewNam;
