import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const EditUser = ({ width = Spacing.width24, height = Spacing.width24, color = '#fff' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 4a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM4.5 7.5a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0zm13.543 2.543a2.768 2.768 0 113.914 3.914L15.5 20.414l-.022.023a2.759 2.759 0 01-.318.285c-.11.08-.226.149-.35.205-.14.065-.287.107-.403.14l-.03.008-3.102.887a1 1 0 01-1.236-1.237l.886-3.101.008-.03c.033-.117.075-.263.14-.405.056-.123.125-.24.205-.349.092-.125.2-.232.285-.318l.023-.022 6.457-6.457zm2.5 1.414c-.3-.3-.786-.3-1.086 0L13 17.914a5.763 5.763 0 00-.109.11v.002c-.01.029-.02.068-.043.147l-.392 1.371 1.37-.392a6.519 6.519 0 00.15-.043l.001-.002c.022-.02.05-.049.11-.107l6.456-6.457c.3-.3.3-.786 0-1.086zM7.326 14.5H9a1 1 0 110 2H7.5c-1.468 0-1.98.01-2.37.13a3 3 0 00-2 2c-.12.39-.13.902-.13 2.37a1 1 0 11-2 0v-.174c0-1.227 0-2.065.215-2.777a5 5 0 013.334-3.334c.712-.216 1.55-.216 2.777-.215z"
        fill={color}
      />
    </Svg>
  );
};

export default EditUser;
