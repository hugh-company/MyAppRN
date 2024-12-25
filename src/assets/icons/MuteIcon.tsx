import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

const MuteIcon = ({ size = 24, color = 'white', ...props }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" >

    <Path
      d="M3.158 13.93a3.752 3.752 0 010-3.86v0a1.5 1.5 0 01.993-.7l1.693-.339a.45.45 0 00.258-.153L8.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938C11 4.648 11 5.572 11 7.42v9.162c0 1.847 0 2.77-.528 2.962-.527.19-1.119-.519-2.301-1.938L6.1 15.122a.45.45 0 00-.257-.153l-1.693-.339a1.5 1.5 0 01-.993-.7v0z"
      stroke={color}
    />
    <Path d="M15 15l6-6M21 15l-6-6" stroke={color} strokeLinecap="round" />

  </Svg>
);
export default MuteIcon;
