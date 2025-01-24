import { AppFlatListAnimated, AppHeader, AppInputSearch } from '@components';
import { MessageItem } from '@types';
import React from 'react';
import { View } from 'react-native';
import { useMessageScreen } from './MessageScreen.hook';
import { ItemMessage } from './components/ItemMessage';

const MessageScreen = () => {
  const { data,
    loading, onRefresh,
    handleLoadMore, styles, title } = useMessageScreen();




  const renderItem = ({ item }: { item: MessageItem }) => {
    return <ItemMessage item={item} />;
  };
  return (
    <View style={styles.container}>
      <AppHeader title={title || ''} />
      <AppInputSearch value={''} editable={false} style={styles.inputSearch} />
      <AppFlatListAnimated
        data={data || []}
        scrollEventThrottle={16}
        onRefresh={onRefresh}
        refreshing={loading}
        keyExtractor={(item) => item?.conversation_id?.toString()}
        renderItem={renderItem}
        onLoadMore={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default MessageScreen;
