import React from 'react';
import Svg, { Polygon, Rect } from 'react-native-svg';
const IconVietNam = ({ width, height }: { width: number; height: number }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16">
      <Rect width={width} height={height} fill="#DA251D" />
      <Polygon
        points="8,2.13 8.95,5.96 12.58,5.96 9.48,7.97 10.43,11.8 8,9.55 5.57,11.8 6.52,7.97 3.42,5.96 7.05,5.96"
        fill="#FFCD00"
      />
    </Svg>
  );
};

export default IconVietNam;
