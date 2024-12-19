import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ size = 32 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.667 24a9.333 9.333 0 100-18.667 9.333 9.333 0 000 18.667zm0 2.667c2.818 0 5.41-.972 7.457-2.599A12.07 12.07 0 0024.166 22a11.947 11.947 0 002.5-7.333c0-6.628-5.372-12-12-12-6.627 0-12 5.372-12 12 0 6.627 5.373 12 12 12z"
        fill="#EDEDED"
      />
      <Path
        d="M29.101 27.565a.333.333 0 00.004-.467L24.166 22a12.07 12.07 0 01-2.042 2.069l4.974 5.026c.13.132.342.132.472.001l1.531-1.53z"
        fill="#EDEDED"
      />
    </Svg>
  );
};
export default SearchIcon;
