import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
const CookingIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.189 1.91a.792.792 0 01-.599.946l-4.132.93v5.422h3.959c.437 0 .791.355.791.792 0 2.34-.707 4.526-2.188 6.134-1.491 1.62-3.694 2.574-6.52 2.574-2.826 0-5.029-.955-6.52-2.574C1.5 14.526.792 12.341.792 10c0-.437.354-.792.791-.792h.792V6.28l-.618.14a.792.792 0 01-.347-1.546l.965-.217v-.198a.792.792 0 011.568-.155l1.599-.36v-.276a.792.792 0 011.58-.079l1.586-.357v-.356a.792.792 0 111.584 0l1.583-.356v-.436a.792.792 0 011.583 0v.08l3.785-.852a.792.792 0 01.946.599zm-6.314 2.232l-1.583.356v4.71h1.583V4.142zm-9.468 6.65c.14 1.7.733 3.179 1.738 4.27 1.148 1.246 2.903 2.063 5.355 2.063 2.452 0 4.207-.817 5.355-2.063 1.005-1.091 1.599-2.57 1.738-4.27H2.407zm1.551-1.584h1.584V5.567l-1.584.356v3.285zM7.125 5.21v3.998h1.583V4.854l-1.583.356z"
        fill={color}
      />
    </Svg>
  );
};

export default CookingIcon;
