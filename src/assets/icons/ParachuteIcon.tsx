import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const ParachuteIcon = ({ width = Spacing.width19, height = Spacing.width20, color = '#FF1F44' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.792 10a8.708 8.708 0 0117.416 0c0 .21-.083.411-.232.56l-7.916 7.916c-.31.31-.81.31-1.12 0L1.024 10.56A.792.792 0 01.792 10zm1.793-1.723l.075-.044c.463-.265.958-.464 1.442-.464.485 0 .98.2 1.443.464a8.9 8.9 0 011.048.72c.9-.75 1.87-1.184 2.907-1.184 1.036 0 2.007.434 2.907 1.184a8.892 8.892 0 011.048-.72c.464-.265.958-.464 1.443-.464.484 0 .979.2 1.442.464l.075.044a7.128 7.128 0 00-13.83 0zm13.65 1.786a6.682 6.682 0 00-.68-.455c-.377-.215-.582-.256-.657-.256-.075 0-.281.04-.657.256-.325.185-.72.468-1.19.86l-1.588 4.366 4.771-4.771zM9.5 15.6l1.956-5.378c-.726-.623-1.376-.87-1.956-.87-.58 0-1.23.247-1.956.87L9.5 15.6zm-3.55-5.132c-.47-.392-.866-.675-1.191-.86-.376-.215-.582-.256-.657-.256-.075 0-.28.04-.657.256-.199.114-.425.264-.68.455l4.771 4.77-1.587-4.365z"
        fill={color}
      />
    </Svg>
  );
};

export default ParachuteIcon;
