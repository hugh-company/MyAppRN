import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const LocationIcon = ({ width = Spacing.width16, height = Spacing.width17, color = '#fff' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 17" fill="none">
      <Path
        d="M8 1.58a5.667 5.667 0 015.667 5.668c0 1.99-.919 4.003-2.455 5.967a19.49 19.49 0 01-1.892 2.08l-.279.262-.254.23-.227.196-.139.115a.667.667 0 01-.838.003l-.145-.12-.226-.195-.254-.229-.278-.261-.148-.143a19.49 19.49 0 01-1.745-1.938C3.252 11.25 2.333 9.238 2.333 7.248A5.667 5.667 0 018 1.58zm0 1.334a4.333 4.333 0 00-4.333 4.334c0 1.637.801 3.394 2.17 5.145A18.163 18.163 0 007.464 14.2l.269.257c.088.083.177.166.268.245l.268-.245.269-.257a18.165 18.165 0 001.625-1.806c1.37-1.751 2.171-3.508 2.171-5.145A4.333 4.333 0 008 2.914zm0 1.667a2.667 2.667 0 110 5.333 2.667 2.667 0 010-5.333zm0 1.333a1.333 1.333 0 100 2.667 1.333 1.333 0 000-2.667z"
        fill={color}
      />
    </Svg>
  );
};

export default LocationIcon;
