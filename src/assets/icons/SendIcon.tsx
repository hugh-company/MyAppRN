import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SendIcon = ({ size = 24, color = '#EDEDED' }: { size?: number, color?: string }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.564 2.707a.5.5 0 01.57.679l-7.18 17.4a.75.75 0 01-1.392-.01l-3.174-8.018-8.131-4.437c-.609-.332-.48-1.241.197-1.39l19.11-4.224zM12.18 12.4l2.1 5.305 4.5-10.904-6.6 5.6zm5.53-7.028L5.505 8.07l5.492 2.996 6.711-5.693z"
        fill={color}
      />
    </Svg>
  );
};
export default SendIcon;
