import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LeftIcon = ({ width = Spacing.width29, height = Spacing.width28, style, color = 'black' }: any) => {
  return (
    <Svg width={width} height={height} style={style} viewBox="0 0 29 28" fill="none">
      <Path
        d="M9.22581 14L17.9758 22.75L19.2008 21.525L11.6758 14L19.2008 6.475L17.9758 5.25L9.22581 14Z"
        fill={color}
      />
    </Svg>
  );
};
export default LeftIcon;
