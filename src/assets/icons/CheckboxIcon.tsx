import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { IconProps } from './types';

interface CheckboxIconProps extends IconProps {
  isChecked?: boolean;
}

const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  size = 22,
  color = '#C4C4C4',
  isChecked = false,
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Rect width={22} height={22} rx={5} fill={color} />
      {isChecked && (
        <Path
          d="M6 11.5L9.5 15L16 8"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
};

export default CheckboxIcon;
