import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const YogaIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 3.27a3.958 3.958 0 00-3.958 4.015 5.516 5.516 0 013.958.937 5.516 5.516 0 013.958-.937V7.23A3.958 3.958 0 009.5 3.271zm5.518 4.481a5.542 5.542 0 10-11.035 0A5.542 5.542 0 109.5 17.319a5.542 5.542 0 105.518-9.568zm-1.9 1.087a3.94 3.94 0 00-2.43.504c.316.401.577.847.774 1.326a3.975 3.975 0 001.656-1.83zM11.85 12.25a5.562 5.562 0 002.778-2.917 3.958 3.958 0 11-3.941 6.867 5.518 5.518 0 001.163-3.95zm-1.9-1.087a3.955 3.955 0 00-.45-.767c-.178.237-.33.494-.452.767a3.998 3.998 0 00.902 0zM8.71 12.715a5.596 5.596 0 001.582 0v.056a3.94 3.94 0 01-.791 2.375 3.94 3.94 0 01-.791-2.431zm-1.17-2.047c.196-.48.458-.925.774-1.326a3.94 3.94 0 00-2.43-.504 3.974 3.974 0 001.655 1.83zM4.37 9.332A5.562 5.562 0 007.15 12.25a5.518 5.518 0 001.163 3.95 3.958 3.958 0 11-3.941-6.867z"
        fill={color}
      />
    </Svg>
  );
};

export default YogaIcon;
