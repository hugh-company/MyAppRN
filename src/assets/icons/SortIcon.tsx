import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SortIcon = ({ size = 16, color = '#B2B2B2' }: { size?: number, color?: string }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.87 3.333c.369 0 .667.298.667.667v6.471l1.514-1.405a.667.667 0 01.907.977l-2.634 2.445a.667.667 0 01-.916-.008L.87 10.034a.667.667 0 11.925-.96l1.408 1.357V4c0-.369.298-.667.667-.667zm4.424 1.085c0-.368.299-.667.667-.667h5.706a.667.667 0 110 1.334H8.96a.667.667 0 01-.667-.667zm0 3.21c0-.368.299-.667.667-.667h4.076a.667.667 0 010 1.333H8.96a.667.667 0 01-.667-.666zm0 3.21c0-.369.299-.667.667-.667h2.445a.667.667 0 010 1.333H8.961a.667.667 0 01-.667-.666z"
        fill="#B2B2B2"
      />
    </Svg>
  );
};
export default SortIcon;
