import { Spacing } from '@theme';
import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const VipIcon = ({ width = Spacing.width24, height = Spacing.width24, color = '#D9D9D9' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.536 4a1.658 1.658 0 011.38.735l.073.119 2.79 4.938a1.71 1.71 0 01-.174 1.933l-.095.104-7.77 7.861a1.04 1.04 0 01-1.394.077l-.086-.076-7.77-7.862a1.712 1.712 0 01-.335-1.911l.066-.127 2.79-4.938a1.661 1.661 0 011.316-.848L7.462 4h9.073zM8.06 9.329a.852.852 0 000 1.197l3.2 3.237a1.045 1.045 0 00.74.31 1.034 1.034 0 00.74-.31l3.199-3.237a.847.847 0 00.255-.602.855.855 0 00-.245-.606.836.836 0 00-.922-.179.837.837 0 00-.271.19l-2.757 2.788L9.243 9.33a.832.832 0 00-1.183 0z"
        fill="url(#paint0_linear_1332_21508)"
      />
      <Path
        d="M7.814 9.928c0-.225.089-.44.246-.6a.832.832 0 011.183 0l2.756 2.79 2.756-2.79a.838.838 0 01.595-.258.829.829 0 01.6.248.848.848 0 01.244.606.853.853 0 01-.255.602l-3.2 3.237a1.046 1.046 0 01-.74.31 1.036 1.036 0 01-.74-.31l-3.2-3.237a.852.852 0 01-.245-.598z"
        fill={color}
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1332_21508"
          x1={12}
          y1={4}
          x2={12}
          y2={20}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#C5C5C4" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default VipIcon;
