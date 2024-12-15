import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { IconProps } from './types';

export const MessageIcon = ({ size = 48, color = '#1E1E1E' }: IconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Path
        d="M42 23C42.0069 25.6397 41.3901 28.2438 40.2 30.6C38.7889 33.4235 36.6195 35.7983 33.9349 37.4586C31.2503 39.1188 28.1565 39.9988 25 40C22.3603 40.0069 19.7562 39.3901 17.4 38.2L6 42L9.8 30.6C8.60986 28.2438 7.99312 25.6397 8 23C8.00122 19.8435 8.88122 16.7497 10.5414 14.0651C12.2017 11.3805 14.5765 9.21113 17.4 7.8C19.7562 6.60986 22.3603 5.99311 25 6H26C30.1687 6.22998 34.1061 7.98952 37.0583 10.9417C40.0105 13.8939 41.77 17.8313 42 22V23Z"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
