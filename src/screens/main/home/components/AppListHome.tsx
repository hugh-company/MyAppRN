import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { MarketingServices } from '../../../../constants/services';
import { BannerPromotions } from './BannerPromotions';
import { CloudList } from './CloudList';
import { DomainList } from './DomainList';
import { ServiceCarousel } from './ServiceCarousel';
import { ServiceGrid } from './ServiceGrid';

export interface HomeSection {
  id: number;
  type: 'service' | 'promotions' | 'domain' | 'Cloud' | 'marketing'; // add marketing type
  title?: string;
  description?: string; // add description for domain section
  items: any[];
}

export interface AppListHomeProps {
  data: any[];
  scrollHandler?: any; // optional, for animated scroll
  ListHeaderComponent?: React.ComponentType<any>;
  contentContainerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>; // optional, for custom styles
}

export function AppListHome(props: AppListHomeProps) {
  const { data, scrollHandler, ListHeaderComponent, contentContainerStyle } = props;
  const renderItem = ({ item: section }: { item: HomeSection }) => {
    switch (section.type) {
      case 'service':
        return (
          <ServiceGrid items={section.items} title={section.title} />
        );
      case 'promotions':
        return (
          <BannerPromotions title={section.title} />
        );
      case 'marketing':
        return (
          <ServiceCarousel items={MarketingServices} title={section.title} />
        );
      case 'domain':
        return (
          <DomainList
            title={section.title || ''}
            description={section.description}
            items={section.items}
            onPressSeeMore={() => { /* TODO: handle see more */ }}
          />
        );
      case 'Cloud':
        return (
          <CloudList title={section.title || ''} items={section.items} />
        );
      default:
        return null;
    }
  };

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={ListHeaderComponent}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={[contentContainerStyle]}
      showsVerticalScrollIndicator={false}

    />
  );
};
