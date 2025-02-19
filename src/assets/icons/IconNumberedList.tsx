import { Spacing } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconWidthHeightProps } from './types';
const IconNumberedList = ({ width = Spacing.width28, height = Spacing.width28, color = 'white' }: IconWidthHeightProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Path
        d="M12.833 6.708a.875.875 0 100 1.75H24.5a.875.875 0 100-1.75H12.833zm0 6.417a.875.875 0 100 1.75H24.5a.875.875 0 100-1.75H12.833zm0 6.417a.875.875 0 000 1.75H24.5a.875.875 0 100-1.75H12.833zM7.292 5.25a.875.875 0 00-1.246-.793L3.712 5.55a.875.875 0 00.742 1.585l1.088-.51v5.186a.875.875 0 101.75 0V5.25zM4.958 17.828c0-.37.339-.766.875-.766h.047c.512 0 .828.376.828.721 0 .19-.066.372-.186.518L3.4 22.204a.875.875 0 00.683 1.42h3.5a.875.875 0 000-1.75h-1.68l1.985-2.48c.369-.455.57-1.023.571-1.61 0-1.418-1.21-2.473-2.578-2.473h-.048c-1.395 0-2.625 1.075-2.625 2.517v.203a.875.875 0 101.75 0v-.203z"
        fill={color}
      />
    </Svg>
  );
};

export default IconNumberedList;
