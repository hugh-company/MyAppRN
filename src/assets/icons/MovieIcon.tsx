import { Spacing } from '@theme';
import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const MovieIcon = ({ size = Spacing.width28, color = '#EDEDED' }) => (
  <Svg width="29" height={size} viewBox="0 0 29 28" fill="none">
    <G clipPath="url(#clip0_449_6832)">
      <Path d="M24.9152 9.48267L24.6282 10.143C24.5834 10.2505 24.5077 10.3424 24.4107 10.407C24.3138 10.4716 24.1999 10.5061 24.0834 10.5061C23.9669 10.5061 23.853 10.4716 23.756 10.407C23.6591 10.3424 23.5834 10.2505 23.5385 10.143L23.2515 9.48267C22.7469 8.31451 21.8228 7.37791 20.6615 6.85767L19.776 6.46217C19.6686 6.41275 19.5776 6.33357 19.5138 6.234C19.45 6.13444 19.4161 6.01867 19.4161 5.90042C19.4161 5.78217 19.45 5.6664 19.5138 5.56683C19.5776 5.46727 19.6686 5.38808 19.776 5.33867L20.6125 4.9665C21.803 4.43144 22.7429 3.4602 23.2387 2.25283L23.5339 1.54C23.5772 1.42958 23.6528 1.33478 23.7509 1.26796C23.8489 1.20114 23.9647 1.16541 24.0834 1.16541C24.202 1.16541 24.3179 1.20114 24.4159 1.26796C24.5139 1.33478 24.5895 1.42958 24.6329 1.54L24.928 2.25167C25.4233 3.45926 26.3628 4.43092 27.553 4.9665L28.3907 5.33983C28.4978 5.38939 28.5885 5.46857 28.652 5.568C28.7156 5.66744 28.7494 5.78299 28.7494 5.901C28.7494 6.01901 28.7156 6.13456 28.652 6.234C28.5885 6.33343 28.4978 6.41261 28.3907 6.46217L27.504 6.8565C26.343 7.37726 25.4193 8.31428 24.9152 9.48267ZM14.75 2.33333C8.30654 2.33333 3.08337 7.5565 3.08337 14C3.08337 20.4435 8.30654 25.6667 14.75 25.6667H24.0834V23.3333H21.7512C22.6356 22.67 23.4212 21.8844 24.0845 21C25.6017 18.982 26.4204 16.5247 26.4167 14C26.4167 13.5302 26.3895 13.0674 26.335 12.6117L24.018 12.8858C24.0616 13.2514 24.0834 13.6228 24.0834 14C24.0849 15.3244 23.8039 16.6338 23.2591 17.841C22.7143 19.0481 21.9182 20.1251 20.924 21C19.7164 22.0644 18.2541 22.7984 16.679 23.1306C15.104 23.4629 13.4697 23.3821 11.9351 22.8962C10.4005 22.4103 9.01759 21.5357 7.92083 20.3574C6.82406 19.1791 6.05069 17.7372 5.67583 16.1717C5.30097 14.6063 5.33738 12.9704 5.7815 11.4232C6.22563 9.87594 7.06239 8.46986 8.21048 7.34154C9.35858 6.21322 10.779 5.40102 12.3337 4.98383C13.8884 4.56665 15.5246 4.55867 17.0834 4.96067L17.6644 2.70083C16.731 2.4605 15.7545 2.33333 14.75 2.33333ZM12.4167 9.33333C12.4167 9.95217 12.6625 10.5457 13.1001 10.9832C13.5377 11.4208 14.1312 11.6667 14.75 11.6667C15.3689 11.6667 15.9624 11.4208 16.4 10.9832C16.8375 10.5457 17.0834 9.95217 17.0834 9.33333C17.0834 8.7145 16.8375 8.121 16.4 7.68342C15.9624 7.24583 15.3689 7 14.75 7C14.1312 7 13.5377 7.24583 13.1001 7.68342C12.6625 8.121 12.4167 8.7145 12.4167 9.33333ZM7.75004 14C7.75004 14.6188 7.99587 15.2123 8.43346 15.6499C8.87104 16.0875 9.46454 16.3333 10.0834 16.3333C10.7022 16.3333 11.2957 16.0875 11.7333 15.6499C12.1709 15.2123 12.4167 14.6188 12.4167 14C12.4167 13.3812 12.1709 12.7877 11.7333 12.3501C11.2957 11.9125 10.7022 11.6667 10.0834 11.6667C9.46454 11.6667 8.87104 11.9125 8.43346 12.3501C7.99587 12.7877 7.75004 13.3812 7.75004 14ZM17.0834 14C17.0834 14.6188 17.3292 15.2123 17.7668 15.6499C18.2044 16.0875 18.7979 16.3333 19.4167 16.3333C20.0355 16.3333 20.629 16.0875 21.0666 15.6499C21.5042 15.2123 21.75 14.6188 21.75 14C21.75 13.3812 21.5042 12.7877 21.0666 12.3501C20.629 11.9125 20.0355 11.6667 19.4167 11.6667C18.7979 11.6667 18.2044 11.9125 17.7668 12.3501C17.3292 12.7877 17.0834 13.3812 17.0834 14ZM12.4167 18.6667C12.4167 19.2855 12.6625 19.879 13.1001 20.3166C13.5377 20.7542 14.1312 21 14.75 21C15.3689 21 15.9624 20.7542 16.4 20.3166C16.8375 19.879 17.0834 19.2855 17.0834 18.6667C17.0834 18.0478 16.8375 17.4543 16.4 17.0168C15.9624 16.5792 15.3689 16.3333 14.75 16.3333C14.1312 16.3333 13.5377 16.5792 13.1001 17.0168C12.6625 17.4543 12.4167 18.0478 12.4167 18.6667Z"

        fill={color} />
    </G>
    <Defs>
      <ClipPath id="clip0_449_6832">
        <Rect width="28" height="28" fill="white" transform="translate(0.75)" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default MovieIcon;
