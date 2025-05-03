import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ProfileIcon = ({ width = Spacing.width28, height = Spacing.width28, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.834 3.818a8.182 8.182 0 00-6.238 13.477 4.536 4.536 0 013.51-1.659h5.455c1.415 0 2.678.647 3.51 1.659a8.182 8.182 0 00-6.238-13.476zm6.7 15.606a9.974 9.974 0 003.3-7.424c0-5.523-4.477-10-10-10s-10 4.477-10 10a9.974 9.974 0 003.332 7.453A9.963 9.963 0 0012.834 22a9.962 9.962 0 006.7-2.576zm-1.79-.878a2.723 2.723 0 00-2.183-1.091h-5.454c-.892 0-1.685.427-2.183 1.09a8.145 8.145 0 004.91 1.637 8.145 8.145 0 004.91-1.636zM12.834 7a2.727 2.727 0 100 5.455 2.727 2.727 0 000-5.455zM8.289 9.727a4.545 4.545 0 119.09 0 4.545 4.545 0 01-9.09 0z"
        fill={color}
      />
    </Svg>
  );
};

export default ProfileIcon;
