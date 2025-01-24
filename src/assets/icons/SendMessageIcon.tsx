import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const SendMessageIcon = ({ width = Spacing.width40, height = Spacing.width40, color = '#D11030' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 40" fill="none">
      <Path
        d="M34.637 5.363a1.25 1.25 0 00-1.312-.288l-27.5 10a1.25 1.25 0 000 2.338L16.562 21.7l7.925-7.95 1.763 1.763-7.963 7.962 4.3 10.738A1.25 1.25 0 0023.75 35a1.25 1.25 0 001.15-.825l10-27.5a1.25 1.25 0 00-.263-1.312z"
        fill={color}
      />
    </Svg>
  );
};

export default SendMessageIcon;
