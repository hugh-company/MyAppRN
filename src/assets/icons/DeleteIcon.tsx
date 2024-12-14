import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

const DeleteIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#1A1818' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5844 6L10.8095 14.7353H6.99988H3.19077L1.4158 6H0L2.03182 16H6.99988H11.9682L14 6H12.5844Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 12H8V5H7V12Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 4H14V3H0V4Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 1H10V0H5V1Z"
        fill={color}
      />
    </Svg>
  );
};

export default DeleteIcon;
