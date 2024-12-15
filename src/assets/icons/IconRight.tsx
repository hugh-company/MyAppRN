import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { IconProps } from './types';

const IconRight = ({ size = 24, fill = '#000' }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.29 16.29L14.59 11L9.29 5.71L10.71 4.29L16.71 10.29C17.1 10.68 17.1 11.32 16.71 11.71L10.71 17.71L9.29 16.29Z"
        fill={fill}
      />
    </Svg>
  );
};

export default IconRight;
