import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

const PenIcon: React.FC<IconProps> = ({ width = 16, height = 16, color = '#1A1818' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 16" fill="none"  >
      <Path
        d="M4.13513 11.4865L14.1351 2.48651L12.6351 1.98651L3.13513 10.4865L4.13513 11.4865Z"
        fill="#F7CC15"
      />
      <Path
        d="M1.59559 13.7981L2.18173 11.6489C2.38376 10.9082 3.31067 10.662 3.8536 11.205L5.41666 12.768C5.95959 13.3109 5.71344 14.2379 4.97267 14.4399L2.82347 15.026C2.07697 15.2296 1.392 14.5446 1.59559 13.7981Z"
        fill="#F7CC15"
      />
      <Path
        d="M2.73513 10.0865L1.62963 13.9557C1.4141 14.7101 2.11152 15.4075 2.86588 15.192L6.73513 14.0865M2.73513 10.0865L11.1399 2.32827C12.2545 1.29938 13.9826 1.33393 15.0552 2.40654V2.40654C16.1902 3.54156 16.1532 5.39288 14.9737 6.48162L6.73513 14.0865M2.73513 10.0865L6.73513 14.0865"
        stroke={color}
        strokeWidth="1.5"
      />
    </Svg>
  );
};


export default PenIcon;
