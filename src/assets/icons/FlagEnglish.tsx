import React from 'react';
import Svg, { ClipPath, Defs, G, Mask, Path } from 'react-native-svg';

const FlagEnglish = ({ size = 32 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <G clipPath="url(#clip0_449_4003)">
        <Mask
          id="a"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={32}
          height={32}
        >
          <Path
            d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16z"
            fill="#fff"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            d="M0 0l.5 1.375L0 2.813V4.25l2 3.375L0 11v2l2 3-2 3v2l2 3.375-2 3.375V32l1.375-.5 1.438.5H4.25l3.375-2L11 32h2l3-2 3 2h2l3.375-2 3.375 2H32l-.5-1.375.5-1.438V27.75l-2-3.375L32 21v-2l-2-3 2-3v-2l-2-3.375 2-3.375V0l-1.375.5-1.438-.5H27.75l-3.375 2L21 0h-2l-3 2-3-2h-2L7.625 2 4.25 0H0z"
            fill="#EEE"
          />
          <Path
            d="M21 0v6.75L27.75 0H21zm11 4.25L25.25 11H32V4.25zM0 11h6.75L0 4.25V11zM4.25 0L11 6.75V0H4.25zM11 32v-6.75L4.25 32H11zM0 27.75L6.75 21H0v6.75zM32 21h-6.75L32 27.75V21zm-4.25 11L21 25.25V32h6.75z"
            fill="#0052B4"
          />
          <Path
            d="M0 0v2.813L8.188 11H11L0 0zm13 0v13H0v6h13v13h6V19h13v-6H19V0h-6zm16.188 0L21 8.188V11L32 0h-2.813zM11 21L0 32h2.813L11 23.812V21zm10 0l11 11v-2.813L23.812 21H21z"
            fill="#D80027"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_449_4003">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default FlagEnglish;
