import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SavedIcon = ({ size = 24 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5.25 3.942c0-.766.521-1.692 1.5-1.692h10.5c.979 0 1.5.926 1.5 1.692v16.01c0 1.352-1.469 2.308-2.686 1.518l-3.944-2.56a.21.21 0 00-.238 0l-3.946 2.56c-1.217.79-2.686-.165-2.686-1.518V3.942zm9.703 3.997a.75.75 0 00-1.216-.878l-2.467 3.416-1.006-1.148a.75.75 0 00-1.128.987l1.378 1.576a1.05 1.05 0 001.64-.077l2.799-3.876z"
        fill="#EDEDED"
      />
    </Svg>
  );
};
export default SavedIcon;
