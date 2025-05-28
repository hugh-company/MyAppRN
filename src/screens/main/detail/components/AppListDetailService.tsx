import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { ServiceType } from '../../../../types/service.type';
import { HeaderDetail } from './HeaderDetail';

export interface HomeSection {
  id: number;
  type: 'service' | 'promotions' | 'domain';
  title?: string;
  description?: string; // add description for domain section
  items: any[];
}

export interface AppListDetailServiceProps {
  data: any[];
  scrollHandler?: any; // optional, for animated scroll
  ListHeaderComponent?: React.ComponentType<any>;
  contentContainerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>; // optional, for custom styles
}

export function AppListDetailService(props: AppListDetailServiceProps) {
  const { data, scrollHandler, ListHeaderComponent, contentContainerStyle } = props;
  const renderItem = ({ item: section }: { item: any }) => {
    switch (section.type as ServiceType) {
      case ServiceType.HEADER_SEARCH:
        return <HeaderDetail data={section} />;
      default:
        return null;
    }
  };

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={ListHeaderComponent}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={[contentContainerStyle]}
      showsVerticalScrollIndicator={false}

    />
  );
};
