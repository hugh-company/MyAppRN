import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LikeActiveIcon = ({ size = 24, color = '#6B87F9' }: { size?: number, color?: string }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.619 1.728C13.5 3 13.5 4.41 13.5 7.328v1.34h5.014c.189 0 .365.05.487.091.139.048.283.114.425.192.283.155.6.385.875.693.275.308.53.723.626 1.24.086.46.032.945-.173 1.429.285.316.588.757.726 1.323.169.691.062 1.45-.398 2.228.287 1-.098 2.233-1.175 3.06.08.474.168 1.143.048 1.741-.08.394-.26.833-.65 1.165-.385.327-.87.465-1.395.47-1.189.079-3.022.173-4.699.2-.843.014-1.658.011-2.335-.02-.635-.029-1.27-.086-1.672-.228-.328-.116-.63-.266-.898-.398l-.089-.044a7.608 7.608 0 00-.942-.405c-.688-.234-1.683-.423-3.392-.32A1.79 1.79 0 012 19.286v-5.908c0-1.015 2.701-1.734 3.5-1.877 2.717 0 3-1.5 3.118-4.842V2.993c0-.8.507-1.523 1.334-1.728.656-.163 1.107.084 1.667.463z"
        fill={color}
      />
    </Svg>
  );
};
export default LikeActiveIcon;
