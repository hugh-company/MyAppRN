import {FlashList} from '@shopify/flash-list';
import 'react';

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.RefObject<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

declare module '@shopify/flash-list' {
  export interface FlashListProps<T> {
    ref?: React.RefObject<FlashList<T>>;
  }
}
