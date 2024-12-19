import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const PageProfileIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 3a2 2 0 012-2h18a2 2 0 012 2v18a2 2 0 01-2 2H3a2 2 0 01-2-2V3z"
        fill="url(#paint0_linear_449_8674)"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.907 12.71a.5.5 0 01-.116.697c-1.866 1.332-3.867 1.642-5.592 1.465-1.712-.175-3.177-.832-4.006-1.477a.5.5 0 01.614-.79c.67.522 1.956 1.115 3.494 1.273 1.525.156 3.274-.117 4.908-1.285a.5.5 0 01.698.116z"
        fill="#fff"
      />
      <Path
        d="M19.75 8.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM6.75 8.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_449_8674"
          x1={12}
          y1={1}
          x2={12}
          y2={23}
          gradientUnits="userSpaceOnUse"
        >
          <Stop />
          <Stop offset={0.501305} stopColor="#828282" />
          <Stop offset={1} stopColor="#F7F7F7" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
export default PageProfileIcon;
