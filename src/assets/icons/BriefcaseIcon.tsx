import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const BriefcaseIcon = ({ width = Spacing.width24, height = Spacing.width24, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 6v-.8C8 3.43 8 2 11.2 2h1.6C16 2 16 3.43 16 5.2V6m-2 8.02V13c0-1 0-1-1-1h-2c-1 0-1 0-1 1v1.03m4-.01c0 1.09-.01 1.98-2 1.98-1.98 0-2-.88-2-1.97m4-.01c2.7-.34 5.34-1.34 7.65-3.02M10 14.03c-2.59-.29-5.13-1.22-7.38-2.76M8 22h8c4.02 0 4.74-1.61 4.95-3.57l.75-8C21.97 7.99 21.27 6 17 6H7c-4.27 0-4.97 1.99-4.7 4.43l.75 8C3.26 20.39 3.98 22 8 22z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BriefcaseIcon;
