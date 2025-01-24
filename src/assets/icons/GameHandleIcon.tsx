import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const GameHandleIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#D11030' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        d="M6.333 10c.438 0 .792.354.792.792v.791h.792a.792.792 0 110 1.584h-.792v.791a.792.792 0 01-1.583 0v-.791H4.75a.792.792 0 110-1.584h.792v-.791c0-.438.354-.792.791-.792z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.667 10a2.375 2.375 0 100 4.75 2.375 2.375 0 000-4.75zm-.792 2.375a.792.792 0 111.583 0 .792.792 0 01-1.583 0z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.667 1.292c.437 0 .791.354.791.791v2.262a.792.792 0 01-.791.792h-2.375v1.696h2.375a5.542 5.542 0 110 11.084H6.333a5.542 5.542 0 110-11.084h2.375V4.345c0-.437.355-.791.792-.791h2.375v-1.47c0-.438.354-.792.792-.792zM6.333 8.417a3.958 3.958 0 100 7.916h6.334a3.958 3.958 0 100-7.916H6.333z"
        fill={color}
      />
    </Svg>
  );
};

export default GameHandleIcon;
