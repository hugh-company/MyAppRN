import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const MarketIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#fff' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 2.875a1.98 1.98 0 00-1.98 1.98v.395h3.96v-.396A1.98 1.98 0 009.5 2.875zm3.563 2.375v-.396a3.563 3.563 0 00-7.126 0v.396H3.958c-.874 0-1.583.709-1.583 1.583v10.292c0 .875.709 1.583 1.583 1.583h11.084c.874 0 1.583-.708 1.583-1.583V6.833c0-.874-.709-1.583-1.583-1.583h-1.98zm-1.584 1.583v.792a.792.792 0 101.584 0v-.792h1.979v10.292H3.958V6.833h1.98v.792a.792.792 0 101.583 0v-.792h3.958z"
        fill={color}
      />
    </Svg>
  );
};

export default MarketIcon;
