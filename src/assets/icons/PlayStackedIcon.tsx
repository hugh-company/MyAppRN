import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const PlayStackedIcon = ({ width = 24, height = 24, color = '#6B87F9' }: { width?: number, height?: number, color?: string }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <G opacity={0.89}>
        <Path
          d="M5.123 6.909a1 1 0 01.846-1.134l7.916-1.152a1 1 0 011.134.846l.18 1.243h2.022l-.367-2.52A2 2 0 0014.587 2.5L4.691 3.94A2 2 0 003 6.207l1.44 9.896a2 2 0 001.979 1.712v-1.928c0-.048-.003-.096-.01-.144L5.123 6.91z"
          fill={color}
        />
        <Path
          d="M12.72 17.616v-6.232a.2.2 0 01.316-.164l4.45 3.116a.2.2 0 010 .328l-4.45 3.116a.2.2 0 01-.315-.164z"
          fill={color}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.72 7.5h-10a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-10a2 2 0 00-2-2zm-1 2h-8a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-8a1 1 0 00-1-1z"
          fill={color}
        />
        <Path
          d="M5.897 5.28a1.5 1.5 0 00-1.269 1.7l1.286 8.835a.502.502 0 01.005.072v1.342a1.5 1.5 0 01-.984-1.198l-1.44-9.896a1.5 1.5 0 011.268-1.7l9.896-1.44a1.5 1.5 0 011.7 1.268l.284 1.95h-1.01l-.12-.816a1.5 1.5 0 00-1.7-1.269L5.897 5.28zm10.952 9.22l-3.628 2.54v-5.08l3.628 2.54zm.351.246s0 0 0 0h0zm0-.491s0 0 0 0h0zM9.72 8h10a1.5 1.5 0 011.5 1.5v10a1.5 1.5 0 01-1.5 1.5h-10a1.5 1.5 0 01-1.5-1.5v-10A1.5 1.5 0 019.72 8zm9 1h-8a1.5 1.5 0 00-1.5 1.5v8a1.5 1.5 0 001.5 1.5h8a1.5 1.5 0 001.5-1.5v-8a1.5 1.5 0 00-1.5-1.5z"
          fill={color}
        />
      </G>
    </Svg>
  );
};
export default PlayStackedIcon;
